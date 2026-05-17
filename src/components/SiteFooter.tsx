import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display font-semibold text-lg">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-brand" />
            Vertext Digital
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            A software engineering studio building business systems, mobile apps,
            websites, AI tools, and conversational platforms on WhatsApp and Meta.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-3">Platforms</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/whatsapp-api" className="hover:text-foreground">WhatsApp Business API</Link></li>
            <li><Link to="/services" className="hover:text-foreground">AI &amp; Chatbots</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Mobile Apps</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-prose py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vertext Digital. All rights reserved.</p>
          <p>Registered software solutions provider.</p>
        </div>
      </div>
    </footer>
  );
}
