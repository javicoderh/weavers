insert into public.weavers_element_clicks (element_key) values
  ('work.project.salvemosquirilluca'),
  ('services.pagina-web.project.salvemosquirilluca')
on conflict (element_key) do nothing;
