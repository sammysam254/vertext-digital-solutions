// Hardcoded admin credentials per user request.
// This is insecure — anyone with the password can read all customer messages.
export const ADMIN_EMAIL_USER = "vertextdigital@gmail.com";
export const ADMIN_PASSWORD = "58369234";

export function isAdminAuthed(request: Request): boolean {
  const auth = request.headers.get("authorization") || "";
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}
