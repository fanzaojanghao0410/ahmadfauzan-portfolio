// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProjects, useExperiences, useSiteProfile } from "@/hooks/useSiteData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

function ImageField({ value, onChange, label = "Image URL" }: any) {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (f: File) => {
    setUploading(true);
    try {
      const path = `uploads/${Date.now()}-${f.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error } = await supabase.storage.from("media").upload(path, f, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Uploaded");
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed (storage may be disabled — paste URL instead)");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
      <div className="flex items-center gap-2">
        <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} disabled={uploading} />
        {uploading && <span className="text-xs text-muted-foreground">Uploading...</span>}
      </div>
      {value && <img src={value} alt="preview" className="w-32 h-20 object-cover rounded border" />}
    </div>
  );
}

function ProjectsTab() {
  const { data, reload } = useProjects();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(null);

  const openNew = () => { setForm({ title: "", description: "", tags: "", icon: "lucide:code-2", status: "Completed", status_color: "bg-blue-500", link: "", github: "", image: "", sort_order: data.length + 1 }); setOpen(true); };
  const openEdit = (p: any) => { setForm({ ...p, tags: (p.tags ?? []).join(", ") }); setOpen(true); };
  const save = async () => {
    const payload = { ...form, tags: form.tags.split(",").map((t: string) => t.trim()).filter(Boolean), link: form.link || null, github: form.github || null };
    const { error } = form.id
      ? await supabase.from("projects").update(payload).eq("id", form.id)
      : await supabase.from("projects").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Saved"); setOpen(false); reload();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    reload();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Projects ({data.length})</h2>
        <Button onClick={openNew}><Icon icon="lucide:plus" className="w-4 h-4 mr-2" />New Project</Button>
      </div>
      <div className="grid gap-3">
        {data.map((p) => (
          <Card key={p.id} className="p-4 flex gap-4 items-center">
            <img src={p.image} className="w-20 h-14 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{p.title}</p>
              <p className="text-xs text-muted-foreground truncate">{p.description}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Icon icon="lucide:pencil" className="w-4 h-4" /></Button>
            <Button size="sm" variant="destructive" onClick={() => remove(p.id)}><Icon icon="lucide:trash-2" className="w-4 h-4" /></Button>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{form?.id ? "Edit" : "New"} Project</DialogTitle></DialogHeader>
          {form && (
            <div className="space-y-3">
              <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div><Label>Tags (comma-separated)</Label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Icon (iconify)</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></div>
                <div><Label>Status</Label><Input value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} /></div>
                <div><Label>Status Color (tailwind bg-*)</Label><Input value={form.status_color} onChange={(e) => setForm({ ...form, status_color: e.target.value })} /></div>
                <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: +e.target.value })} /></div>
                <div><Label>Live Link</Label><Input value={form.link ?? ""} onChange={(e) => setForm({ ...form, link: e.target.value })} /></div>
                <div><Label>Github</Label><Input value={form.github ?? ""} onChange={(e) => setForm({ ...form, github: e.target.value })} /></div>
              </div>
              <ImageField value={form.image} onChange={(v: string) => setForm({ ...form, image: v })} />
            </div>
          )}
          <DialogFooter><Button onClick={save}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ExperiencesTab() {
  const { data, reload } = useExperiences();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(null);

  const openNew = () => { setForm({ date: "", title: "", short_desc: "", full_desc: "", category: "event", image: "", sort_order: data.length + 1 }); setOpen(true); };
  const openEdit = (p: any) => { setForm({ ...p }); setOpen(true); };
  const save = async () => {
    const { error } = form.id
      ? await supabase.from("experiences").update(form).eq("id", form.id)
      : await supabase.from("experiences").insert(form);
    if (error) return toast.error(error.message);
    toast.success("Saved"); setOpen(false); reload();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (error) return toast.error(error.message);
    reload();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Experiences ({data.length})</h2>
        <Button onClick={openNew}><Icon icon="lucide:plus" className="w-4 h-4 mr-2" />New Experience</Button>
      </div>
      <div className="grid gap-3">
        {data.map((p) => (
          <Card key={p.id} className="p-4 flex gap-4 items-center">
            <img src={p.image} className="w-20 h-14 object-cover rounded" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.date} · {p.category}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Icon icon="lucide:pencil" className="w-4 h-4" /></Button>
            <Button size="sm" variant="destructive" onClick={() => remove(p.id)}><Icon icon="lucide:trash-2" className="w-4 h-4" /></Button>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{form?.id ? "Edit" : "New"} Experience</DialogTitle></DialogHeader>
          {form && (
            <div className="space-y-3">
              <div><Label>Date</Label><Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
              <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Short Description</Label><Textarea value={form.short_desc} onChange={(e) => setForm({ ...form, short_desc: e.target.value })} /></div>
              <div><Label>Full Description</Label><Textarea rows={5} value={form.full_desc} onChange={(e) => setForm({ ...form, full_desc: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">event</SelectItem>
                      <SelectItem value="committee">committee</SelectItem>
                      <SelectItem value="competition">competition</SelectItem>
                      <SelectItem value="performance">performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: +e.target.value })} /></div>
              </div>
              <ImageField value={form.image} onChange={(v: string) => setForm({ ...form, image: v })} />
            </div>
          )}
          <DialogFooter><Button onClick={save}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProfileTab() {
  const { data, reload } = useSiteProfile();
  const [hero, setHero] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (data) { setHero(data.hero_photo_url ?? ""); setAbout(data.about_photo_url ?? ""); }
  }, [data]);

  const save = async () => {
    if (!data) return;
    const { error } = await supabase.from("site_profile").update({ hero_photo_url: hero || null, about_photo_url: about || null, updated_at: new Date().toISOString() }).eq("id", data.id);
    if (error) return toast.error(error.message);
    toast.success("Profile updated"); reload();
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <h2 className="text-xl font-bold">Profile Photos</h2>
      <p className="text-sm text-muted-foreground">Leave empty to keep the default /profile1.png.</p>
      <Card className="p-4"><ImageField label="Landing Page Photo" value={hero} onChange={setHero} /></Card>
      <Card className="p-4"><ImageField label="About Page Photo" value={about} onChange={setAbout} /></Card>
      <Button onClick={save}>Save Photos</Button>
    </div>
  );
}

export default function AdminDashboard() {
  const { session, isAdmin, loading } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) nav("/portal", { replace: true });
  }, [session, loading, nav]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p>You are not an admin.</p>
        <Button onClick={async () => { await supabase.auth.signOut(); nav("/portal"); }}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">{session.user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => nav("/")}><Icon icon="lucide:home" className="w-4 h-4 mr-2" />View Site</Button>
            <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); nav("/portal"); }}>
              <Icon icon="lucide:log-out" className="w-4 h-4 mr-2" />Sign Out
            </Button>
          </div>
        </div>
        <Tabs defaultValue="projects">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-6"><ProjectsTab /></TabsContent>
          <TabsContent value="experiences" className="mt-6"><ExperiencesTab /></TabsContent>
          <TabsContent value="profile" className="mt-6"><ProfileTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
