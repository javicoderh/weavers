insert into public.weavers_element_clicks (element_key)
values ('services.pagina-web.project.esmasqueunpinguino')
on conflict (element_key) do nothing;
