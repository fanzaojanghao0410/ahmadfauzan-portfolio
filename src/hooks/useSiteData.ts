// @ts-nocheck
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface DBProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  status: string;
  status_color: string;
  link: string | null;
  github: string | null;
  image: string;
  sort_order: number;
}

export interface DBExperience {
  id: string;
  date: string;
  title: string;
  short_desc: string;
  full_desc: string;
  category: 'event' | 'committee' | 'competition' | 'performance';
  image: string;
  sort_order: number;
}

export interface SiteProfile {
  id: string;
  hero_photo_url: string | null;
  about_photo_url: string | null;
}

export function useProjects() {
  const [data, setData] = useState<DBProject[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setData(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);
  return { data, loading, reload: load };
}

export function useExperiences() {
  const [data, setData] = useState<DBExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("experiences").select("*").order("sort_order");
    setData(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);
  return { data, loading, reload: load };
}

export function useSiteProfile() {
  const [data, setData] = useState<SiteProfile | null>(null);
  const load = async () => {
    const { data } = await supabase.from("site_profile").select("*").limit(1).maybeSingle();
    setData(data);
  };
  useEffect(() => { load(); }, []);
  return { data, reload: load };
}
