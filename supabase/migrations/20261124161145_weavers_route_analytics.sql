create table public.weavers_routes (
  path text primary key,
  name text not null
);

insert into public.weavers_routes (path, name) values
  ('/', 'Inicio'),
  ('/trabajos', 'Trabajos'),
  ('/about', 'Nosotros'),
  ('/e-commerce', 'E-commerce'),
  ('/pagina-web', 'Página web'),
  ('/chatbots', 'Chatbots'),
  ('/apps', 'Apps'),
  ('/agentes', 'Agentes'),
  ('/sistemas-agenticos', 'Sistemas agénticos'),
  ('/capacitaciones-ia', 'Capacitaciones IA');

create table public.weavers_route_visits (
  id uuid primary key default gen_random_uuid(),
  route_path text not null references public.weavers_routes (path),
  duration_ms bigint not null check (duration_ms > 0)
);

create index weavers_route_visits_route_path_idx
  on public.weavers_route_visits (route_path);

alter table public.weavers_routes enable row level security;
alter table public.weavers_route_visits enable row level security;

revoke all on public.weavers_routes, public.weavers_route_visits
  from public, anon, authenticated;

grant insert (route_path, duration_ms) on public.weavers_route_visits to anon;

create policy weavers_record_anonymous_visit
  on public.weavers_route_visits for insert to anon
  with check (true);

create view public.weavers_route_metrics with (security_invoker = true) as
select
  routes.path,
  routes.name,
  count(visits.route_path) as visits,
  round(avg(visits.duration_ms) / 1000, 3) as average_seconds
from public.weavers_routes as routes
left join public.weavers_route_visits as visits on visits.route_path = routes.path
group by routes.path, routes.name;

revoke all on public.weavers_route_metrics from public, anon, authenticated;
grant select on public.weavers_routes, public.weavers_route_visits, public.weavers_route_metrics
  to service_role;
