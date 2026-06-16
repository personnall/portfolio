-- MianOS Supabase Unified Schema
-- Run this in the Supabase SQL Editor

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLES

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT,
  location TEXT,
  age INTEGER,
  semester TEXT,
  bio TEXT, -- Short introduction
  long_intro TEXT,
  career_goal TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  availability_status TEXT, -- "Open to Internships", etc.
  github_username TEXT,
  technical_training TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  thumbnail_url TEXT,
  live_url TEXT,
  github_url TEXT,
  technologies TEXT[],
  category TEXT, -- Frontend, Backend, Full Stack, API, Open Source, Portfolio
  features TEXT[],
  challenges TEXT,
  version TEXT DEFAULT '1.0.0',
  status TEXT DEFAULT 'STABLE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  order_index INTEGER DEFAULT 0
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT, -- Frontend, Backend, Database, Tools, Other
  level INTEGER CHECK (level >= 0 AND level <= 100),
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  order_index INTEGER DEFAULT 0
);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year TEXT, -- "2024 - Present"
  title TEXT NOT NULL,
  organization TEXT,
  description TEXT,
  type TEXT, -- freelance, learning, work
  level_reached INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  order_index INTEGER DEFAULT 0
);

-- Education Table
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT,
  semester TEXT,
  expected_graduation TEXT,
  relevant_subjects TEXT[],
  achievements TEXT[],
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
  content TEXT NOT NULL,
  type TEXT, -- update, project, system
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
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

-- Settings Table (for general site config)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB
);

-- 3. RLS POLICIES

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
CREATE POLICY "Public Select" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public Select" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Select" ON skills FOR SELECT USING (true);
CREATE POLICY "Public Select" ON experience FOR SELECT USING (true);
CREATE POLICY "Public Select" ON education FOR SELECT USING (true);
CREATE POLICY "Public Select" ON certificates FOR SELECT USING (true);
CREATE POLICY "Public Select" ON activities FOR SELECT USING (true);
CREATE POLICY "Public Select" ON social_links FOR SELECT USING (true);
CREATE POLICY "Public Select" ON settings FOR SELECT USING (true);

-- Admin Write (Authenticated users)
CREATE POLICY "Admin All" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All" ON experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All" ON education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All" ON certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All" ON activities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All" ON social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All" ON settings FOR ALL USING (auth.role() = 'authenticated');
