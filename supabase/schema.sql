create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'staff',
  created_at timestamptz not null default now()
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  locale text not null unique check (locale in ('zh', 'sv')),
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

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position_zh text not null,
  position_sv text not null,
  biography_zh text not null,
  biography_sv text not null,
  focus_zh text,
  focus_sv text,
  image_path text,
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
  cover_image_path text,
  cover_media_id uuid references media_assets(id) on delete set null,
  published_at timestamptz not null default now(),
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists student_works (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  title_zh text not null,
  title_sv text not null,
  summary_zh text not null,
  summary_sv text not null,
  body_zh text not null,
  body_sv text not null,
  cover_image_path text,
  cover_media_id uuid references media_assets(id) on delete set null,
  event_date date,
  highlights_zh text[] not null default '{}',
  highlights_sv text[] not null default '{}',
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

alter table profiles enable row level security;
alter table site_settings enable row level security;
alter table media_assets enable row level security;
alter table teachers enable row level security;
alter table courses enable row level security;
alter table news_posts enable row level security;
alter table student_works enable row level security;
alter table hsk_updates enable row level security;

create policy "Public can read site settings" on site_settings for select using (true);
create policy "Public can read teachers" on teachers for select using (true);
create policy "Public can read courses" on courses for select using (true);
create policy "Public can read news posts" on news_posts for select using (true);
create policy "Public can read student works" on student_works for select using (true);
create policy "Public can read hsk updates" on hsk_updates for select using (true);
create policy "Public can read media assets" on media_assets for select using (true);

create policy "Authenticated staff manage site settings" on site_settings for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage media assets" on media_assets for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage teachers" on teachers for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage courses" on courses for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage news posts" on news_posts for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage student works" on student_works for all using (auth.role() = 'authenticated');
create policy "Authenticated staff manage hsk updates" on hsk_updates for all using (auth.role() = 'authenticated');

create policy "Public can read site media" on storage.objects
  for select using (bucket_id = 'site-media');

create policy "Authenticated staff upload site media" on storage.objects
  for insert with check (bucket_id = 'site-media' and auth.role() = 'authenticated');

create policy "Authenticated staff update site media" on storage.objects
  for update using (bucket_id = 'site-media' and auth.role() = 'authenticated');
