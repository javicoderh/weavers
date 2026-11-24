insert into public.weavers_element_clicks (element_key)
values ('services.chatbots.project.nicolaszamara')
on conflict (element_key) do nothing;
