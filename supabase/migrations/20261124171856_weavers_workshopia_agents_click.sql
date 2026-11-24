insert into public.weavers_element_clicks (element_key)
values ('services.agentes.project.workshopia')
on conflict (element_key) do nothing;
