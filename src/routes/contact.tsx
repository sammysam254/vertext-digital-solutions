import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vertext Digital" },
      {
        name: "description",
        content:
          "Get in touch with Vertext Digital to discuss a custom software, mobile app or WhatsApp Business API project.",
      },
      { property: "og:title", content: "Contact — Vertext Digital" },
      { property: "og:description", content: "Discuss a project with the studio." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="container-prose pt-20 pb-24 grid md:grid-cols-[1.1fr_1fr] gap-14">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 text-4xl md:text-5xl">
          Tell us about the project.
        </h1>
        <p className="mt-5 text-muted-foreground leading-relaxed max-w-md">
          Share a short description of what you&apos;re trying to build or solve. We respond within two
          business days with an honest assessment and recommended next steps.
        </p>

        <div className="mt-10 space-y-5 text-sm">
          <div className="flex gap-3 items-start">
            <Mail size={18} className="text-brand mt-0.5" />
            <div>
              <div className="text-foreground font-medium">Email</div>
              <a href="mailto:hello@vertextdigital.com" className="text-muted-foreground hover:text-foreground">
                hello@vertextdigital.com
              </a>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <MessageCircle size={18} className="text-brand mt-0.5" />
            <div>
              <div className="text-foreground font-medium">WhatsApp</div>
              <span className="text-muted-foreground">Available on request after first contact</span>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <MapPin size={18} className="text-brand mt-0.5" />
            <div>
              <div className="text-foreground font-medium">Operating remotely</div>
              <span className="text-muted-foreground">Working with clients globally</span>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
        className="card-surface md:p-8 space-y-5"
      >
        {submitted ? (
          <div className="py-10 text-center">
            <h2 className="text-xl">Thank you</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your message has been received. We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <>
            <Field label="Full name" name="name" required />
            <Field label="Work email" name="email" type="email" required />
            <Field label="Company" name="company" />
            <div>
              <label className="text-sm font-medium text-foreground">Project type</label>
              <select
                name="type"
                className="mt-2 w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option>Custom software</option>
                <option>Mobile application</option>
                <option>Website</option>
                <option>WhatsApp Business API</option>
                <option>AI tooling</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Brief description</label>
              <textarea
                name="message"
                rows={5}
                required
                className="mt-2 w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <button type="submit" className="btn-brand w-full">Send message</button>
            <p className="text-xs text-muted-foreground">
              By submitting this form you consent to being contacted about your enquiry.
            </p>
          </>
        )}
      </form>
    </section>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">
        {label}{required && <span className="text-brand"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
