import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Smartphone, MessageCircle, BrainCircuit, Globe, Workflow } from "lucide-react";
import heroImg from "@/assets/hero-network.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vertext Digital — Software, Mobile Apps and WhatsApp Business Solutions" },
      {
        name: "description",
        content:
          "Vertext Digital engineers custom software, mobile apps, AI tooling and WhatsApp Business API integrations for companies that need reliable systems.",
      },
      { property: "og:title", content: "Vertext Digital" },
      { property: "og:description", content: "Custom software, mobile apps and WhatsApp Business API integrations." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const services = [
  { icon: Code2, title: "Custom software", body: "Internal tools, dashboards and operational systems built around how your team actually works." },
  { icon: Smartphone, title: "Mobile applications", body: "Native and cross-platform mobile apps for iOS and Android, designed for everyday reliability." },
  { icon: MessageCircle, title: "WhatsApp chatbots", body: "Conversational agents on WhatsApp Business API for support, sales, bookings and notifications." },
  { icon: BrainCircuit, title: "AI tools", body: "Practical AI features wired into your existing workflows, with proper guardrails and review steps." },
  { icon: Globe, title: "Websites and portals", body: "Marketing sites, client portals and product surfaces engineered for performance and search visibility." },
  { icon: Workflow, title: "Integrations", body: "Connecting CRMs, billing systems, Meta platforms and third-party APIs into one coherent stack." },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1280}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="container-prose pt-24 pb-28 md:pt-32 md:pb-40">
          <p className="eyebrow">Software engineering studio</p>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] max-w-4xl">
            Engineering reliable software, mobile apps and WhatsApp experiences for operating businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Vertext Digital is an independent technology studio. We design, build and integrate the
            systems companies use every day — from internal tools and mobile apps to AI assistants and
            WhatsApp Business API chatbots running on Meta&apos;s platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-brand">
              Discuss a project <ArrowRight size={16} />
            </Link>
            <Link to="/whatsapp-api" className="btn-ghost">WhatsApp Business API</Link>
          </div>
        </div>
      </section>

      {/* Capability strip */}
      <section className="border-y border-border bg-surface/40">
        <div className="container-prose py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          {[
            ["Founded", "2023"],
            ["Engagements", "B2B & SMB"],
            ["Delivery", "Studio-led"],
            ["Stack", "TypeScript · Node · React"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
              <div className="mt-1 text-foreground font-medium">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container-prose py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">What we build</p>
          <h2 className="mt-4 text-3xl md:text-4xl">
            A focused set of services around custom software and conversational platforms.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="card-surface">
              <s.icon size={22} className="text-brand" />
              <h3 className="mt-5 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/services" className="text-sm text-brand hover:underline inline-flex items-center gap-1">
            See full service list <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* WhatsApp / Meta band */}
      <section className="container-prose py-20">
        <div className="card-surface md:p-12 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="eyebrow">Meta &amp; WhatsApp</p>
            <h2 className="mt-4 text-3xl">
              We build and operate solutions on the WhatsApp Business Platform.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Vertext Digital integrates the WhatsApp Business API and Meta&apos;s broader developer
              tools into customer-facing products: booking flows, support automation, transactional
              notifications, lead capture and verified business profiles.
            </p>
            <div className="mt-6">
              <Link to="/whatsapp-api" className="btn-brand">
                Read our platform overview <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              "Cloud API onboarding and phone number registration",
              "Message template design and approval workflow",
              "Webhook handling with persistent message storage",
              "Two-way conversations with handover to human agents",
              "Compliance with WhatsApp Business policy and Meta guidelines",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose pb-24">
        <div className="border border-border rounded-xl p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl max-w-2xl mx-auto">
            Have a system to build or a process to automate?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Tell us about the problem. We&apos;ll respond with an honest assessment and a recommended path.
          </p>
          <div className="mt-7 flex justify-center gap-3 flex-wrap">
            <Link to="/contact" className="btn-brand">Start a conversation</Link>
            <Link to="/about" className="btn-ghost">About the studio</Link>
          </div>
        </div>
      </section>
    </>
  );
}
