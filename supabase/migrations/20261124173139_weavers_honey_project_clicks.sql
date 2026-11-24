insert into public.weavers_element_clicks (element_key) values
  ('work.project.casa-miel'),
  ('services.pagina-web.project.casa-miel'),
  ('services.e-commerce.project.casa-miel')
on conflict (element_key) do nothing;
