import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Vertext Digital" },
      {
        name: "description",
        content:
          "Custom software, mobile apps, websites, AI tools and WhatsApp Business API chatbots — delivered as engineering engagements by Vertext Digital.",
      },
      { property: "og:title", content: "Services — Vertext Digital" },
      { property: "og:description", content: "Engineering services across software, mobile, AI and WhatsApp Business." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const groups = [
  {
    title: "Custom software",
    items: [
      "Internal business systems and admin dashboards",
      "Client portals and customer-facing web apps",
      "Workflow automation and back-office tooling",
      "API design, documentation and versioning",
    ],
  },
  {
    title: "Mobile applications",
    items: [
      "Native iOS and Android applications",
      "Cross-platform apps using React Native",
      "App Store and Play Store publishing support",
      "Long-term mobile maintenance contracts",
    ],
  },
  {
    title: "Websites and digital presence",
    items: [
      "Marketing websites and product pages",
      "Performance and SEO engineering",
      "Headless CMS integration",
      "Analytics and conversion instrumentation",
    ],
  },
  {
    title: "WhatsApp and Meta integrations",
    items: [
      "WhatsApp Business API onboarding through Meta",
      "Conversational bots and ticket routing",
      "Message templates and notification flows",
      "Click-to-WhatsApp ad integration with Meta Ads",
    ],
  },
  {
    title: "AI tools and assistants",
    items: [
      "Domain-specific assistants grounded in your data",
      "Document processing and extraction pipelines",
      "Voice and chat interfaces with audit trails",
      "Evaluation harnesses and monitoring",
    ],
  },
  {
    title: "Engineering and operations",
    items: [
      "Cloud infrastructure setup and review",
      "CI/CD pipelines and release management",
      "Observability, logging and alerting",
      "Security review and dependency hardening",
    ],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="container-prose pt-20 pb-12">
        <p className="eyebrow">Services</p>
        <h1 className="mt-4 text-4xl md:text-5xl max-w-3xl">
          A practical catalogue of what we deliver as a software studio.
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
          Engagements typically start with a short discovery phase, followed by an iterative build with
          weekly delivery. We work as an embedded engineering partner — not a generic agency.
        </p>
      </section>

      <section className="container-prose pb-20 grid gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <article key={g.title} className="card-surface">
            <h2 className="text-xl">{g.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {g.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-brand shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="container-prose pb-24">
        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl">Not sure which engagement fits?</h2>
            <p className="mt-2 text-muted-foreground">
              Send a short description of the problem. We&apos;ll suggest the smallest sensible scope to test
              the idea before committing to a full build.
            </p>
          </div>
          <Link to="/contact" className="btn-brand self-start">Contact the studio</Link>
        </div>
      </section>
    </>
  );
}
