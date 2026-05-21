import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { sendEmail, ADMIN_EMAIL, escapeHtml } from "@/lib/email.server";

// Hardcoded per user request. Not secure — anyone with this can read all messages.
const ADMIN_EMAIL_USER = "vertextdigital@gmail.com";
const ADMIN_PASSWORD = "58369234";

function isAuthed(request: Request) {
  const auth = request.headers.get("authorization") || "";
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

// --- /api/public/admin/login ---
export const Route = createFileRoute("/api/public/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const parsed = z.object({ email: z.string(), password: z.string() }).safeParse(body);
        if (!parsed.success) return Response.json({ error: "Invalid" }, { status: 400 });
        if (parsed.data.email.trim().toLowerCase() !== ADMIN_EMAIL_USER || parsed.data.password !== ADMIN_PASSWORD) {
          return Response.json({ error: "Invalid credentials" }, { status: 401 });
        }
        return Response.json({ ok: true, token: ADMIN_PASSWORD });
      },
    },
  },
});

// Helpers exported for other admin routes (sibling files)
export { isAuthed, ADMIN_EMAIL_USER, ADMIN_PASSWORD };
