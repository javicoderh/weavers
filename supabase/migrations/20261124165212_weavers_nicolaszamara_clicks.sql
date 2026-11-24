insert into public.weavers_element_clicks (element_key) values
  ('work.project.nicolaszamara'),
  ('services.pagina-web.project.nicolaszamara')
on conflict (element_key) do nothing;
