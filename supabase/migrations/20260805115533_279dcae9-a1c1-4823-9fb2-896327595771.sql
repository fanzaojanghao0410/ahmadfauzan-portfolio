ALTER TABLE public.experiences
  ADD COLUMN IF NOT EXISTS roles text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS techs text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS organization text,
  ADD COLUMN IF NOT EXISTS org_logo text,
  ADD COLUMN IF NOT EXISTS location text;