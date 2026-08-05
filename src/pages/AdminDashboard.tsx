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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import TagInput from "@/components/admin/TagInput";
import { roleGroups, techOptions } from "@/data/roles";


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
      toast.error(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          disabled={uploading}
          className="file:mr-2 file:rounded file:border-0 file:bg-primary/10 file:text-primary file:px-2 file:py-1 text-sm"
        />
        {uploading && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Icon icon="lucide:loader-2" className="w-3 h-3 animate-spin" /> Uploading…
          </span>
        )}
      </div>
      {value && (
        <img src={value} alt="preview" className="w-full sm:w-40 h-28 object-cover rounded-lg border" />
      )}
    </div>
  );
}

function EmptyState({ icon, label, onAdd }: any) {
  return (
    <Card className="p-8 flex flex-col items-center text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <Icon icon={icon} className="w-6 h-6 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">Nothing here yet.</p>
      <Button size="sm" onClick={onAdd}>
        <Icon icon="lucide:plus" className="w-4 h-4 mr-1.5" /> {label}
      </Button>
    </Card>
  );
}

function ItemRow({ image, title, subtitle, onEdit, onDelete }: any) {
  return (
    <Card className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:shadow-card transition-smooth">
      <img src={image} alt="" className="w-full sm:w-24 h-32 sm:h-16 object-cover rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{title}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 sm:truncate">{subtitle}</p>
      </div>
      <div className="flex gap-2 sm:shrink-0">
        <Button size="sm" variant="outline" onClick={onEdit} className="flex-1 sm:flex-none">
          <Icon icon="lucide:pencil" className="w-4 h-4 sm:mr-0 mr-1.5" />
          <span className="sm:hidden">Edit</span>
        </Button>
        <Button size="sm" variant="destructive" onClick={onDelete} className="flex-1 sm:flex-none">
          <Icon icon="lucide:trash-2" className="w-4 h-4 sm:mr-0 mr-1.5" />
          <span className="sm:hidden">Delete</span>
        </Button>
      </div>
    </Card>
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
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-bold">Projects <span className="text-muted-foreground font-normal">({data.length})</span></h2>
        <Button onClick={openNew} size="sm" className="shrink-0">
          <Icon icon="lucide:plus" className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">New Project</span>
        </Button>
      </div>

      {data.length === 0 ? (
        <EmptyState icon="lucide:folder-open" label="Add project" onAdd={openNew} />
      ) : (
        <div className="grid gap-3">
          {data.map((p) => (
            <ItemRow
              key={p.id}
              image={p.image}
              title={p.title}
              subtitle={p.description}
              onEdit={() => openEdit(p)}
              onDelete={() => remove(p.id)}
            />
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto w-[calc(100vw-1.5rem)] sm:w-full rounded-2xl">
          <DialogHeader><DialogTitle>{form?.id ? "Edit" : "New"} Project</DialogTitle></DialogHeader>
          {form && (
            <div className="space-y-3">
              <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div><Label>Tags (comma-separated)</Label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">Cancel</Button>
            <Button onClick={save} className="w-full sm:w-auto">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ExperiencesTab() {
  const { data, reload } = useExperiences();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(null);

  const openNew = () => { setForm({ date: "", title: "", short_desc: "", full_desc: "", category: "event", image: "", sort_order: data.length + 1, roles: [], techs: [], organization: "", org_logo: "", location: "" }); setOpen(true); };
  const openEdit = (p: any) => { setForm({ ...p, roles: p.roles ?? [], techs: p.techs ?? [] }); setOpen(true); };

  const save = async () => {
    const payload = {
      ...form,
      organization: form.organization || null,
      org_logo: form.org_logo || null,
      location: form.location || null,
      roles: form.roles ?? [],
      techs: form.techs ?? [],
    };
    const { error } = form.id
      ? await supabase.from("experiences").update(payload).eq("id", form.id)
      : await supabase.from("experiences").insert(payload);
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
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-bold">Experiences <span className="text-muted-foreground font-normal">({data.length})</span></h2>
        <Button onClick={openNew} size="sm" className="shrink-0">
          <Icon icon="lucide:plus" className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">New Experience</span>
        </Button>
      </div>

      {data.length === 0 ? (
        <EmptyState icon="lucide:calendar" label="Add experience" onAdd={openNew} />
      ) : (
        <div className="grid gap-3">
          {data.map((p) => (
            <ItemRow
              key={p.id}
              image={p.image}
              title={p.title}
              subtitle={`${p.date} · ${p.category}`}
              onEdit={() => openEdit(p)}
              onDelete={() => remove(p.id)}
            />
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto w-[calc(100vw-1.5rem)] sm:w-full rounded-2xl">
          <DialogHeader><DialogTitle>{form?.id ? "Edit" : "New"} Experience</DialogTitle></DialogHeader>
          {form && (
            <div className="space-y-3">
              <div><Label>Date</Label><Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
              <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Short Description</Label><Textarea value={form.short_desc} onChange={(e) => setForm({ ...form, short_desc: e.target.value })} /></div>
              <div><Label>Full Description</Label><Textarea rows={5} value={form.full_desc} onChange={(e) => setForm({ ...form, full_desc: e.target.value })} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div><Label>Organization / Company</Label><Input value={form.organization ?? ""} onChange={(e) => setForm({ ...form, organization: e.target.value })} /></div>
                <div><Label>Location (optional)</Label><Input value={form.location ?? ""} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
              </div>
              <TagInput label="Roles (multi, searchable, custom allowed)" value={form.roles ?? []} onChange={(v) => setForm({ ...form, roles: v })} groups={roleGroups} placeholder="Search role or type a custom one…" />
              <TagInput label="Technologies / Tools" value={form.techs ?? []} onChange={(v) => setForm({ ...form, techs: v })} options={techOptions} placeholder="Search tech or type a custom one…" />
              <ImageField label="Organization Logo (optional)" value={form.org_logo} onChange={(v: string) => setForm({ ...form, org_logo: v })} />
              <ImageField value={form.image} onChange={(v: string) => setForm({ ...form, image: v })} />

            </div>
          )}
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">Cancel</Button>
            <Button onClick={save} className="w-full sm:w-auto">Save</Button>
          </DialogFooter>
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
      <div>
        <h2 className="text-lg sm:text-xl font-bold">Profile Photos</h2>
        <p className="text-sm text-muted-foreground">Leave empty to keep the default /profile1.png.</p>
      </div>
      <Card className="p-4"><ImageField label="Landing Page Photo" value={hero} onChange={setHero} /></Card>
      <Card className="p-4"><ImageField label="About Page Photo" value={about} onChange={setAbout} /></Card>
      <Button onClick={save} className="w-full sm:w-auto">
        <Icon icon="lucide:save" className="w-4 h-4 mr-2" /> Save Photos
      </Button>
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Icon icon="lucide:loader-2" className="w-6 h-6 animate-spin text-primary" />
    </div>
  );
  if (!session) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 p-6 text-center">
        <Icon icon="lucide:shield-alert" className="w-12 h-12 text-destructive" />
        <p>You are not an admin.</p>
        <Button onClick={async () => { await supabase.auth.signOut(); nav("/portal"); }}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <Icon icon="lucide:layout-dashboard" className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold leading-tight">Dashboard</h1>
              <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{session.user.email}</p>
            </div>
          </div>
          <div className="flex gap-1.5 sm:gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => nav("/")} className="px-2 sm:px-3">
              <Icon icon="lucide:home" className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">View Site</span>
            </Button>
            <Button variant="outline" size="sm" onClick={async () => { await supabase.auth.signOut(); nav("/portal"); }} className="px-2 sm:px-3">
              <Icon icon="lucide:log-out" className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-11 p-1 rounded-xl">
            <TabsTrigger value="projects" className="rounded-lg flex items-center gap-1.5 text-xs sm:text-sm">
              <Icon icon="lucide:folder-git-2" className="w-4 h-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="experiences" className="rounded-lg flex items-center gap-1.5 text-xs sm:text-sm">
              <Icon icon="lucide:briefcase" className="w-4 h-4" />
              <span>Experience</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-lg flex items-center gap-1.5 text-xs sm:text-sm">
              <Icon icon="lucide:user-circle" className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-5 sm:mt-6"><ProjectsTab /></TabsContent>
          <TabsContent value="experiences" className="mt-5 sm:mt-6"><ExperiencesTab /></TabsContent>
          <TabsContent value="profile" className="mt-5 sm:mt-6"><ProfileTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
