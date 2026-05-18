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

const WHATSAPP_NUMBER = "254706499848";

const groups: {
  title: string;
  price?: string;
  priceNote?: string;
  items: string[];
}[] = [
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
    price: "From USD 1,000",
    priceNote: "per project",
    items: [
      "Native iOS and Android applications",
      "Cross-platform apps using React Native",
      "App Store and Play Store publishing support",
      "Long-term mobile maintenance contracts",
    ],
  },
  {
    title: "Websites and digital presence",
    price: "From USD 200",
    priceNote: "per project",
    items: [
      "Marketing websites and product pages",
      "Performance and SEO engineering",
      "Headless CMS integration",
      "Analytics and conversion instrumentation",
    ],
  },
  {
    title: "WhatsApp and Meta integrations",
    price: "From USD 2",
    priceNote: "per month",
    items: [
      "WhatsApp Business API onboarding through Meta",
      "Conversational bots and ticket routing",
      "Message templates and notification flows",
      "Click-to-WhatsApp ad integration with Meta Ads",
    ],
  },
  {
    title: "AI tools and assistants",
    price: "From USD 100",
    priceNote: "per project",
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

function bookingUrl(title: string) {
  const message = `Hello Vertext Digital, I would like to book the "${title}" service. Please share the next steps.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

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
          <article key={g.title} className="card-surface flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl">{g.title}</h2>
              {g.price && (
                <div className="text-right shrink-0">
                  <div className="text-base font-semibold text-foreground">{g.price}</div>
                  {g.priceNote && (
                    <div className="text-xs text-muted-foreground">{g.priceNote}</div>
                  )}
                </div>
              )}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground flex-1">
              {g.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span className="mt-2 w-1 h-1 rounded-full bg-brand shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
            {g.price && (
              <div className="mt-6">
                <a
                  href={bookingUrl(g.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brand w-full justify-center"
                >
                  Book now
                </a>
              </div>
            )}
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
