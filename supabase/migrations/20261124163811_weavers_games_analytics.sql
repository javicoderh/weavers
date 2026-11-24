insert into public.weavers_routes (path, name)
values ('/juegos', 'Juegos')
on conflict (path) do nothing;

insert into public.weavers_element_clicks (element_key) values
  ('home.services.juegos.tab'),
  ('home.services.juegos.open'),
  ('services.juegos.back'),
  ('services.juegos.scope'),
  ('services.juegos.pricing')
on conflict (element_key) do nothing;
