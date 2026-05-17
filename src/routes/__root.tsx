import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has been moved or no longer exists.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-brand">Return home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-brand">
            Try again
          </button>
          <Link to="/" className="btn-ghost">Go home</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vertext Digital — Software, Mobile Apps and WhatsApp Business Solutions" },
      {
        name: "description",
        content:
          "Vertext Digital is a software engineering studio building custom websites, mobile apps, AI tools and WhatsApp Business API chatbots for growing companies.",
      },
      { name: "author", content: "Vertext Digital" },
      { property: "og:site_name", content: "Vertext Digital" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Vertext Digital — Software, Mobile Apps and WhatsApp Business Solutions" },
      {
        property: "og:description",
        content:
          "Software engineering, mobile apps and WhatsApp Business API integrations built for serious operators.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vertext Digital — Software, Mobile Apps and WhatsApp Business Solutions" },
      { name: "description", content: "At vertext digital, we build custom softwares,WhatsApp bots , mobile apps l. Websites and also integrate softwares to any systems" },
      { property: "og:description", content: "At vertext digital, we build custom softwares,WhatsApp bots , mobile apps l. Websites and also integrate softwares to any systems" },
      { name: "twitter:description", content: "At vertext digital, we build custom softwares,WhatsApp bots , mobile apps l. Websites and also integrate softwares to any systems" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/10290f81-af37-4c22-b2df-30c73ba78a48/id-preview-8e4c9e76--e1c1a1a1-0bb7-4294-8ad4-3028ff63afd1.lovable.app-1779040649015.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/10290f81-af37-4c22-b2df-30c73ba78a48/id-preview-8e4c9e76--e1c1a1a1-0bb7-4294-8ad4-3028ff63afd1.lovable.app-1779040649015.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Vertext Digital",
          url: "/",
          description:
            "Software engineering studio specialising in custom software, mobile apps, AI tooling and WhatsApp Business API integrations.",
          sameAs: [],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
