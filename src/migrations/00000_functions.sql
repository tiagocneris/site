-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- Create function to execute SQL
create or replace function public.exec_sql(sql text)
returns void language plpgsql security definer as $$
begin
  execute sql;
end;
$$;

-- Create function to initialize database
create or replace function public.init_database()
returns void language plpgsql security definer as $$
begin
  -- Create tables if they don't exist
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
  alter table public.users enable row level security;
  alter table public.settings enable row level security;
  alter table public.reports enable row level security;

  -- Create policies
  drop policy if exists "Users can view their own profile" on public.users;
  create policy "Users can view their own profile"
    on public.users for select
    using (auth.uid() = id);

  drop policy if exists "Users can update their own profile" on public.users;
  create policy "Users can update their own profile"
    on public.users for update
    using (auth.uid() = id);

  drop policy if exists "Users can view their own settings" on public.settings;
  create policy "Users can view their own settings"
    on public.settings for select
    using (auth.uid() = user_id);

  drop policy if exists "Users can update their own settings" on public.settings;
  create policy "Users can update their own settings"
    on public.settings for update
    using (auth.uid() = user_id);

  drop policy if exists "Anyone can create reports" on public.reports;
  create policy "Anyone can create reports"
    on public.reports for insert
    with check (true);

  drop policy if exists "Anyone can view reports" on public.reports;
  create policy "Anyone can view reports"
    on public.reports for select
    using (true);

  drop policy if exists "Users can update their own reports" on public.reports;
  create policy "Users can update their own reports"
    on public.reports for update
    using (
      reporter_id = auth.uid() or 
      exists (
        select 1 from public.users 
        where id = auth.uid() and role in ('ADMIN', 'ONG')
      )
    );
end;
$$;