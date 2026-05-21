import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { sendEmail, customerConfirmationHtml, adminNotificationHtml, ADMIN_EMAIL } from "@/lib/email.server";

const Schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(4000),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try { payload = await request.json(); } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = Schema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
        }
        const data = parsed.data;

        const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
        const { data: row, error } = await supabase
          .from("contact_messages")
          .insert({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            project_type: data.projectType || null,
            message: data.message,
          })
          .select()
          .single();

        if (error) {
          console.error("DB insert failed:", error);
          return Response.json({ error: "Failed to save message" }, { status: 500 });
        }

        // Best-effort emails; don't fail the request if email is down.
        try {
          await Promise.all([
            sendEmail({
              to: data.email,
              subject: "We received your message — Vertext Digital",
              html: customerConfirmationHtml(data.name, data.message),
              reply_to: ADMIN_EMAIL,
            }),
            sendEmail({
              to: ADMIN_EMAIL,
              subject: `New enquiry from ${data.name}`,
              html: adminNotificationHtml({
                name: data.name, email: data.email,
                phone: data.phone || undefined,
                projectType: data.projectType || undefined,
                message: data.message,
              }),
              reply_to: data.email,
            }),
          ]);
        } catch (e) {
          console.error("Email send failed:", e);
        }

        return Response.json({ ok: true, id: row.id });
      },
    },
  },
});
