function readErrorCode(error: unknown) {
  if (typeof error === "object" && error && "code" in error && typeof error.code === "string") {
    return error.code;
  }

  return "";
}

function readErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "";
}

export function formatFirebaseError(
  error: unknown,
  fallback = "Something went wrong while talking to Firebase.",
) {
  const code = readErrorCode(error);
  const message = readErrorMessage(error);

  if (
    code === "permission-denied" ||
    message.includes("Missing or insufficient permissions")
  ) {
    return "This account is signed in, but it is not allowed to access the admin dashboard yet. Add this user's UID to Firestore under admins/<uid> and make sure the latest Firebase rules are deployed.";
  }

  if (
    code === "auth/invalid-credential" ||
    code === "auth/invalid-login-credentials"
  ) {
    return "Firebase rejected this sign-in. Check that Email/Password sign-in is enabled in Firebase Auth and that the email and password are correct.";
  }

  if (message) {
    return message;
  }

  return fallback;
}

export function toFirebaseDisplayError(
  error: unknown,
  fallback?: string,
) {
  return new Error(formatFirebaseError(error, fallback));
}
