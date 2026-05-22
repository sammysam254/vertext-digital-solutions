// Shared API handler for /api/public/* routes.
// Used by Netlify Functions and the Render Node server.
// Returns { status, headers, body } for the given (method, path, headers, rawBody).

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const ADMIN_EMAIL_USER = "vertextdigital@gmail.com";
const ADMIN_PASSWORD = "58369234";
const FROM_ADDRESS = "Vertext Digital <onboarding@resend.dev>";
const ADMIN_EMAIL = "vertextdigital@gmail.com";

function json(status, data) {
  return {
    status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase env vars missing");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function sendEmail({ to, subject, html, reply_to }) {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: Array.isArray(to) ? to : [to],
      subject, html, reply_to,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

function isAdmin(headers) {
  const auth = headers["authorization"] || headers["Authorization"] || "";
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}

function parseJson(body) {
  if (!body) return {};
  try { return typeof body === "string" ? JSON.parse(body) : body; } catch { return null; }
}

export async function handleApi(method, path, headers, body) {
  // Normalize path - strip leading prefix variations
  const p = path.replace(/^\/?(\.netlify\/functions\/api)?/, "").replace(/^\//, "");
  // p is like "api/public/contact"
  const route = p.replace(/^api\/public\//, "");

  try {
    // CORS preflight
    if (method === "OPTIONS") {
      return {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type,Authorization",
        },
        body: "",
      };
    }

    if (route === "contact" && method === "POST") {
      const data = parseJson(body);
      if (!data || !data.name || !data.email || !data.message) {
        return json(400, { error: "Missing required fields" });
      }
      const supabase = getSupabase();
      const { data: row, error } = await supabase
        .from("contact_messages")
        .insert({
          name: String(data.name).slice(0, 120),
          email: String(data.email).slice(0, 255),
          phone: data.phone ? String(data.phone).slice(0, 40) : null,
          project_type: data.projectType ? String(data.projectType).slice(0, 80) : null,
          message: String(data.message).slice(0, 4000),
        })
        .select().single();
      if (error) return json(500, { error: "Failed to save" });

      // Best-effort emails
      const customerHtml = `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0f172a;line-height:1.6;">
          <h2>Thanks for reaching out, ${escapeHtml(data.name)}!</h2>
          <p>We received your message and will reply within 1 business day.</p>
          <div style="margin:20px 0;padding:16px;background:#f1f5f9;border-left:3px solid #10b981;border-radius:4px;">
            <p style="margin:0;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
          </div>
          <p>WhatsApp: <a href="https://wa.me/254706499848">+254 706 499 848</a></p>
          <p style="color:#64748b;font-size:13px;margin-top:32px;">Vertext Digital</p>
        </div>`;
      const adminHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
          ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>` : ""}
          ${data.projectType ? `<p><strong>Project:</strong> ${escapeHtml(data.projectType)}</p>` : ""}
          <div style="padding:16px;background:#f1f5f9;border-radius:6px;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
          <p>Reply directly to this email — it goes to the customer.</p>
        </div>`;

      const results = await Promise.allSettled([
        sendEmail({ to: data.email, subject: "We received your message — Vertext Digital", html: customerHtml, reply_to: ADMIN_EMAIL }),
        sendEmail({ to: ADMIN_EMAIL, subject: `New enquiry from ${data.name}`, html: adminHtml, reply_to: data.email }),
      ]);
      const emailErrors = results.filter(r => r.status === "rejected").map(r => String(r.reason));
      if (emailErrors.length) console.error("Email send issues:", emailErrors);

      return json(200, { ok: true, id: row.id });
    }

    if (route === "admin/login" && method === "POST") {
      const data = parseJson(body) || {};
      if (String(data.email || "").trim().toLowerCase() !== ADMIN_EMAIL_USER || data.password !== ADMIN_PASSWORD) {
        return json(401, { error: "Invalid email or password" });
      }
      return json(200, { ok: true, token: ADMIN_PASSWORD });
    }

    if (route === "admin/messages") {
      if (!isAdmin(headers)) return json(401, { error: "Unauthorized" });
      const supabase = getSupabase();
      if (method === "GET") {
        const { data: messages, error } = await supabase
          .from("contact_messages").select("*").order("created_at", { ascending: false }).limit(500);
        if (error) return json(500, { error: error.message });
        const ids = (messages || []).map(m => m.id);
        let replies = [];
        if (ids.length) {
          const r = await supabase.from("message_replies").select("*").in("message_id", ids).order("created_at", { ascending: true });
          replies = r.data || [];
        }
        return json(200, { messages, replies });
      }
      if (method === "DELETE") {
        const data = parseJson(body) || {};
        if (!data.id) return json(400, { error: "id required" });
        const { error } = await supabase.from("contact_messages").delete().eq("id", data.id);
        if (error) return json(500, { error: error.message });
        return json(200, { ok: true });
      }
    }

    if (route === "admin/reply" && method === "POST") {
      if (!isAdmin(headers)) return json(401, { error: "Unauthorized" });
      const data = parseJson(body) || {};
      if (!data.messageId || !data.body) return json(400, { error: "messageId and body required" });
      const supabase = getSupabase();
      const { data: msg, error } = await supabase.from("contact_messages").select("*").eq("id", data.messageId).single();
      if (error || !msg) return json(404, { error: "Message not found" });

      const html = `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0f172a;line-height:1.6;">
          <p>Hi ${escapeHtml(msg.name)},</p>
          <div style="white-space:pre-wrap;">${escapeHtml(data.body)}</div>
          <p style="margin-top:24px;color:#64748b;font-size:13px;">— Vertext Digital</p>
        </div>`;

      let emailWarning = null;
      try {
        await sendEmail({ to: msg.email, subject: `Re: your enquiry to Vertext Digital`, html, reply_to: ADMIN_EMAIL });
      } catch (e) {
        emailWarning = String(e.message || e);
        console.error("Reply email failed:", emailWarning);
      }

      await supabase.from("message_replies").insert({ message_id: msg.id, body: data.body });
      if (!emailWarning) await supabase.from("contact_messages").update({ replied: true }).eq("id", msg.id);

      return json(200, { ok: true, warning: emailWarning });
    }

    return json(404, { error: "Not found", route });
  } catch (e) {
    console.error("API error:", e);
    return json(500, { error: String(e.message || e) });
  }
}
