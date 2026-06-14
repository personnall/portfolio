# MianOS v2.0 - Developer Operating System

MianOS is a high-end, immersive "Developer Operating System" portfolio built with React and Supabase. It features an Anime Cyberpunk aesthetic inspired by *Cyberpunk: Edgerunners*, *Ghost in the Shell*, and *Serial Experiments Lain*.

## 🚀 Features

- **Futuristic HUD:** Glassmorphism, neon glows, and scanline effects.
- **System Terminal:** Functional terminal widget with custom commands (`matrix`, `anime`, `whoami`, `systeminfo`).
- **Command Palette:** Quick navigation and system actions via `Ctrl+K`.
- **Admin Console:** Secure "ROOT ACCESS" management area for Projects, Skills, and Activities.
- **Achievements System:** Hidden rewards for exploring the OS and interacting with terminal modules.
- **Customization:** Persistent settings for accent colors, animations, and accessibility.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend:** Supabase (PostgreSQL, Auth, Storage).
- **State Management:** TanStack Query (React Query), Context API.

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd mianos
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

## 🗄️ Supabase Setup

1. **Database Schema:**
   Run the contents of `supabase_schema.sql` in your Supabase SQL Editor to create tables and RLS policies.

2. **Seed Data:**
   Run `seed.sql` to populate the initial portfolio data.

3. **Authentication:**
   Enable Email/Password provider in Supabase Auth. Create an admin user through the Supabase Dashboard.

4. **Storage:**
   Create a public bucket named `portfolio` for certificate and project media.

## 🌐 Deployment

### Vercel / Netlify
1. Connect your GitHub repository.
2. Set the `Build Command` to `npm run build`.
3. Set the `Output Directory` to `dist`.
4. Add the Environment Variables from your `.env` file.

## ⌨️ Commands & Shortcuts
- `Ctrl + K`: Open Command Palette.
- `Terminal > matrix`: Trigger digital rain.
- `Terminal > anime`: Toggle enhanced glow mode.
- `Terminal > help`: List all available system commands.

---
Developed by **Mian Khizar** | BSCS Student & Full Stack Developer
