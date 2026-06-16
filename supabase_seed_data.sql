-- Final Seed Data for MianOS Supabase
-- Ensure you have run supabase_schema.sql first.

-- 1. Insert Profile
INSERT INTO profiles (
  name,
  title,
  location,
  age,
  semester,
  availability_status,
  bio,
  long_intro,
  career_goal,
  github_username,
  technical_training
) VALUES (
  'Mian Khizar',
  'Full Stack Web Developer | Computer Science Student',
  'Pakistan',
  19,
  '2nd Semester',
  'Open to Internships',
  'I build modern web applications, management systems, streaming platforms, and AI-powered solutions.',
  'I am a passionate Computer Science student and web developer who enjoys building modern, responsive, and user-friendly web applications. I have experience developing streaming platforms, portfolio websites, educational systems, and management software. My focus is on creating practical solutions using modern web technologies while continuously learning new tools and frameworks.',
  'My goal is to become a professional Full Stack Software Developer, build scalable web applications, contribute to innovative technology projects, and continuously improve my expertise in software engineering.',
  'miankhizar',
  ARRAY['DIT', 'NAVTTC Courses', 'Online Technical Certifications']
);

-- 2. Insert Skills
INSERT INTO skills (name, level, category, order_index) VALUES
('HTML5', 95, 'Frontend', 1),
('CSS3', 90, 'Frontend', 2),
('JavaScript (ES6+)', 90, 'Frontend', 3),
('Tailwind CSS', 90, 'Frontend', 4),
('React', 85, 'Frontend', 5),
('Vite', 85, 'Frontend', 6),
('UI/UX Design', 80, 'Frontend', 7),
('Node.js', 80, 'Backend', 8),
('Express.js', 80, 'Backend', 9),
('PHP', 75, 'Backend', 10),
('REST APIs', 85, 'Backend', 11),
('Auth Systems', 80, 'Backend', 12),
('MySQL', 85, 'Database', 13),
('MongoDB', 75, 'Database', 14),
('Supabase', 80, 'Database', 15),
('Git', 90, 'Tools', 16),
('GitHub', 90, 'Tools', 17),
('VS Code', 95, 'Tools', 18),
('Vercel', 85, 'Tools', 19),
('Cloudflare', 80, 'Tools', 20),
('Problem Solving', 90, 'Other', 21);

-- 3. Insert Education
INSERT INTO education (institution, degree, semester, expected_graduation, relevant_subjects, achievements, order_index) VALUES
(
  'University Name (BSCS)',
  'Bachelor of Science in Computer Science',
  '2nd Semester',
  '2027',
  ARRAY['Programming', 'Databases', 'Web Technologies', 'System Design'],
  ARRAY['Pursuing degree with focus on software development'],
  1
),
(
  'Technical Institute',
  'Diploma in Information Technology (DIT)',
  'Completed',
  '2024',
  ARRAY['Computer Fundamentals', 'Networking', 'Office Applications'],
  ARRAY['Studied software concepts and hardware basics'],
  2
),
(
  'NAVTTC',
  'Technical Training Program',
  'Completed',
  '2024',
  ARRAY['IT Skills', 'Practical Development'],
  ARRAY['Enhanced practical IT and development skills'],
  3
);

-- 4. Insert Experience
INSERT INTO experience (year, title, organization, type, level_reached, description, order_index) VALUES
(
  '2024 - Present',
  'Freelance Web Developer',
  'Self-Employed',
  'freelance',
  85,
  'Designing responsive websites, building custom web applications, API integration, and website maintenance.',
  1
);

-- 5. Insert Projects
INSERT INTO projects (name, description, long_description, technologies, category, status, features, order_index) VALUES
(
  'School Management Software',
  'Complete administrative system for educational institutions.',
  'A complete school management system featuring student/teacher management, attendance tracking, and fee management.',
  ARRAY['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  'Full Stack',
  'STABLE',
  ARRAY['Student Management', 'Teacher Management', 'Attendance Tracking', 'Fee Management', 'PDF/CSV Export'],
  1
),
(
  'Anime Streaming Platform',
  'Immersive streaming experience with custom API integration.',
  'Developed an anime streaming website featuring trending searches, airing status, and episode management.',
  ARRAY['JavaScript', 'Vercel', 'APIs'],
  'Frontend',
  'BETA',
  ARRAY['Anime Search', 'Trending Anime', 'Episode Streaming', 'Custom API Integration'],
  2
),
(
  'AI Website Builder',
  'AI-powered platform for rapid website generation.',
  'Building an AI-powered platform inspired by modern website generation tools with live preview and code generation.',
  ARRAY['React', 'Tailwind', 'AI APIs'],
  'Full Stack',
  'DEVELOPMENT',
  ARRAY['Project Generation', 'Code Generation', 'Live Preview', 'AI Assistance'],
  3
),
(
  'MianOS Portfolio',
  'Personal developer operating system interface.',
  'A professional portfolio showcasing skills, projects, and experience through a unique terminal-inspired OS UI.',
  ARRAY['React', 'Supabase', 'Framer Motion', 'Tailwind'],
  'Full Stack',
  'STABLE',
  ARRAY['Terminal Interface', 'Command Palette', 'Achievement System', 'Admin Console'],
  4
);

-- 6. Insert Initial Activities
INSERT INTO activities (content, type, timestamp) VALUES
('Launched MianOS v2.0', 'update', NOW()),
('Completed Anime Streaming Prototype', 'project', NOW() - INTERVAL '2 days'),
('Integrated Supabase Authentication', 'system', NOW() - INTERVAL '5 days');
