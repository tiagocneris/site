-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- Create users table
create table if not exists public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null,
  phone text,
  address text,
  avatar_url text,
  role text not null default 'USER' check (role in ('USER', 'ADMIN', 'ONG')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create settings table
create table if not exists public.settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) unique not null,
  notifications boolean default true,
  email_updates boolean default true,
  language text default 'pt-BR',
  theme text default 'light',
  privacy_enabled boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

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

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger users_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

create trigger settings_updated_at
  before update on public.settings
  for each row
  execute function public.handle_updated_at();

create trigger reports_updated_at
  before update on public.reports
  for each row
  execute function public.handle_updated_at();

-- Create init_database function
create or replace function public.init_database()
returns void as $$
begin
  -- Enable RLS
  alter table public.users enable row level security;
  alter table public.settings enable row level security;
  alter table public.reports enable row level security;

  -- Users policies
  create policy if not exists "Users can view their own profile"
    on public.users for select
    using (auth.uid() = id);

  create policy if not exists "Users can update their own profile"
    on public.users for update
    using (auth.uid() = id);

  -- Settings policies
  create policy if not exists "Users can view their own settings"
    on public.settings for select
    using (auth.uid() = user_id);

  create policy if not exists "Users can update their own settings"
    on public.settings for update
    using (auth.uid() = user_id);

  -- Reports policies
  create policy if not exists "Anyone can create reports"
    on public.reports for insert
    with check (true);

  create policy if not exists "Anyone can view reports"
    on public.reports for select
    using (true);

  create policy if not exists "Users can update their own reports"
    on public.reports for update
    using (
      reporter_id = auth.uid() or 
      exists (
        select 1 from public.users 
        where id = auth.uid() and role in ('ADMIN', 'ONG')
      )
    );
end;
$$ language plpgsql;