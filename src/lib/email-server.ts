// Server-only Resend email helper. Do NOT import from client code.

const RESEND_ENDPOINT = "https://api.resend.com/emails";
// onboarding@resend.dev works without domain verification.
// Replace once the user verifies their own domain in Resend.
export const FROM_ADDRESS = "Vertext Digital <onboarding@resend.dev>";
export const ADMIN_EMAIL = "vertextdigital@gmail.com";

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  reply_to?: string;
}

export async function sendEmail(params: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: Array.isArray(params.to) ? params.to : [params.to],
      subject: params.subject,
      html: params.html,
      reply_to: params.reply_to,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API ${res.status}: ${body}`);
  }
  return res.json();
}

const baseStyles = `
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #0f172a;
  line-height: 1.6;
`;

export function customerConfirmationHtml(name: string, message: string) {
  return `
    <div style="${baseStyles} max-width: 560px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #0f172a; margin: 0 0 16px;">Thanks for reaching out, ${escapeHtml(name)}!</h2>
      <p>We received your message and a member of the Vertext Digital team will get back to you within 1 business day.</p>
      <div style="margin: 24px 0; padding: 16px 20px; background: #f1f5f9; border-left: 3px solid #10b981; border-radius: 4px;">
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p>In the meantime, feel free to reach us directly:</p>
      <ul>
        <li>WhatsApp: <a href="https://wa.me/254706499848">+254 706 499 848</a></li>
        <li>Email: <a href="mailto:vertextdigital@gmail.com">vertextdigital@gmail.com</a></li>
      </ul>
      <p style="margin-top: 32px; color: #64748b; font-size: 13px;">Vertext Digital · Founded 2026</p>
    </div>
  `;
}

export function adminNotificationHtml(opts: {
  name: string; email: string; phone?: string; projectType?: string; message: string;
}) {
  return `
    <div style="${baseStyles} max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="margin: 0 0 16px;">New contact form submission</h2>
      <table style="width:100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr><td style="padding: 6px 0; color:#64748b;">Name</td><td style="padding:6px 0;"><strong>${escapeHtml(opts.name)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color:#64748b;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(opts.email)}">${escapeHtml(opts.email)}</a></td></tr>
        ${opts.phone ? `<tr><td style="padding: 6px 0; color:#64748b;">Phone</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(opts.phone)}">${escapeHtml(opts.phone)}</a></td></tr>` : ""}
        ${opts.projectType ? `<tr><td style="padding: 6px 0; color:#64748b;">Project</td><td style="padding:6px 0;">${escapeHtml(opts.projectType)}</td></tr>` : ""}
      </table>
      <div style="padding: 16px 20px; background: #f1f5f9; border-radius: 6px;">
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(opts.message)}</p>
      </div>
      <p style="margin-top:24px;">Reply directly to this email or use the admin panel.</p>
    </div>
  `;
}

export function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
