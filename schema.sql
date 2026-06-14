-- MianOS Supabase Schema
-- Includes tables, RLS policies, storage buckets, and initial seed data

-- 1. TABLES

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  title TEXT,
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  availability_status JSONB DEFAULT '{"freelance": true, "internship": true, "collaboration": true}'::jsonb,
  github_username TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  live_url TEXT,
  github_url TEXT,
  technologies TEXT[],
  category TEXT, -- Frontend, Backend, Full Stack, API, Open Source, Portfolio
  features TEXT[],
  challenges TEXT,
  version TEXT DEFAULT '1.0.0',
  status TEXT DEFAULT 'Completed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  order_index INTEGER DEFAULT 0
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT, -- Frontend, Backend, Database, Tools, Learning
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  order_index INTEGER DEFAULT 0
);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT,
  description TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  type TEXT, -- Learning, Work, Freelance, Open Source
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  order_index INTEGER DEFAULT 0
);

-- Education Table
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT,
  field_of_study TEXT,
  start_date DATE,
  end_date DATE,
  current_semester TEXT,
  achievements TEXT[],
  coursework TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  order_index INTEGER DEFAULT 0
);

-- Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  provider TEXT,
  issue_date DATE,
  image_url TEXT,
  verification_url TEXT,
  download_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  order_index INTEGER DEFAULT 0
);

-- Activity Feed Table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  icon TEXT,
  status TEXT,
  activity_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  order_index INTEGER DEFAULT 0
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB
);

-- 2. RLS POLICIES

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public Read
CREATE POLICY "Public Read Profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Read Skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public Read Education" ON education FOR SELECT USING (true);
CREATE POLICY "Public Read Certificates" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Activities" ON activities FOR SELECT USING (true);
CREATE POLICY "Public Read Social Links" ON social_links FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON settings FOR SELECT USING (true);

-- Admin Write
CREATE POLICY "Admin All Profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Experience" ON experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Education" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Certificates" ON certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Activities" ON activities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Social Links" ON social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Settings" ON settings FOR ALL USING (auth.role() = 'authenticated');

-- 3. SEED DATA

INSERT INTO profiles (full_name, title, location, bio, github_username)
VALUES ('Mian Khizar', 'BSCS Student & Full Stack Developer', 'Pakistan', 'I am Mian Khizar, a BSCS student passionate about building professional software products.', 'miankhizar');

INSERT INTO projects (name, description, category, technologies, status, order_index) VALUES
('Branch PDF Generator', 'Generate customizable PDFs with adjustable page layouts.', 'Full Stack', ARRAY['React', 'Node.js', 'Supabase'], 'Completed', 1),
('Anime Streaming Platform', 'Streaming platform featuring anime discovery.', 'Full Stack', ARRAY['React', 'Express', 'API Integration'], 'Completed', 2),
('Weather Dashboard', 'Real-time weather dashboard using Open-Meteo APIs.', 'Frontend', ARRAY['JavaScript', 'Weather API'], 'Completed', 3),
('MianOS', 'Personal developer operating system with modular architecture.', 'Portfolio', ARRAY['React', 'Supabase', 'Framer Motion'], 'In Progress', 4);

INSERT INTO skills (name, category, proficiency, order_index) VALUES
('HTML', 'Frontend', 95, 1), ('CSS', 'Frontend', 90, 2), ('JavaScript', 'Frontend', 90, 3),
('React', 'Frontend', 85, 4), ('Node.js', 'Backend', 80, 5), ('Express', 'Backend', 80, 6),
('MySQL', 'Database', 85, 7), ('Supabase', 'Database', 80, 8);
