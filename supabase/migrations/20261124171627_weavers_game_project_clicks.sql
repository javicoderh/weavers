insert into public.weavers_element_clicks (element_key) values
  ('work.project.lotus-ember'),
  ('services.juegos.project.lotus-ember')
on conflict (element_key) do nothing;
