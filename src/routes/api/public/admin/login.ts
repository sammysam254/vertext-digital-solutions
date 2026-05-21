import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ADMIN_EMAIL_USER, ADMIN_PASSWORD } from "@/lib/admin-auth.server";

export const Route = createFileRoute("/api/public/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => ({}));
        const parsed = z.object({ email: z.string(), password: z.string() }).safeParse(body);
        if (!parsed.success) return Response.json({ error: "Invalid" }, { status: 400 });
        if (parsed.data.email.trim().toLowerCase() !== ADMIN_EMAIL_USER || parsed.data.password !== ADMIN_PASSWORD) {
          return Response.json({ error: "Invalid email or password" }, { status: 401 });
        }
        return Response.json({ ok: true, token: ADMIN_PASSWORD });
      },
    },
  },
});
