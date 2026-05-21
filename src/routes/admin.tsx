import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Loader2, LogOut, Mail, Phone, Send, Trash2, Inbox, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Vertext Digital" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

interface Message {
  id: string; name: string; email: string; phone: string | null;
  project_type: string | null; message: string; replied: boolean; created_at: string;
}
interface Reply { id: string; message_id: string; body: string; created_at: string; }

const TOKEN_KEY = "vd_admin_token";

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") setToken(sessionStorage.getItem(TOKEN_KEY));
  }, []);

  if (!token) return <LoginScreen onLogin={(t) => { sessionStorage.setItem(TOKEN_KEY, t); setToken(t); }} />;
  return <Dashboard token={token} onLogout={() => { sessionStorage.removeItem(TOKEN_KEY); setToken(null); }} />;
}

function LoginScreen({ onLogin }: { onLogin: (t: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr("");
    try {
      const res = await fetch("/api/public/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Login failed");
      onLogin(j.token);
    } catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <form onSubmit={submit} className="card-surface w-full max-w-sm p-8 space-y-5">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="text-2xl mt-2">Sign in</h1>
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="mt-2 w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="mt-2 w-full bg-background border border-input rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <button type="submit" disabled={loading} className="btn-brand w-full">
          {loading ? <Loader2 className="animate-spin" size={16} /> : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unreplied" | "replied">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Message | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/public/admin/messages", { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) { onLogout(); return; }
      const j = await res.json();
      setMessages(j.messages || []);
      setReplies(j.replies || []);
    } finally { setLoading(false); }
  }, [token, onLogout]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filtered = messages.filter((m) => {
    if (filter === "replied" && !m.replied) return false;
    if (filter === "unreplied" && m.replied) return false;
    if (search) {
      const s = search.toLowerCase();
      return m.name.toLowerCase().includes(s) || m.email.toLowerCase().includes(s) || m.message.toLowerCase().includes(s);
    }
    return true;
  });

  const stats = {
    total: messages.length,
    unreplied: messages.filter((m) => !m.replied).length,
    replied: messages.filter((m) => m.replied).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container-prose flex items-center justify-between py-4">
          <div>
            <p className="eyebrow">Admin Panel</p>
            <h1 className="text-xl mt-1">Vertext Digital</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchAll} className="p-2 hover:bg-accent rounded-md" title="Refresh">
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 text-sm px-3 py-2 hover:bg-accent rounded-md">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="container-prose py-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard label="Total messages" value={stats.total} />
          <StatCard label="Awaiting reply" value={stats.unreplied} accent />
          <StatCard label="Replied" value={stats.replied} />
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <input
            placeholder="Search name, email or message…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] bg-card border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex gap-1 bg-card border border-input rounded-md p-1">
            {(["all", "unreplied", "replied"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs rounded ${filter === f ? "bg-brand text-white" : "hover:bg-accent"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-4">
          <div className="card-surface p-0 overflow-hidden max-h-[70vh] overflow-y-auto">
            {loading && messages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground"><Loader2 className="animate-spin inline" /></div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Inbox className="mx-auto mb-2" /> No messages
              </div>
            ) : filtered.map((m) => (
              <button key={m.id} onClick={() => setSelected(m)}
                className={`w-full text-left p-4 border-b border-border hover:bg-accent transition-colors ${selected?.id === m.id ? "bg-accent" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{m.name}</span>
                  {!m.replied && <span className="text-[10px] bg-brand text-white px-1.5 py-0.5 rounded">NEW</span>}
                </div>
                <div className="text-xs text-muted-foreground truncate">{m.email}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.message}</div>
                <div className="text-[10px] text-muted-foreground mt-2">{new Date(m.created_at).toLocaleString()}</div>
              </button>
            ))}
          </div>

          <div>
            {selected ? (
              <MessageDetail
                key={selected.id}
                message={selected}
                replies={replies.filter((r) => r.message_id === selected.id)}
                token={token}
                onReplied={fetchAll}
                onDeleted={() => { setSelected(null); fetchAll(); }}
              />
            ) : (
              <div className="card-surface p-12 text-center text-muted-foreground">
                Select a message to view and reply
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="card-surface p-4">
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className={`text-2xl font-semibold mt-1 ${accent ? "text-brand" : ""}`}>{value}</div>
    </div>
  );
}

function MessageDetail({ message, replies, token, onReplied, onDeleted }: {
  message: Message; replies: Reply[]; token: string; onReplied: () => void; onDeleted: () => void;
}) {
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  const send = async () => {
    if (!body.trim()) return;
    setSending(true); setErr("");
    try {
      const res = await fetch("/api/public/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ messageId: message.id, body }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Failed");
      setBody(""); onReplied();
    } catch (e: any) { setErr(e.message); }
    finally { setSending(false); }
  };

  const del = async () => {
    if (!confirm("Delete this message permanently?")) return;
    await fetch("/api/public/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: message.id }),
    });
    onDeleted();
  };

  return (
    <div className="card-surface p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{message.name}</h3>
          <div className="text-xs text-muted-foreground mt-1">{new Date(message.created_at).toLocaleString()}</div>
        </div>
        <button onClick={del} className="text-destructive p-2 hover:bg-destructive/10 rounded"><Trash2 size={16} /></button>
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <a href={`mailto:${message.email}`} className="flex items-center gap-1 text-brand hover:underline"><Mail size={12} /> {message.email}</a>
        {message.phone && <a href={`tel:${message.phone}`} className="flex items-center gap-1 text-brand hover:underline"><Phone size={12} /> {message.phone}</a>}
        {message.project_type && <span className="px-2 py-0.5 bg-muted rounded">{message.project_type}</span>}
      </div>

      <div className="p-4 bg-muted/40 rounded-md whitespace-pre-wrap text-sm">{message.message}</div>

      {replies.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Previous replies</div>
          {replies.map((r) => (
            <div key={r.id} className="p-3 bg-brand/5 border-l-2 border-brand rounded text-sm whitespace-pre-wrap">
              {r.body}
              <div className="text-[10px] text-muted-foreground mt-2">{new Date(r.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-border pt-4">
        <label className="text-sm font-medium">Reply via email</label>
        <textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)}
          placeholder={`Hi ${message.name},\n\n…`}
          className="mt-2 w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
        {err && <p className="text-sm text-destructive mt-2">{err}</p>}
        <button onClick={send} disabled={sending || !body.trim()} className="btn-brand mt-3 flex items-center gap-2">
          {sending ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
          Send reply
        </button>
      </div>
    </div>
  );
}
