import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/whatsapp-api")({
  head: () => ({
    meta: [
      { title: "WhatsApp Business API — Vertext Digital" },
      {
        name: "description",
        content:
          "Vertext Digital builds, deploys and maintains WhatsApp Business API solutions on Meta's platform — including chatbots, notifications and customer support automation.",
      },
      { property: "og:title", content: "WhatsApp Business API — Vertext Digital" },
      {
        property: "og:description",
        content:
          "WhatsApp Business API and Meta platform integrations engineered, deployed and supported in-house.",
      },
      { property: "og:url", content: "/whatsapp-api" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/whatsapp-api" }],
  }),
  component: WhatsappPage,
});

function WhatsappPage() {
  return (
    <>
      <section className="container-prose pt-20 pb-10">
        <p className="eyebrow">Platform overview</p>
        <h1 className="mt-4 text-4xl md:text-5xl max-w-3xl">
          WhatsApp Business API solutions, engineered and operated by Vertext Digital.
        </h1>
        <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">
          Vertext Digital is a technology provider building software that integrates with the WhatsApp
          Business Platform and other Meta developer tools. We operate as the engineering team behind
          client deployments — handling onboarding, integration, message orchestration and ongoing
          compliance with Meta&apos;s policies.
        </p>
      </section>

      <section className="container-prose py-12 grid md:grid-cols-3 gap-6">
        {[
          {
            t: "Tech provider posture",
            b: "We act as the technical integrator for clients onboarding to the WhatsApp Business Platform, with engineering capacity to support production workloads.",
          },
          {
            t: "Cloud API first",
            b: "Our default deployment uses the official WhatsApp Cloud API hosted by Meta, reducing infrastructure overhead and aligning with Meta's recommended path.",
          },
          {
            t: "Long-term operation",
            b: "Each solution is built to be maintained over years — with monitoring, message logs, retry logic and clear handover procedures.",
          },
        ].map((c) => (
          <div key={c.t} className="card-surface">
            <h3 className="text-base">{c.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.b}</p>
          </div>
        ))}
      </section>

      <section className="container-prose py-12">
        <h2 className="text-2xl md:text-3xl">What we deliver on the WhatsApp Business Platform</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              h: "Onboarding and verification",
              p: "Meta Business Manager configuration, business verification support, phone number registration and display name approval.",
            },
            {
              h: "Conversational design",
              p: "Intent flows, fallback logic and human handover paths designed for the specific use case — support, sales or transactional notifications.",
            },
            {
              h: "Template management",
              p: "Designing, submitting and version-controlling message templates so marketing and utility messages clear Meta&apos;s review process reliably.",
            },
            {
              h: "Webhook and storage layer",
              p: "Server-side message ingestion, persistent storage, delivery receipts and analytics — built on TypeScript, Node and Postgres.",
            },
            {
              h: "CRM and helpdesk integration",
              p: "Bidirectional sync with HubSpot, Zendesk, custom CRMs and internal databases so conversations don&apos;t live in a silo.",
            },
            {
              h: "Compliance and policy",
              p: "Opt-in capture, message categorisation, rate limiting and adherence to the WhatsApp Business Messaging Policy.",
            },
          ].map((x) => (
            <article key={x.h} className="border border-border rounded-lg p-6">
              <h3 className="text-base font-medium">{x.h}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{x.p}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-prose py-12">
        <div className="card-surface md:p-10">
          <h2 className="text-2xl md:text-3xl">Why work with Vertext Digital as your provider</h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-4 text-sm">
            {[
              "Dedicated engineering team experienced with the Cloud API",
              "End-to-end ownership from onboarding through to support",
              "Transparent architecture documentation for each deployment",
              "Operating procedures aligned with Meta's platform policies",
              "Clean separation between client data and shared infrastructure",
              "Ability to support multiple WhatsApp Business Account structures",
            ].map((x) => (
              <li key={x} className="flex gap-3">
                <CheckCircle2 size={18} className="text-brand shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-prose py-16">
        <div className="border border-border rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl">Looking for a WhatsApp Business API partner?</h2>
            <p className="mt-2 text-muted-foreground">
              Tell us about the use case — support automation, transactional notifications, sales flows
              or a custom build. We&apos;ll respond with a concrete integration plan.
            </p>
          </div>
          <Link to="/contact" className="btn-brand">Contact us</Link>
        </div>
      </section>
    </>
  );
}
