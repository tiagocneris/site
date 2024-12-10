-- Create reports table
create table if not exists public.reports (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('abuse', 'abandonment', 'injury', 'other')),
  description text not null,
  location jsonb not null,
  images text[] default array[]::text[],
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'resolved', 'cancelled')),
  reporter_id uuid references public.users(id),
  anonymous boolean not null default false,
  contact_info jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.reports enable row level security;

-- Create policies
create policy "Anyone can create reports"
  on public.reports for insert
  with check (true);

create policy "Anyone can view reports"
  on public.reports for select
  using (true);

create policy "Users can update their own reports"
  on public.reports for update
  using (
    reporter_id = auth.uid() or 
    exists (
      select 1 from public.users 
      where id = auth.uid() and role in ('ADMIN', 'ONG')
    )
  );

-- Create trigger for updated_at
create trigger reports_updated_at
  before update on public.reports
  for each row
  execute function handle_updated_at();

-- Create view for reports with reporter info
create or replace view public.reports_with_reporter as
select 
  r.*,
  u.name as reporter_name,
  u.email as reporter_email
from public.reports r
left join public.users u on r.reporter_id = u.id;