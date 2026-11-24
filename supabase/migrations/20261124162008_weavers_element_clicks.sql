create table public.weavers_element_clicks (
  element_key text primary key,
  total_clicks bigint not null default 0 check (total_clicks >= 0)
);

insert into public.weavers_element_clicks (element_key) values
  ('header.logo'),
  ('header.about-note'),
  ('header.language'),
  ('home.about'),
  ('home.work'),
  ('home.services.previous'),
  ('home.services.next'),
  ('work.close'),
  ('work.backdrop'),
  ('work.project.esmasqueunpinguino');

insert into public.weavers_element_clicks (element_key)
select replace(pattern, '{slug}', ltrim(routes.path, '/'))
from public.weavers_routes as routes
cross join (values
  ('home.services.{slug}.tab'),
  ('home.services.{slug}.open'),
  ('services.{slug}.back'),
  ('services.{slug}.scope'),
  ('services.{slug}.pricing')
) as keys(pattern)
where routes.path not in ('/', '/about', '/trabajos');

alter table public.weavers_element_clicks enable row level security;
revoke all on public.weavers_element_clicks from public, anon, authenticated;
grant select on public.weavers_element_clicks to service_role;

-- Only the invoker wrapper below is exposed through the Data API.
create schema weavers_analytics_private;
revoke all on schema weavers_analytics_private from public;
grant usage on schema weavers_analytics_private to anon;

create function weavers_analytics_private.increment_element_click(requested_key text)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.weavers_element_clicks
  set total_clicks = total_clicks + 1
  where element_key = requested_key;
$$;

revoke all on function weavers_analytics_private.increment_element_click(text)
  from public, anon, authenticated;
grant execute on function weavers_analytics_private.increment_element_click(text) to anon;

create function public.weavers_increment_element_click(element_key text)
returns void
language sql
security invoker
set search_path = ''
as $$
  select weavers_analytics_private.increment_element_click(element_key);
$$;

revoke all on function public.weavers_increment_element_click(text)
  from public, anon, authenticated;
grant execute on function public.weavers_increment_element_click(text) to anon;
