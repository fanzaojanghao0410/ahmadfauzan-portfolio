ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'Web Application';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS problem text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tech_decisions text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS challenges text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS results text;