
-- =========================
-- Helper: updated_at trigger
-- =========================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- =========================
-- Profiles
-- =========================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  organization TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by owner"
  ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, organization)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'display_name',
    NEW.raw_user_meta_data ->> 'organization'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================
-- Reference: stakeholders
-- =========================
CREATE TABLE public.stakeholders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.stakeholders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stakeholders readable by everyone"
  ON public.stakeholders FOR SELECT USING (true);

-- =========================
-- Reference: outcomes
-- =========================
CREATE TABLE public.outcomes (
  id TEXT PRIMARY KEY,
  stakeholder_id TEXT NOT NULL REFERENCES public.stakeholders(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.outcomes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Outcomes readable by everyone"
  ON public.outcomes FOR SELECT USING (true);
CREATE INDEX idx_outcomes_stakeholder ON public.outcomes(stakeholder_id);

-- =========================
-- Reference: evidence levels
-- =========================
CREATE TABLE public.evidence_levels (
  id TEXT PRIMARY KEY,           -- bronze | silver | gold | diamond
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.evidence_levels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Evidence levels readable by everyone"
  ON public.evidence_levels FOR SELECT USING (true);

-- =========================
-- Reference: data collection templates
-- =========================
CREATE TABLE public.data_collection_templates (
  evidence_level_id TEXT PRIMARY KEY REFERENCES public.evidence_levels(id) ON DELETE CASCADE,
  method TEXT NOT NULL,
  questions JSONB NOT NULL DEFAULT '[]'::jsonb,
  sampling TEXT NOT NULL,
  additionality JSONB NOT NULL DEFAULT '{}'::jsonb,
  timing TEXT NOT NULL
);
ALTER TABLE public.data_collection_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Templates readable by everyone"
  ON public.data_collection_templates FOR SELECT USING (true);

-- =========================
-- User submissions: SROI projects
-- =========================
CREATE TABLE public.sroi_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  project_summary TEXT NOT NULL DEFAULT '',
  selected_stakeholders TEXT[] NOT NULL DEFAULT '{}',
  selected_outcomes TEXT[] NOT NULL DEFAULT '{}',
  evidence_levels JSONB NOT NULL DEFAULT '{}'::jsonb,
  calculate_sroi BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sroi_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own projects"
  ON public.sroi_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own projects"
  ON public.sroi_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own projects"
  ON public.sroi_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own projects"
  ON public.sroi_projects FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_sroi_projects_updated_at
  BEFORE UPDATE ON public.sroi_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_sroi_projects_user ON public.sroi_projects(user_id);
