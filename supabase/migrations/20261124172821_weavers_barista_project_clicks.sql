insert into public.weavers_element_clicks (element_key) values
  ('work.project.alma-de-barista'),
  ('services.pagina-web.project.alma-de-barista')
on conflict (element_key) do nothing;
