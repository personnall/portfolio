-- MianOS MySQL Database Schema
-- Optimized for MySQL 8.0 (ByetHost compatible)

CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  location VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  availability_status JSON,
  github_username VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  live_url TEXT,
  github_url TEXT,
  technologies TEXT, -- Stored as comma-separated or JSON string in MySQL
  category VARCHAR(100),
  features TEXT, -- Stored as JSON or comma-separated
  challenges TEXT,
  version VARCHAR(50) DEFAULT '1.0.0',
  status VARCHAR(100) DEFAULT 'Completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  proficiency INT,
  icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  institution VARCHAR(255) NOT NULL,
  degree VARCHAR(255),
  field_of_study VARCHAR(255),
  start_date DATE,
  end_date DATE,
  current_semester VARCHAR(50),
  achievements TEXT, -- JSON
  coursework TEXT, -- JSON
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  provider VARCHAR(255),
  issue_date DATE,
  image_url TEXT,
  verification_url TEXT,
  download_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  icon VARCHAR(100),
  status VARCHAR(100),
  activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS social_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(100),
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS settings (
  `key` VARCHAR(100) PRIMARY KEY,
  `value` TEXT
);

-- SEED DATA

INSERT INTO profiles (full_name, title, location, bio, github_username, availability_status)
VALUES ('Mian Khizar', 'BSCS Student & Full Stack Developer', 'Pakistan', 'I am Mian Khizar, a BSCS student passionate about building professional software products.', 'miankhizar', '{"freelance": true, "internship": true, "collaboration": true}');

INSERT INTO settings (`key`, `value`) VALUES ('Admin.Pass', 'admin123'); -- Default password

INSERT INTO projects (name, description, category, technologies, status, order_index) VALUES
('Branch PDF Generator', 'Generate customizable PDFs with adjustable page layouts.', 'Full Stack', 'React,Node.js,Supabase', 'Completed', 1),
('Anime Streaming Platform', 'Streaming platform featuring anime discovery.', 'Full Stack', 'React,Express,API', 'Completed', 2),
('Weather Dashboard', 'Real-time weather dashboard using Open-Meteo APIs.', 'Frontend', 'JavaScript,Weather API', 'Completed', 3),
('MianOS', 'Personal developer operating system with modular architecture.', 'Portfolio', 'React,MySQL,Framer Motion', 'In Progress', 4);

INSERT INTO skills (name, category, proficiency, order_index) VALUES
('HTML', 'Frontend', 95, 1), ('CSS', 'Frontend', 90, 2), ('JavaScript', 'Frontend', 90, 3),
('React', 'Frontend', 85, 4), ('Node.js', 'Backend', 80, 5), ('Express', 'Backend', 80, 6),
('MySQL', 'Database', 85, 7), ('Supabase', 'Database', 80, 8);
