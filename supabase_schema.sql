-- ========================================================
-- Little Techies Survey App: Supabase Database Setup
-- Run this in your Supabase SQL Editor (takes 5 seconds!)
-- ========================================================

-- 1. Create table for survey responses
create table if not exists public.survey_responses (
  id text primary key,
  child_name text not null,
  answers jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  formatted_time text,
  formatted_date text
);

-- 2. Enable Row Level Security (RLS)
alter table public.survey_responses enable row level security;

-- 3. Create policies so facilitators & kids can insert, view, and delete entries
create policy "Allow anonymous reads"
  on public.survey_responses
  for select
  using (true);

create policy "Allow anonymous inserts"
  on public.survey_responses
  for insert
  with check (true);

create policy "Allow anonymous deletes"
  on public.survey_responses
  for delete
  using (true);
