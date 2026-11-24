insert into public.weavers_routes (path, name)
values ('/trabajos/workshopia', 'Workshopia')
on conflict (path) do nothing;

insert into public.weavers_element_clicks (element_key) values
  ('work.project.workshopia'),
  ('services.sistemas-agenticos.project.workshopia'),
  ('workshopia.back'),
  ('workshopia.pdf.academic-plan'),
  ('workshopia.pdf.facilitator-guide'),
  ('workshopia.pdf.commercial-brochure')
on conflict (element_key) do nothing;
