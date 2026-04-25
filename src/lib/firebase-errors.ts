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
  const normalizedMessage = message.toLowerCase();

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

  if (
    code === "storage/unauthorized" ||
    code === "storage/unauthenticated"
  ) {
    return "This signed-in account is not allowed to upload to Firebase Storage. Make sure your Firestore admin document exists at admins/<uid> with role = \"admin\", then deploy the latest storage rules after Firebase Storage has been initialized.";
  }

  if (
    code === "storage/no-default-bucket" ||
    (code === "storage/unknown" &&
      (
        normalizedMessage.includes("bucket") ||
        normalizedMessage.includes("not found") ||
        normalizedMessage.includes("server response")
      ))
  ) {
    return "Firebase Storage is not ready for this project yet. Open Firebase Console > Storage and click Get Started, then deploy storage rules. Gallery image uploads will fail until Storage has been initialized.";
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
