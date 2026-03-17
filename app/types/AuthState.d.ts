export type AuthState =
  | "unauthorized"
  | "pending_otp"
  | "authorized"
  | "verify-email";
