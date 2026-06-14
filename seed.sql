-- SEED DATA FOR MIANOS
-- Initialize Profiles
INSERT INTO profiles (name, title, location, availability_status, short_intro, github_username)
VALUES ('Mian Khizar', 'BSCS Student & Full Stack Developer', 'Pakistan', 'Open to Internships', 'Passionate about building futuristic, user-centric web applications focusing on mastering full-stack development.', 'miankhizar');

-- Initialize Projects
INSERT INTO projects (name, description, long_description, tech_stack, category, status, version)
VALUES
('PDF Generator', 'Generate customizable PDFs with adjustable margins, typography, and layouts.', 'A sophisticated digital hub engineered for modern asset delivery.', '{"React", "Node.js", "Supabase"}', 'Full Stack', 'STABLE', 'v1.2.0'),
('Anime Stream', 'Immersive anime streaming platform with futuristic HUD interface.', 'High-performance video delivery with glassmorphic HUD design.', '{"React", "Framer Motion", "Video.js"}', 'Frontend', 'BETA', 'v1.0.0');

-- Initialize Skills
INSERT INTO skills (name, level, category)
VALUES
('React', 85, 'Frontend'),
('Node.js', 80, 'Backend'),
('MySQL', 85, 'Database'),
('Supabase', 80, 'Database'),
('JavaScript', 90, 'Frontend');

-- Initialize Experience
INSERT INTO experience (year, title, organization, type, level_reached, description)
VALUES
('2024', 'Started Learning Programming', 'Self-Taught', 'learning', 10, 'Begun the journey with C++ and Web fundamentals.'),
('2025', 'Built Frontend Projects', 'Personal Prototypes', 'learning', 40, 'Developed a portfolio of 10+ projects including MianOS.');

-- Initialize Education
INSERT INTO education (institution, degree, semester, expected_graduation, relevant_subjects)
VALUES ('Riphah International University', 'BS Computer Science', '2nd Semester', '2027', '{"Programming Fundamentals", "Data Structures", "Database Systems"}');

-- Initialize Activities
INSERT INTO activities (content, type)
VALUES
('Updated Portfolio with Cyberpunk UI', 'update'),
('Implemented Supabase Authentication', 'system'),
('Created PDF Generator Utility', 'project');
