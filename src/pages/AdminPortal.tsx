// @ts-nocheck
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

export default function AdminPortal() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "setup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav("/admin", { replace: true });
    });
  }, [nav]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    nav("/admin", { replace: true });
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-setup", { body: { email, password } });
    if (error || (data as any)?.error) {
      setLoading(false);
      return toast.error((data as any)?.error ?? error?.message ?? "Setup failed");
    }
    const { error: siErr } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (siErr) return toast.error(siErr.message);
    toast.success("Admin account created");
    nav("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="glass-card p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon icon="lucide:shield" className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Admin Portal</h1>
            <p className="text-xs text-muted-foreground">{mode === "signin" ? "Sign in to manage content" : "First-time setup"}</p>
          </div>
        </div>
        <form onSubmit={mode === "signin" ? handleSignIn : handleSetup} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" disabled={loading} className="w-full primary-button">
            {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Admin"}
          </Button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "setup" : "signin")}
            className="w-full text-xs text-muted-foreground hover:text-primary"
          >
            {mode === "signin" ? "First time? Set up admin" : "Back to sign in"}
          </button>
        </form>
      </Card>
    </div>
  );
}
