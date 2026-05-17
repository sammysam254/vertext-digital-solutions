import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vertext Digital" },
      { name: "description", content: "How Vertext Digital collects, uses and protects personal information across its website and services." },
      { property: "og:title", content: "Privacy Policy — Vertext Digital" },
      { property: "og:description", content: "How Vertext Digital handles personal data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="container-prose pt-20 pb-24 max-w-3xl">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl md:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: May 2026</p>

      <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed text-[0.95rem]">
        <section>
          <h2 className="text-foreground text-xl">1. Introduction</h2>
          <p className="mt-2">
            This Privacy Policy explains how Vertext Digital collects, uses and safeguards information
            when you visit our website or engage our services. We are committed to handling personal
            data responsibly and in accordance with applicable data protection laws.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">2. Information we collect</h2>
          <p className="mt-2">
            We collect information you provide directly — such as your name, email address, company
            and project details when submitting our contact form or communicating with us. We may also
            collect limited technical information automatically, including IP address, device type and
            pages visited, for analytics and security purposes.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">3. How we use information</h2>
          <p className="mt-2">
            Personal information is used to respond to enquiries, deliver and improve our services,
            operate and secure the website, and comply with legal obligations. We do not sell personal
            information and we do not use it for unrelated marketing.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">4. WhatsApp and Meta platforms</h2>
          <p className="mt-2">
            When you contact us via WhatsApp or interact with solutions we operate on the WhatsApp
            Business Platform, messages are processed through Meta's infrastructure subject to Meta's
            own privacy terms. We retain only the message data needed to deliver and audit the service.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">5. Data sharing</h2>
          <p className="mt-2">
            We share personal information only with trusted service providers that help us operate the
            business (such as hosting, analytics and communication tools), and only to the extent
            necessary. We may also disclose information where required by law.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">6. Data retention</h2>
          <p className="mt-2">
            We retain personal information only for as long as needed to fulfil the purposes described
            in this policy, satisfy legal or contractual requirements, or resolve disputes.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">7. Your rights</h2>
          <p className="mt-2">
            Subject to applicable law, you may request access to, correction of, or deletion of your
            personal information, and you may object to or restrict certain processing. To exercise
            these rights, contact us at the address below.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">8. Security</h2>
          <p className="mt-2">
            We apply appropriate technical and organisational measures to protect personal information
            against unauthorised access, disclosure, alteration and destruction.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">9. Contact</h2>
          <p className="mt-2">
            Privacy enquiries may be sent to hello@vertextdigital.com.
          </p>
        </section>
      </div>
    </section>
  );
}
