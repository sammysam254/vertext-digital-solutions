import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Vertext Digital" },
      { name: "description", content: "Terms of Service governing the use of Vertext Digital's website and engineering services." },
      { property: "og:title", content: "Terms of Service — Vertext Digital" },
      { property: "og:description", content: "Terms governing use of Vertext Digital services." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <section className="container-prose pt-20 pb-24 max-w-3xl">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 text-4xl md:text-5xl">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: May 2026</p>

      <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed text-[0.95rem]">
        <section>
          <h2 className="text-foreground text-xl">1. Acceptance of terms</h2>
          <p className="mt-2">
            By accessing the Vertext Digital website or engaging our engineering services you agree to
            be bound by these Terms of Service. If you do not agree, please discontinue use of the site
            and our services.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">2. Services</h2>
          <p className="mt-2">
            Vertext Digital provides software engineering, mobile application development, AI tooling,
            websites and WhatsApp Business API integrations. Specific deliverables, timelines and fees
            for each engagement are defined in a separate written agreement or statement of work.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">3. Client responsibilities</h2>
          <p className="mt-2">
            Clients are responsible for providing accurate information, timely feedback and the access
            required for Vertext Digital to deliver agreed services. Clients are also responsible for
            ensuring that any data shared with us may be lawfully processed.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">4. Intellectual property</h2>
          <p className="mt-2">
            Upon full payment, custom code and assets produced under a signed engagement are owned by
            the client, subject to any third-party components that retain their original licences.
            Vertext Digital retains ownership of internal tools, libraries and pre-existing materials.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">5. Third-party platforms</h2>
          <p className="mt-2">
            Solutions involving WhatsApp Business API, Meta platforms or other third-party providers
            are subject to the policies and terms of those providers. Clients agree to comply with
            those policies, including the WhatsApp Business Messaging Policy and Meta Platform Terms.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">6. Confidentiality</h2>
          <p className="mt-2">
            Each party agrees to keep confidential any non-public information shared during an
            engagement and to use such information only for the purpose of delivering the services.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">7. Limitation of liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, Vertext Digital's aggregate liability under any
            engagement is limited to the fees paid by the client for the services giving rise to the
            claim during the three months preceding the event.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">8. Changes to these terms</h2>
          <p className="mt-2">
            We may update these Terms of Service from time to time. Material changes will be reflected
            by updating the "Last updated" date above. Continued use of the site after changes
            constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-foreground text-xl">9. Contact</h2>
          <p className="mt-2">
            Questions about these terms may be sent to hello@vertextdigital.com.
          </p>
        </section>
      </div>
    </section>
  );
}
