import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vertext Digital" },
      {
        name: "description",
        content:
          "Vertext Digital is an independent software engineering studio building custom systems, mobile apps and WhatsApp Business solutions.",
      },
      { property: "og:title", content: "About — Vertext Digital" },
      { property: "og:description", content: "An independent software engineering studio." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="container-prose pt-20 pb-12">
        <p className="eyebrow">About</p>
        <h1 className="mt-4 text-4xl md:text-5xl max-w-3xl">
          A small studio focused on building software that businesses actually rely on.
        </h1>
      </section>

      <section className="container-prose pb-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            Vertext Digital was founded to do one thing well: build durable software for operating
            businesses. We work with companies that need their internal tools, mobile apps and customer
            channels to keep running reliably for years, not to be rebuilt every quarter.
          </p>
          <p>
            Our engagements span custom web applications, mobile apps for iOS and Android, AI tooling,
            and conversational solutions on WhatsApp Business and the wider Meta developer platform. We
            also help teams maintain and modernise the systems they already depend on.
          </p>
          <p>
            We work as a small, senior team. There are no handoffs to junior contractors and no
            outsourced delivery. The people who scope your project are the people who build it.
          </p>
        </div>
        <div className="space-y-6">
          <div className="card-surface">
            <h3 className="text-base">How we work</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>— Discovery before commitment</li>
              <li>— Weekly delivery cadence</li>
              <li>— Written architecture documentation</li>
              <li>— Source code and infrastructure owned by the client</li>
              <li>— Honest scope estimates and clear change management</li>
            </ul>
          </div>
          <div className="card-surface">
            <h3 className="text-base">Working principles</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>— Build the smallest useful version first</li>
              <li>— Prefer boring, proven technology</li>
              <li>— Instrument everything that matters</li>
              <li>— Treat third-party policies as design constraints</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-prose pb-24">
        <div className="border-t border-border pt-10">
          <h2 className="text-2xl">Working with us</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            We take on a limited number of engagements at a time so each project gets senior attention.
            If you&apos;d like to discuss a build, get in touch.
          </p>
          <div className="mt-6">
            <Link to="/contact" className="btn-brand">Contact the studio</Link>
          </div>
        </div>
      </section>
    </>
  );
}
