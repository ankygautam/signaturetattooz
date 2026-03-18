import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/admin/providers/AuthProvider";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function ProtectedRoute() {
  const { user, loading, authAvailable } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner label="Checking studio access" />
      </div>
    );
  }

  if (!authAvailable || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
