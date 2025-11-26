# ⚡ Quick Setup Guide - 5 Minute Version

## 🎯 What You Need

1. **Supabase Account** - [Sign up free](https://supabase.com)
2. **Google Account** - For Analytics

---

## Step 1: Supabase (15 min)

### 1.1 Create Project
1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Name: `unifyo-waitlist`
3. Save your database password
4. Wait 2-3 minutes

### 1.2 Get API Keys
1. **Settings** → **API**
2. Copy:
   - **Project URL** (`https://xxxxx.supabase.co`)
   - **anon public** key (long string)

### 1.3 Create Table
1. Go to **SQL Editor**
2. Paste and run:

```sql
CREATE TABLE waitlist_entries (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  current_country TEXT,
  dream_destination TEXT,
  field_of_study TEXT,
  current_status TEXT,
  expectations TEXT,
  source TEXT DEFAULT 'website_waitlist',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON waitlist_entries
  FOR INSERT TO public WITH CHECK (true);
```

### 1.4 Create `.env` File
In your project root, create `.env`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Replace with your actual values from step 1.2**

---

## Step 2: Google Analytics (10 min)

### 2.1 Create Property
1. Go to [analytics.google.com](https://analytics.google.com)
2. **Start measuring** → Fill in details
3. **Create stream** → **Web**
4. Copy **Measurement ID** (`G-XXXXXXXXXX`)

### 2.2 Update Code
1. Open `index.html`
2. Find line 63 and 68
3. Replace `GA_MEASUREMENT_ID` with your actual ID (`G-XXXXXXXXXX`)

**OR** add to `.env`:
```env
VITE_GA_ID=G-XXXXXXXXXX
```

---

## Step 3: Test (5 min)

1. **Restart dev server:**
```bash
npm run dev
```

2. **Test Waitlist:**
   - Submit form on website
   - Check Supabase → **Table Editor** → `waitlist_entries`
   - Should see your entry!

3. **Test Analytics:**
   - Visit your site
   - Go to Analytics → **Realtime**
   - Should see yourself as active user!

---

## ✅ Done!

Your `.env` should look like:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_GA_ID=G-XXXXXXXXXX
```

**Total Time:** ~30 minutes  
**Status:** Ready to launch! 🚀

---

**Need detailed instructions?** See `SETUP_BACKEND_AND_ANALYTICS.md`

