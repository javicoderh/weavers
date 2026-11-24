insert into public.weavers_element_clicks (element_key) values
  ('work.project.diseno-experimental'),
  ('services.pagina-web.project.diseno-experimental'),
  ('services.e-commerce.project.nicolaszamara')
on conflict (element_key) do nothing;
