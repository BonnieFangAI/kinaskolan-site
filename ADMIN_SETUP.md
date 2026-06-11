# Kinaskolan Admin Notes

## Local Preview

- Public site: `http://localhost:3000/zh`
- Admin dashboard: `http://localhost:3000/admin`
- Admin sign-in: `http://localhost:3000/admin/sign-in`
- Preview admin email: `admin@kinaskolan.local`
- Preview admin password: `kinaskolan-admin`

## Current Admin Routes

- `/admin`
  Dashboard overview
- `/admin/news`
  News management list
- `/admin/teachers`
  Teacher profile list
- `/admin/courses`
  Course management list
- `/admin/activities`
  Activities and category list
- `/admin/hsk`
  HSK notices list
- `/admin/scholarships`
  Scholarships and study tours list
- `/admin/media`
  Media asset list
- `/admin/settings`
  Global site settings

Each section also has:

- `/admin/<section>/new`
  Create screen
- `/admin/<section>/<recordId>`
  Edit screen

## How To Use Right Now

1. Open `/admin`
2. You will be redirected to `/admin/sign-in` if not signed in
3. Sign in with the preview admin email and password above
4. Choose a section from the left sidebar
5. Use `Edit` to update a record
6. Use the top-right create button to open a new-record form
7. Click `Save changes` to persist data locally

## Important Current State

- The admin UI structure is in place
- The field structure is aligned with the Supabase schema
- Section pages already try to read live Supabase data if env vars are configured
- If Supabase is not configured, the admin falls back to local preview mode with cookie login and JSON file storage
- Preview saves are stored in `data/admin-preview-store.json`

## Supabase Setup Needed For Real Saving

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Then:

1. Create a Supabase project
2. Run `supabase/schema.sql`
3. Create staff users in Supabase Auth
4. Connect save actions for each module to table writes

## Schema Coverage

The schema already includes:

- `site_settings`
- `media_assets`
- `teachers`
- `courses`
- `news_posts`
- `activity_categories`
- `activities`
- `hsk_updates`
- `scholarship_study_tour_posts`

## Next Backend Step

Wire each editor form's save button to server actions that create/update rows in Supabase.
