import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { isAdminAuthed } from "@/lib/admin-auth.server";
import { sendEmail, ADMIN_EMAIL, escapeHtml } from "@/lib/email.server";

const Schema = z.object({
  messageId: z.string().uuid(),
  body: z.string().trim().min(1).max(8000),
});

export const Route = createFileRoute("/api/public/admin/reply")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAdminAuthed(request)) return new Response("Unauthorized", { status: 401 });
        const parsed = Schema.safeParse(await request.json().catch(() => ({})));
        if (!parsed.success) return Response.json({ error: "Validation failed" }, { status: 400 });

        const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
        const { data: msg, error } = await supabase
          .from("contact_messages").select("*").eq("id", parsed.data.messageId).single();
        if (error || !msg) return Response.json({ error: "Message not found" }, { status: 404 });

        const html = `
          <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif; max-width:560px; margin:0 auto; padding:24px; color:#0f172a; line-height:1.6;">
            <p>Hi ${escapeHtml(msg.name)},</p>
            <div style="white-space:pre-wrap;">${escapeHtml(parsed.data.body)}</div>
            <p style="margin-top:24px; color:#64748b; font-size:13px;">— Vertext Digital</p>
          </div>`;

        try {
          await sendEmail({
            to: msg.email,
            subject: `Re: your enquiry to Vertext Digital`,
            html,
            reply_to: ADMIN_EMAIL,
          });
        } catch (e: any) {
          return Response.json({ error: `Email send failed: ${e.message}` }, { status: 502 });
        }

        await supabase.from("message_replies").insert({
          message_id: msg.id, body: parsed.data.body,
        });
        await supabase.from("contact_messages").update({ replied: true }).eq("id", msg.id);

        return Response.json({ ok: true });
      },
    },
  },
});
