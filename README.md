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

## 🌐 Netlify Deployment Guide

Follow these steps to host MianOS on Netlify:

### 1. Initial Deployment
1. Log in to your [Netlify Dashboard](https://app.netlify.com/).
2. Click **Add new site** > **Import an existing project**.
3. Connect your GitHub repository.
4. Set the following Build Settings:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**.

### 2. Storing Supabase Secrets (Environment Variables)
To ensure the OS can communicate with your database, you must add your secrets to Netlify:

1. Go to **Site Configuration** > **Environment variables**.
2. Click **Add a variable** > **Import from .env** or **Add a single variable**.
3. Add the following keys:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
4. Click **Save**.
5. Trigger a new deploy via **Deploys** > **Trigger deploy** to apply the changes.

### 3. SPA Routing
MianOS uses `react-router-dom`. The included `netlify.toml` automatically handles the redirect rules so that manual page refreshes on sub-routes (like `/projects`) don't return 404 errors.

## ⌨️ Commands & Shortcuts
- `Ctrl + K`: Open Command Palette.
- `Terminal > matrix`: Trigger digital rain.
- `Terminal > anime`: Toggle enhanced glow mode.
- `Terminal > help`: List all available system commands.

---
Developed by **Mian Khizar** | BSCS Student & Full Stack Developer
