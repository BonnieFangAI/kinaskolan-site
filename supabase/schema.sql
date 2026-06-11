create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'staff',
  created_at timestamptz not null default now()
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('zh', 'sv')),
  hero_title text not null,
  hero_subtitle text not null,
  about_summary text not null,
  contact_address text not null,
  contact_email text not null,
  contact_phone text not null,
  updated_at timestamptz not null default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_path text not null,
  alt_zh text,
  alt_sv text,
  created_at timestamptz not null default now()
);

create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position_zh text not null,
  position_sv text not null,
  biography_zh text not null,
  biography_sv text not null,
  focus_zh text,
  focus_sv text,
  media_id uuid references media_assets(id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  name_zh text not null,
  name_sv text not null,
  description_zh text not null,
  description_sv text not null,
  age_group_zh text not null,
  age_group_sv text not null,
  learning_objective_zh text not null,
  learning_objective_sv text not null,
  textbook_zh text not null,
  textbook_sv text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_zh text not null,
  title_sv text not null,
  excerpt_zh text not null,
  excerpt_sv text not null,
  body_zh text not null,
  body_sv text not null,
  cover_media_id uuid references media_assets(id) on delete set null,
  published_at timestamptz not null default now(),
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists activity_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_zh text not null,
  title_sv text not null,
  description_zh text not null,
  description_sv text not null,
  created_at timestamptz not null default now()
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references activity_categories(id) on delete cascade,
  slug text not null unique,
  title_zh text not null,
  title_sv text not null,
  summary_zh text not null,
  summary_sv text not null,
  body_zh text not null,
  body_sv text not null,
  event_date date,
  cover_media_id uuid references media_assets(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists hsk_updates (
  id uuid primary key default gen_random_uuid(),
  title_zh text not null,
  title_sv text not null,
  summary_zh text not null,
  summary_sv text not null,
  exam_date date,
  registration_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists scholarship_study_tour_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_zh text not null,
  title_sv text not null,
  summary_zh text not null,
  summary_sv text not null,
  body_zh text,
  body_sv text,
  cover_media_id uuid references media_assets(id) on delete set null,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table site_settings enable row level security;
alter table media_assets enable row level security;
alter table teachers enable row level security;
alter table courses enable row level security;
alter table news_posts enable row level security;
alter table activity_categories enable row level security;
alter table activities enable row level security;
alter table hsk_updates enable row level security;
alter table scholarship_study_tour_posts enable row level security;

create policy "Public can read site settings" on site_settings for select using (true);
create policy "Public can read teachers" on teachers for select using (true);
create policy "Public can read courses" on courses for select using (true);
create policy "Public can read news posts" on news_posts for select using (true);
create policy "Public can read activity categories" on activity_categories for select using (true);
create policy "Public can read activities" on activities for select using (true);
create policy "Public can read hsk updates" on hsk_updates for select using (true);
create policy "Public can read scholarships and study tours" on scholarship_study_tour_posts for select using (true);
create policy "Public can read media assets" on media_assets for select using (true);

create policy "Authenticated staff manage site settings" on site_settings for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage media assets" on media_assets for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage teachers" on teachers for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage courses" on courses for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage news posts" on news_posts for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage activity categories" on activity_categories for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage activities" on activities for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage hsk updates" on hsk_updates for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage scholarship posts" on scholarship_study_tour_posts for all using (auth.role() = 'authenticated');
