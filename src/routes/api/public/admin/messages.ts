import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { isAdminAuthed } from "@/lib/admin-auth.server";

export const Route = createFileRoute("/api/public/admin/messages")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAdminAuthed(request)) return new Response("Unauthorized", { status: 401 });
        const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

        const { data: messages, error } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(500);
        if (error) return Response.json({ error: error.message }, { status: 500 });

        const ids = (messages ?? []).map((m) => m.id);
        let replies: any[] = [];
        if (ids.length) {
          const { data: r } = await supabase
            .from("message_replies")
            .select("*")
            .in("message_id", ids)
            .order("created_at", { ascending: true });
          replies = r ?? [];
        }
        return Response.json({ messages, replies });
      },
      DELETE: async ({ request }) => {
        if (!isAdminAuthed(request)) return new Response("Unauthorized", { status: 401 });
        const body = await request.json().catch(() => ({}));
        const id = body?.id;
        if (typeof id !== "string") return Response.json({ error: "id required" }, { status: 400 });
        const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
        const { error } = await supabase.from("contact_messages").delete().eq("id", id);
        if (error) return Response.json({ error: error.message }, { status: 500 });
        return Response.json({ ok: true });
      },
    },
  },
});
