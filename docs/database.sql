-- GatherGenius Acquisition Ready Build

create table if not exists public.gg_memories (
  id uuid primary key default gen_random_uuid(),
  user_key text not null default 'anonymous',
  type text not null default 'session',
  content text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_gg_memories_user_created
on public.gg_memories(user_key, created_at desc);

create table if not exists public.gg_beta_events (
  id uuid primary key default gen_random_uuid(),
  user_key text not null default 'anonymous',
  event text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_gg_beta_events_user_created
on public.gg_beta_events(user_key, created_at desc);

alter table public.gg_memories enable row level security;
alter table public.gg_beta_events enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='gg_memories' and policyname='service role full access gg_memories') then
    create policy "service role full access gg_memories"
    on public.gg_memories for all to service_role using (true) with check (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='gg_beta_events' and policyname='service role full access gg_beta_events') then
    create policy "service role full access gg_beta_events"
    on public.gg_beta_events for all to service_role using (true) with check (true);
  end if;
end $$;
