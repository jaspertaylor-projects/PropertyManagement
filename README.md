# Harbor Rental Group Website

A modern property management website built with Next.js (App Router), Tailwind CSS v4, shadcn/ui, and Supabase.

## Features
- **Public Listings**: Browse available rentals with advanced filtering.
- **Listing Details**: View high-quality image galleries, property facts, and amenities.
- **Inquiry System**: Contact forms on listing pages feed directly into the manager's dashboard.
- **Manager Dashboard**: Secure, password-protected area to manage the full property lifecycle.
- **CRUD Operations**: Create, edit, publish, and archive rental listings.
- **Inbox**: Track and respond to prospective tenant inquiries.

---

## 🚀 Setup Guide: Running Locally

This section covers how to set up the project on your local machine for development.

### Step 1: Create a Supabase Project
1. Go to [Supabase](https://supabase.com/) and create an account or sign in.
2. Click **New Project** and select an organization.
3. Give your project a name (e.g., `harbor-rental-dev`), generate a strong Database Password, and select a region close to you.
4. Click **Create new project**. It will take a minute or two to provision.

### Step 2: Configure Supabase Database & Auth
Once your project is ready:
1. **Run Migrations**: 
   - Go to the **SQL Editor** (the `<>` icon on the left sidebar).
   - Click **New Query**.
   - Copy the entire contents of `supabase/migrations/01_schema.sql` from this codebase and paste it into the editor.
   - Click **Run** in the bottom right corner. This creates all tables and security policies.
2. **Add Demo Data**:
   - Open a new query in the SQL Editor.
   - Copy the contents of `supabase/seed.sql` and paste it into the editor.
   - Click **Run**. This populates the database with demo listings and a demo user.
3. **Create the Storage Bucket**:
   - Go to **Storage** (the folder icon on the left sidebar).
   - Click **New Bucket**.
   - Name the bucket EXACTLY: `listing-images`
   - Toggle the switch to make it a **Public bucket**.
   - Click **Save**.

### Step 3: Configure Environment Variables
1. In your Supabase dashboard, go to **Project Settings** (the gear icon at the bottom left) -> **API**.
2. Find the **Project URL** and your **API Keys**. Supabase has recently updated their key format:
   - Copy your **Publishable key** (starts with `sb_publishable_...`)
   - Copy your **Secret key** (starts with `sb_secret_...`)
3. In your local codebase, copy the `.env.local.example` file and name it `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
4. Fill in the values in `.env.local`. Map the new keys to the environment variables like this:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_secret_key_here
   ```
   *(Note: The secret key (service role) is required for admin actions. Never expose it to the browser).*

### Step 4: Run the Application
1. Install the dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` (or `3001` if 3000 is busy) in your browser.
4. **Create a Manager Account**:
   - Go to your Supabase Dashboard -> **Authentication** -> **Users**.
   - Click **Add user** -> **Create new user**.
   - Enter an email (e.g., `admin@harborrentalgroup.com`) and a password.
   - Uncheck "Auto Confirm User" if you don't have email setup, or just manually confirm them if needed (Supabase usually auto-confirms if created via dashboard).
5. **Log in as Manager**: Navigate to `http://localhost:3000/login` in your browser and log in with the credentials you just created.

---

## 🌍 Deployment Guide: Running Online (Production)

To deploy your site so it is accessible on the internet, we recommend using **Vercel** for hosting the Next.js app and your existing **Supabase** project for the backend.

### Step 1: Prepare Supabase for Production
You can either use the same Supabase project you created for local development, or create a brand new one specifically for Production. If you create a new one, repeat **Step 1 and Step 2** from the local setup guide on your new project.

### Step 2: Push your code to GitHub
1. Initialize a git repository if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Create a new repository on [GitHub](https://github.com/).
3. Push your local code to the GitHub repository:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy to Vercel
1. Go to [Vercel](https://vercel.com/) and sign up or log in.
2. Click **Add New** -> **Project**.
3. Connect your GitHub account and select the repository you just pushed.
4. In the **Configure Project** step:
   - **Framework Preset**: Vercel should automatically detect `Next.js`.
   - **Root Directory**: Leave as `./`.
   - **Environment Variables**: You MUST add your Supabase keys here. Open the dropdown and add:
     - `NEXT_PUBLIC_SUPABASE_URL` = (Your Supabase Project URL)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Your Supabase Publishable key)
     - `SUPABASE_SERVICE_ROLE_KEY` = (Your Supabase Secret key)
5. Click **Deploy**. Vercel will build and deploy your application.
6. Once finished, Vercel will provide you with a live URL (e.g., `your-app-name.vercel.app`).

### Step 4: Update Supabase Authentication Redirects
For security, Supabase needs to know what URLs are allowed to handle authentication redirects (like logging in).
1. Go to your Supabase Dashboard -> **Authentication** -> **URL Configuration**.
2. **Site URL**: Change this to your new Vercel production URL (e.g., `https://your-app-name.vercel.app`).
3. **Redirect URLs**: Add your Vercel URL here as well (`https://your-app-name.vercel.app/**`).
   - *Tip: If you are still developing locally, make sure `http://localhost:3000/**` is also in the allowed Redirect URLs list.*
