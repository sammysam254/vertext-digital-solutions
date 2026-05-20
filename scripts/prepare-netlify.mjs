import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = process.cwd();
const outputDir = resolve(root, "dist/netlify");
const sourceImage = resolve(root, "src/assets/hero-network.jpg");

const pages = [
  { path: "index.html", title: "Vertext Digital — Software, Mobile Apps and WhatsApp Business Solutions", description: "Vertext Digital engineers custom software, mobile apps, AI tooling and WhatsApp Business API integrations for companies that need reliable systems.", body: homePage() },
  { path: "services/index.html", title: "Services — Vertext Digital", description: "Custom software, mobile apps, websites, AI tools and WhatsApp Business API chatbots delivered by Vertext Digital.", body: servicesPage() },
  { path: "whatsapp-api/index.html", title: "WhatsApp Business API — Vertext Digital", description: "Vertext Digital builds, deploys and maintains WhatsApp Business API solutions on Meta's platform.", body: whatsappPage() },
  { path: "about/index.html", title: "About — Vertext Digital", description: "Vertext Digital is an independent software engineering studio building custom systems, mobile apps and WhatsApp Business solutions.", body: aboutPage() },
  { path: "contact/index.html", title: "Contact — Vertext Digital", description: "Get in touch with Vertext Digital to discuss a custom software, mobile app or WhatsApp Business API project.", body: contactPage() },
  { path: "terms/index.html", title: "Terms of Service — Vertext Digital", description: "Terms of Service governing the use of Vertext Digital's website and engineering services.", body: termsPage() },
  { path: "privacy/index.html", title: "Privacy Policy — Vertext Digital", description: "How Vertext Digital collects, uses and protects personal information across its website and services.", body: privacyPage() },
];

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

if (existsSync(resolve(root, "public"))) {
  cpSync(resolve(root, "public"), outputDir, { recursive: true });
}

if (existsSync(sourceImage)) {
  mkdirSync(join(outputDir, "assets"), { recursive: true });
  cpSync(sourceImage, join(outputDir, "assets/hero-network.jpg"));
}

for (const page of pages) {
  const target = join(outputDir, page.path);
  mkdirSync(resolve(target, ".."), { recursive: true });
  writeFileSync(target, renderPage(page), "utf8");
}

writeFileSync(join(outputDir, "_redirects"), "/* /index.html 200\n", "utf8");
writeFileSync(join(outputDir, "sitemap.xml"), sitemap(), "utf8");

console.log(`[netlify] Prepared static site at ${relative(root, outputDir)}`);

function renderPage({ title, description, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="Vertext Digital">
  <meta property="og:site_name" content="Vertext Digital">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap">
  <style>${css()}</style>
  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Vertext Digital", url: "/", description: "Software engineering studio specialising in custom software, mobile apps, AI tooling and WhatsApp Business API integrations." })}</script>
</head>
<body>
  ${header()}
  <main>${body}</main>
  ${footer()}
</body>
</html>`;
}

function header() {
  return `<header class="site-header"><div class="container nav-wrap"><a href="/" class="brand"><span></span>Vertext Digital</a><nav><a href="/">Home</a><a href="/services/">Services</a><a href="/whatsapp-api/">WhatsApp API</a><a href="/about/">About</a><a href="/contact/">Contact</a></nav><a class="btn btn-sm" href="/contact/">Start a project</a></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><div class="brand"><span></span>Vertext Digital</div><p>A software engineering studio building business systems, mobile apps, websites, AI tools, and conversational platforms on WhatsApp and Meta.</p></div><div><h4>Company</h4><a href="/about/">About</a><a href="/services/">Services</a><a href="/contact/">Contact</a></div><div><h4>Platforms</h4><a href="/whatsapp-api/">WhatsApp Business API</a><a href="/services/">AI &amp; Chatbots</a><a href="/services/">Mobile Apps</a></div></div><div class="footer-bottom"><div class="container legal"><p>&copy; 2026 Vertext Digital. All rights reserved.</p><div><a href="/terms/">Terms</a><a href="/privacy/">Privacy</a></div></div></div></footer>`;
}

function homePage() {
  return `<section class="hero"><img src="/assets/hero-network.jpg" alt=""><div class="hero-overlay"></div><div class="container hero-content"><p class="eyebrow">Software engineering studio</p><h1>Engineering reliable software, mobile apps and WhatsApp experiences for operating businesses.</h1><p>Vertext Digital is an independent technology studio. We design, build and integrate the systems companies use every day — from internal tools and mobile apps to AI assistants and WhatsApp Business API chatbots running on Meta's platform.</p><div class="actions"><a class="btn" href="/contact/">Discuss a project</a><a class="btn ghost" href="/whatsapp-api/">WhatsApp Business API</a></div></div></section><section class="stats"><div class="container stat-grid"><div><small>Founded</small><strong>2026</strong></div><div><small>Engagements</small><strong>B2B &amp; SMB</strong></div><div><small>Delivery</small><strong>Studio-led</strong></div><div><small>Stack</small><strong>TypeScript · Node · React</strong></div></div></section><section class="container section"><p class="eyebrow">What we build</p><h2>A focused set of services around custom software and conversational platforms.</h2><div class="card-grid">${[
    ["Custom software", "Internal tools, dashboards and operational systems built around how your team actually works."],
    ["Mobile applications", "Native and cross-platform mobile apps for iOS and Android, designed for everyday reliability."],
    ["WhatsApp chatbots", "Conversational agents on WhatsApp Business API for support, sales, bookings and notifications."],
    ["AI tools", "Practical AI features wired into your existing workflows, with proper guardrails and review steps."],
    ["Websites and portals", "Marketing sites, client portals and product surfaces engineered for performance and search visibility."],
    ["Integrations", "Connecting CRMs, billing systems, Meta platforms and third-party APIs into one coherent stack."],
  ].map(card).join("")}</div><p class="link-row"><a href="/services/">See full service list</a></p></section><section class="container section"><div class="feature"><div><p class="eyebrow">Meta &amp; WhatsApp</p><h2>We build and operate solutions on the WhatsApp Business Platform.</h2><p>Vertext Digital integrates the WhatsApp Business API and Meta's broader developer tools into customer-facing products: booking flows, support automation, transactional notifications, lead capture and verified business profiles.</p><a class="btn" href="/whatsapp-api/">Read our platform overview</a></div><ul>${["Cloud API onboarding and phone number registration", "Message template design and approval workflow", "Webhook handling with persistent message storage", "Two-way conversations with handover to human agents", "Compliance with WhatsApp Business policy and Meta guidelines"].map(li).join("")}</ul></div></section><section class="container cta"><h2>Have a system to build or a process to automate?</h2><p>Tell us about the problem. We'll respond with an honest assessment and a recommended path.</p><div class="actions center"><a class="btn" href="/contact/">Start a conversation</a><a class="btn ghost" href="/about/">About the studio</a></div></section>`;
}

function servicesPage() {
  const services = [
    ["Custom software", "", ["Internal business systems and admin dashboards", "Client portals and customer-facing web apps", "Workflow automation and back-office tooling", "API design, documentation and versioning"]],
    ["Mobile applications", "From USD 1,000 per project", ["Native iOS and Android applications", "Cross-platform apps using React Native", "App Store and Play Store publishing support", "Long-term mobile maintenance contracts"]],
    ["Websites and digital presence", "From USD 200 per project", ["Marketing websites and product pages", "Performance and SEO engineering", "Headless CMS integration", "Analytics and conversion instrumentation"]],
    ["WhatsApp and Meta integrations", "From USD 2 per month", ["WhatsApp Business API onboarding through Meta", "Conversational bots and ticket routing", "Message templates and notification flows", "Click-to-WhatsApp ad integration with Meta Ads"]],
    ["AI tools and assistants", "From USD 100 per project", ["Domain-specific assistants grounded in your data", "Document processing and extraction pipelines", "Voice and chat interfaces with audit trails", "Evaluation harnesses and monitoring"]],
    ["Engineering and operations", "", ["Cloud infrastructure setup and review", "CI/CD pipelines and release management", "Observability, logging and alerting", "Security review and dependency hardening"]],
  ];
  return pageHero("Services", "A practical catalogue of what we deliver as a software studio.", "Engagements typically start with a short discovery phase, followed by an iterative build with weekly delivery. We work as an embedded engineering partner — not a generic agency.") + `<section class="container section card-grid two">${services.map(([title, price, items]) => `<article class="card"><div class="service-head"><h2>${title}</h2>${price ? `<strong>${price}</strong>` : ""}</div><ul>${items.map(li).join("")}</ul>${price ? `<a class="btn full" target="_blank" rel="noopener noreferrer" href="${bookingUrl(title)}">Book now</a>` : ""}</article>`).join("")}</section><section class="container cta slim"><h2>Not sure which engagement fits?</h2><p>Send a short description of the problem. We'll suggest the smallest sensible scope to test the idea before committing to a full build.</p><a class="btn" href="/contact/">Contact the studio</a></section>`;
}

function whatsappPage() {
  return pageHero("Platform overview", "WhatsApp Business API solutions, engineered and operated by Vertext Digital.", "Vertext Digital is a technology provider building software that integrates with the WhatsApp Business Platform and other Meta developer tools. We operate as the engineering team behind client deployments — handling onboarding, integration, message orchestration and ongoing compliance with Meta's policies.") + `<section class="container section card-grid three">${[["Tech provider posture", "We act as the technical integrator for clients onboarding to the WhatsApp Business Platform, with engineering capacity to support production workloads."], ["Cloud API first", "Our default deployment uses the official WhatsApp Cloud API hosted by Meta, reducing infrastructure overhead and aligning with Meta's recommended path."], ["Long-term operation", "Each solution is built to be maintained over years — with monitoring, message logs, retry logic and clear handover procedures."]].map(card).join("")}</section><section class="container section"><h2>What we deliver on the WhatsApp Business Platform</h2><div class="card-grid two">${[["Onboarding and verification", "Meta Business Manager configuration, business verification support, phone number registration and display name approval."], ["Conversational design", "Intent flows, fallback logic and human handover paths designed for the specific use case — support, sales or transactional notifications."], ["Template management", "Designing, submitting and version-controlling message templates so marketing and utility messages clear Meta's review process reliably."], ["Webhook and storage layer", "Server-side message ingestion, persistent storage, delivery receipts and analytics — built on TypeScript, Node and Postgres."], ["CRM and helpdesk integration", "Bidirectional sync with HubSpot, Zendesk, custom CRMs and internal databases so conversations don't live in a silo."], ["Compliance and policy", "Opt-in capture, message categorisation, rate limiting and adherence to the WhatsApp Business Messaging Policy."]].map(card).join("")}</div></section><section class="container cta slim"><h2>Looking for a WhatsApp Business API partner?</h2><p>Tell us about the use case — support automation, transactional notifications, sales flows or a custom build. We'll respond with a concrete integration plan.</p><a class="btn" href="/contact/">Contact us</a></section>`;
}

function aboutPage() {
  return pageHero("About", "A small studio focused on building software that businesses actually rely on.", "Vertext Digital was founded to build durable software for operating businesses. We work with companies that need internal tools, mobile apps and customer channels to keep running reliably for years, not to be rebuilt every quarter.") + `<section class="container section split"><div><p>Our engagements span custom web applications, mobile apps for iOS and Android, AI tooling, and conversational solutions on WhatsApp Business and the wider Meta developer platform.</p><p>We work as a small, senior team. The people who scope your project are the people who build it.</p></div><div class="card"><h2>How we work</h2><ul>${["Discovery before commitment", "Weekly delivery cadence", "Written architecture documentation", "Source code and infrastructure owned by the client", "Honest scope estimates and clear change management"].map(li).join("")}</ul></div></section><section class="container cta slim"><h2>Working with us</h2><p>We take on a limited number of engagements at a time so each project gets senior attention.</p><a class="btn" href="/contact/">Contact the studio</a></section>`;
}

function contactPage() {
  return `<section class="container page-hero split"><div><p class="eyebrow">Contact</p><h1>Tell us about the project.</h1><p>Share a short description of what you're trying to build or solve. We respond within two business days with an honest assessment and recommended next steps.</p><div class="contact-list"><p><strong>Email</strong><br><a href="mailto:hello@vertextdigital.com">hello@vertextdigital.com</a></p><p><strong>WhatsApp</strong><br><a target="_blank" rel="noopener noreferrer" href="https://wa.me/254706499848">+254 706 499 848</a></p><p><strong>Operating remotely</strong><br><span>Working with clients globally</span></p></div></div><form class="card" name="contact" method="POST" data-netlify="true"><input type="hidden" name="form-name" value="contact"><label>Full name<input name="name" required></label><label>Work email<input name="email" type="email" required></label><label>Company<input name="company"></label><label>Project type<select name="type"><option>Custom software</option><option>Mobile application</option><option>Website</option><option>WhatsApp Business API</option><option>AI tooling</option><option>Other</option></select></label><label>Brief description<textarea name="message" rows="5" required></textarea></label><button class="btn full" type="submit">Send message</button><p class="fine">By submitting this form you consent to being contacted about your enquiry.</p></form></section>`;
}

function termsPage() {
  return legalPage("Terms of Service", ["Acceptance of terms", "Services", "Client responsibilities", "Intellectual property", "Third-party platforms", "Confidentiality", "Limitation of liability", "Changes to these terms", "Contact"], "Terms governing use of the Vertext Digital website and engineering services.");
}

function privacyPage() {
  return legalPage("Privacy Policy", ["Introduction", "Information we collect", "How we use information", "WhatsApp and Meta platforms", "Data sharing", "Data retention", "Your rights", "Security", "Contact"], "How Vertext Digital collects, uses and protects personal information across its website and services.");
}

function legalPage(title, sections, intro) {
  return `<section class="container page-hero legal-page"><p class="eyebrow">Legal</p><h1>${title}</h1><p class="fine">Last updated: May 2026</p><div class="legal-copy"><p>${intro}</p>${sections.map((section, index) => `<section><h2>${index + 1}. ${section}</h2><p>${legalText(section)}</p></section>`).join("")}</div></section>`;
}

function pageHero(eyebrow, title, text) {
  return `<section class="container page-hero"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${text}</p></section>`;
}

function card([title, text]) {
  return `<article class="card"><h3>${title}</h3><p>${text}</p></article>`;
}

function li(text) {
  return `<li>${text}</li>`;
}

function bookingUrl(title) {
  return `https://wa.me/254706499848?text=${encodeURIComponent(`Hello Vertext Digital, I would like to book the "${title}" service. Please share the next steps.`)}`;
}

function sitemap() {
  const urls = ["/", "/services/", "/whatsapp-api/", "/about/", "/contact/", "/terms/", "/privacy/"].map((path) => `  <url>\n    <loc>${path}</loc>\n  </url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function legalText(section) {
  const text = {
    "Acceptance of terms": "By accessing the Vertext Digital website or engaging our engineering services you agree to be bound by these Terms of Service.",
    Services: "Vertext Digital provides software engineering, mobile application development, AI tooling, websites and WhatsApp Business API integrations. Specific deliverables, timelines and fees are defined in a separate written agreement.",
    "Client responsibilities": "Clients are responsible for providing accurate information, timely feedback and the access required for Vertext Digital to deliver agreed services.",
    "Intellectual property": "Upon full payment, custom code and assets produced under a signed engagement are owned by the client, subject to third-party components that retain their original licences.",
    "Third-party platforms": "Solutions involving WhatsApp Business API, Meta platforms or other third-party providers are subject to the policies and terms of those providers.",
    Confidentiality: "Each party agrees to keep confidential any non-public information shared during an engagement and to use such information only for the purpose of delivering the services.",
    "Limitation of liability": "To the maximum extent permitted by law, Vertext Digital's aggregate liability is limited to the fees paid by the client for the services giving rise to the claim.",
    "Changes to these terms": "We may update these terms from time to time. Material changes will be reflected by updating the last updated date.",
    Introduction: "This Privacy Policy explains how Vertext Digital collects, uses and safeguards information when you visit our website or engage our services.",
    "Information we collect": "We collect information you provide directly, such as your name, email address, company and project details, and limited technical information for analytics and security.",
    "How we use information": "Personal information is used to respond to enquiries, deliver and improve services, operate and secure the website, and comply with legal obligations.",
    "WhatsApp and Meta platforms": "When you contact us via WhatsApp or interact with solutions we operate on the WhatsApp Business Platform, messages are processed through Meta's infrastructure subject to Meta's own privacy terms.",
    "Data sharing": "We share personal information only with trusted service providers that help us operate the business and only to the extent necessary.",
    "Data retention": "We retain personal information only for as long as needed to fulfil the purposes described in this policy, satisfy legal requirements or resolve disputes.",
    "Your rights": "Subject to applicable law, you may request access to, correction of, or deletion of your personal information.",
    Security: "We apply appropriate technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration and destruction.",
    Contact: "Questions may be sent to hello@vertextdigital.com.",
  };
  return text[section] ?? "";
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function css() {
  return readFileSync(new URL("./netlify-static.css", import.meta.url), "utf8");
}