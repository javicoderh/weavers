insert into public.weavers_element_clicks (element_key) values
  ('work.project.dev-stash'),
  ('services.pagina-web.project.dev-stash'),
  ('services.agentes.project.dev-stash')
on conflict (element_key) do nothing;
