# Kinaskolan CMS Admin Notes

## Local Preview

- Public site: `http://localhost:3000/zh`
- Admin dashboard: `http://localhost:3000/admin`
- Admin sign-in: `http://localhost:3000/admin/sign-in`
- Preview admin email: `admin@kinaskolan.local`
- Preview admin password: `kinaskolan-admin`

## Phase 1 CMS Scope

The project is now scoped as a school CMS built with Next.js, Supabase, and TailwindCSS.

- `/admin`
  CMS dashboard
- `/admin/news`
  News posts with title, date, cover image, body copy, and SEO slug
- `/admin/teachers`
  Teacher profiles
- `/admin/courses`
  Course and textbook information
- `/admin/student-works`
  Recitation, calligraphy, student works, and extracurricular activity content
- `/admin/hsk`
  HSK exam notices, scholarship references, and study-tour notices inside the HSK area
- `/admin/media`
  Reusable image and media records, with Supabase Storage upload when the backend is configured
- `/admin/settings`
  Basic site settings, hero copy, school summary, and contact details

Each editable section also has:

- `/admin/<section>/new`
  Create screen
- `/admin/<section>/<recordId>`
  Edit screen

Study tours and scholarships are not a separate admin column in Phase 1.

## How To Use Right Now

1. Open `/admin`
2. Sign in with the preview admin email and password above if Supabase is not configured
3. Choose a section from the left sidebar
4. Use `Edit` to update a record
5. Use the top-right create button to open a new-record form
6. Click `Save changes`
7. Use `Delete record` on an edit screen when a record should be removed

## Persistence

- Without Supabase env vars, the admin runs in preview mode and saves to `data/admin-preview-store.json`
- With Supabase env vars, the admin signs in through Supabase Auth and writes directly to the Phase 1 CMS tables
- Media uploads use the public Supabase Storage bucket `site-media`
- Public pages read from Supabase when configured and fall back to seeded site content when Supabase is not configured

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Then:

1. Create a Supabase project
2. Run `supabase/schema.sql`
3. Create staff users in Supabase Auth
4. Deploy to a server-capable Next.js host such as Vercel

GitHub Pages remains suitable for the static public preview only; it cannot run the real admin login and Supabase server actions.

## Schema Coverage

The Phase 1 schema includes:

- `site_settings`
- `media_assets`
- `teachers`
- `courses`
- `news_posts`
- `student_works`
- `hsk_updates`
