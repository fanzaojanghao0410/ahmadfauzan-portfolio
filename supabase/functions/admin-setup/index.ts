// One-time admin bootstrap. Creates the fixed admin account and assigns admin role.
// After an admin exists, this endpoint refuses to create another.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ADMIN_EMAIL = "fanzaojanghao@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, password } = await req.json();
    if (!email || !password || password.length < 8) {
      return json({ error: "Email and password (min 8 chars) required" }, 400);
    }
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      return json({ error: "This email is not authorized as admin" }, 403);
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Refuse if any admin role already exists
    const { data: existing, error: exErr } = await admin
      .from("user_roles").select("id").eq("role", "admin").limit(1);
    if (exErr) throw exErr;
    if (existing && existing.length > 0) {
      return json({ error: "Admin already exists. Use sign in instead." }, 409);
    }

    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email, password, email_confirm: true,
    });
    if (createErr) throw createErr;

    const userId = created.user!.id;
    const { error: roleErr } = await admin.from("user_roles").insert({ user_id: userId, role: "admin" });
    if (roleErr) throw roleErr;

    return json({ ok: true });
  } catch (e) {
    console.error("admin-setup error", e);
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
