import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth, db, firebaseConfigured } from "@/firebase/config";

const ADMIN_ACCESS_ERROR =
  "This account is authenticated but is not on the Firebase admin allowlist yet.";

type AuthContextValue = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  authAvailable: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!auth || !db) {
      setLoading(false);
      setIsAdmin(false);
      return;
    }

    let active = true;

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);

      if (!nextUser) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setLoading(true);

      void getDoc(doc(db, "admins", nextUser.uid))
        .then((snapshot) => {
          if (!active) {
            return;
          }

          setIsAdmin(snapshot.exists());
          setLoading(false);
        })
        .catch(() => {
          if (!active) {
            return;
          }

          setIsAdmin(false);
          setLoading(false);
        });
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAdmin,
      loading,
      authAvailable: firebaseConfigured,
      signIn: async (email, password) => {
        if (!auth || !db) {
          throw new Error(
            "Firebase Auth is not configured yet. Add your VITE_FIREBASE_* environment variables to enable admin login.",
          );
        }

        const credential = await signInWithEmailAndPassword(auth, email, password);
        const adminSnapshot = await getDoc(doc(db, "admins", credential.user.uid));

        if (!adminSnapshot.exists()) {
          await signOut(auth);
          throw new Error(ADMIN_ACCESS_ERROR);
        }
      },
      signOutUser: async () => {
        if (!auth) {
          return;
        }

        await signOut(auth);
      },
    }),
    [isAdmin, loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
