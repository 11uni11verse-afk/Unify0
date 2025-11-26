# 🚀 Backend & Analytics Setup Guide

This guide will help you set up Supabase backend and Google Analytics in 30-45 minutes.

---

## 📋 Prerequisites

- A Supabase account (free tier works) - [Sign up here](https://supabase.com)
- A Google account for Google Analytics
- Your project open in the terminal

---

## Part 1: Supabase Setup (20-30 minutes)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Name:** `unifyo-waitlist` (or your choice)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free tier is fine
4. Click **"Create new project"**
5. Wait 2-3 minutes for project to initialize

### Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

**Save these - you'll need them in Step 4!**

### Step 3: Create Database Table

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Paste this SQL:

```sql
-- Create waitlist_entries table
CREATE TABLE IF NOT EXISTS waitlist_entries (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  current_country TEXT,
  dream_destination TEXT,
  field_of_study TEXT,
  current_status TEXT,
  expectations TEXT,
  source TEXT DEFAULT 'website_waitlist',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Add unique constraint on email to prevent duplicates
  CONSTRAINT unique_email UNIQUE(email)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_entries(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_entries(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (anyone can add to waitlist)
CREATE POLICY "Allow public inserts" ON waitlist_entries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reads (optional - only if you want to display entries)
-- Uncomment if you need to read entries from the app:
-- CREATE POLICY "Allow public reads" ON waitlist_entries
--   FOR SELECT
--   TO public
--   USING (true);
```

4. Click **"Run"** (or press Cmd/Ctrl + Enter)
5. You should see: "Success. No rows returned"

### Step 4: Configure Environment Variables

1. In your project root, create a file named `.env`:

```bash
# In terminal, run:
touch .env
```

2. Open `.env` and add:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the placeholder values with your actual values from Step 2

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example
```

### Step 5: Test Supabase Connection

1. Restart your dev server:
```bash
# Stop current server (Ctrl+C), then:
npm run dev
```

2. Open your browser to `http://localhost:8080`
3. Open browser console (F12 → Console tab)
4. Submit the waitlist form
5. Check console for:
   - ✅ `Waitlist submission saved to Supabase` = Success!
   - ❌ Any errors = Check your .env values

6. Verify in Supabase:
   - Go to **Table Editor** → `waitlist_entries`
   - You should see your test entry!

---

## Part 2: Google Analytics Setup (10-15 minutes)

### Step 1: Create Google Analytics Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **"Start measuring"** or **"Admin"** (if you have existing account)
3. If new account:
   - **Account Name:** `UnifyO` (or your choice)
   - **Account Data Sharing:** Choose your preferences
   - Click **"Next"**
4. **Property Setup:**
   - **Property Name:** `UnifyO Website`
   - **Reporting Time Zone:** Your timezone
   - **Currency:** Your currency
   - Click **"Next"**
5. **Business Information:**
   - Fill in your business details
   - Click **"Create"**
6. Accept Terms of Service

### Step 2: Get Measurement ID

1. In Google Analytics, go to **Admin** (gear icon) → **Data Streams**
2. Click **"Add stream"** → **"Web"**
3. Fill in:
   - **Website URL:** `https://yourdomain.com` (or `http://localhost:8080` for testing)
   - **Stream Name:** `UnifyO Website`
4. Click **"Create stream"**
5. Copy the **Measurement ID** (looks like: `G-XXXXXXXXXX`)

### Step 3: Update Your Code

1. **Update `index.html`:**

Replace lines 63 and 68 with your actual Measurement ID:

```html
<!-- Replace GA_MEASUREMENT_ID with your actual ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

2. **Update `src/lib/analytics.ts`:**

The file already uses environment variables, but you can also hardcode for now. Update line 27:

```typescript
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {  // Replace with your ID
      page_path: url,
    });
  }
};
```

**OR** add to `.env`:
```env
VITE_GA_ID=G-XXXXXXXXXX
```

And update `analytics.ts` to use it:
```typescript
const GA_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_ID, {
      page_path: url,
    });
  }
};
```

### Step 4: Test Google Analytics

1. Restart your dev server:
```bash
npm run dev
```

2. Open your site in browser
3. Open Google Analytics → **Reports** → **Realtime**
4. You should see yourself as an active user!
5. Test events:
   - Click a CTA button
   - Submit the waitlist form
   - Navigate between pages
6. Check **Realtime** view - events should appear within seconds

---

## ✅ Verification Checklist

### Supabase ✅
- [ ] Project created
- [ ] Table `waitlist_entries` created
- [ ] `.env` file created with correct values
- [ ] Form submission works
- [ ] Data appears in Supabase Table Editor
- [ ] No console errors

### Google Analytics ✅
- [ ] Property created
- [ ] Measurement ID copied
- [ ] `index.html` updated
- [ ] `analytics.ts` updated (if using env var)
- [ ] Realtime view shows activity
- [ ] Events are tracking

---

## 🐛 Troubleshooting

### Supabase Issues

**Problem:** "Missing Supabase environment variables"
- **Solution:** Check `.env` file exists and has correct variable names
- Make sure variables start with `VITE_`
- Restart dev server after creating `.env`

**Problem:** "Failed to insert"
- **Solution:** Check RLS policies are set correctly
- Verify table name matches: `waitlist_entries`
- Check column names match exactly

**Problem:** "Network error"
- **Solution:** Verify `VITE_SUPABASE_URL` is correct (no trailing slash)
- Check internet connection
- Verify Supabase project is active

### Google Analytics Issues

**Problem:** No data in Realtime view
- **Solution:** 
  - Check Measurement ID is correct (G-XXXXXXXXXX format)
  - Clear browser cache
  - Try incognito/private window
  - Check browser console for errors
  - Wait 30-60 seconds (can be delayed)

**Problem:** Events not tracking
- **Solution:**
  - Check `analytics.ts` functions are being called
  - Verify `window.gtag` exists (check console)
  - Check Measurement ID matches in both places

---

## 📝 Final `.env` File Template

Your `.env` file should look like this:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Analytics (Optional - can also hardcode in index.html)
VITE_GA_ID=G-XXXXXXXXXX
```

**Important:** 
- Never commit `.env` to git (already in `.gitignore` ✅)
- Keep your keys secure
- Use different keys for production vs development

---

## 🚀 Next Steps

Once both are set up:

1. **Test everything:**
   - Submit waitlist form → Check Supabase
   - Click buttons → Check Analytics Realtime
   - Navigate pages → Check Analytics page views

2. **Production Setup:**
   - Add `.env` variables to your hosting platform (Vercel, Netlify, etc.)
   - Update Measurement ID for production domain
   - Test production forms

3. **Monitor:**
   - Check Supabase dashboard daily for new signups
   - Check Google Analytics weekly for insights

---

## 🎉 You're Done!

Your website now has:
- ✅ Working waitlist backend (Supabase)
- ✅ User behavior tracking (Google Analytics)
- ✅ Data collection ready for launch!

**Estimated Setup Time:** 30-45 minutes  
**Difficulty:** Easy  
**Status:** Ready for launch! 🚀

---

**Need Help?** Check the troubleshooting section or review the code comments in:
- `src/lib/supabase.ts`
- `src/lib/analytics.ts`
- `src/components/WaitlistForm.tsx`

