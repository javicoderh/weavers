# Plan SEO de Weavers

## 1. Alcance

- [x] Confirmar el dominio de producción y comprobar los estados HTTP actuales. En `https://weavers-gamma.vercel.app`, la portada y Workshopia devuelven 200. Nosotros, los ocho servicios y una ruta inexistente devolvieron 404 en el despliegue anterior a estos cambios.
- [x] Inventariar las rutas públicas. Portada, `/about`, ocho servicios del catálogo y `/trabajos/workshopia`.
- [x] Definir el alcance de la galería. Se conserva como diálogo de la portada. Workshopia tiene su propia URL.
- [x] Definir la intención por página. La portada presenta la oferta digital, Nosotros explica quién ofrece los servicios, cada servicio responde a una necesidad de contratación y Workshopia muestra un caso de generación de materiales educativos.

## 2. HTML y rutas

- [x] Prerenderizar las páginas públicas durante el build de Vite. Se verificaron 22 páginas con contenido y una página 404, además de sus recursos locales.
- [x] Configurar Vercel para servir las páginas por URL y devolver HTTP 404 en rutas desconocidas. Se verificó en la vista previa generada por GitHub.
- [x] Probar navegación, galería, selector de idioma y analítica en el navegador. Edge validó también el selector de servicios y la actualización de la canónica al navegar.

## 3. Metadatos y contenido

- [x] Añadir títulos, descripciones y canónicas por página.
- [x] Añadir tarjetas Open Graph y X con una imagen general y una de Workshopia.
- [x] Revisar encabezados, textos alternativos y enlaces rastreables a servicios y proyectos. Se verificó un encabezado principal por página y los enlaces internos del HTML generado.

## 4. Idiomas

- [x] Definir el alcance bilingüe. Ambas versiones serán indexables, con las URLs existentes en español y el prefijo `/en` para inglés.
- [x] Servir el idioma según la URL y generar `lang`, canónicas propias y `hreflang` recíproco. Se verificaron los 11 pares.

## 5. Publicación y verificación

- [x] Generar `sitemap.xml` y declarar su ubicación en `robots.txt`. Se verificaron 22 URLs únicas.
- [x] Compilar y verificar HTML inicial, metadatos, enlaces e imágenes. Se verificaron los 22 documentos públicos y la página de error.
- [x] Verificar en la vista previa de Vercel los estados HTTP, el sitemap y los metadatos e imágenes de las tarjetas de la portada y Workshopia.
- [ ] Verificar el dominio en Google Search Console, enviar el sitemap, inspeccionar URLs y revisar indexación e impresiones.

## 6. Investigación de palabras clave para Chile

El 24 de noviembre de 2026 se contrastaron las fichas de Weavers con resultados de búsquedas comerciales en español para diseño web, tiendas Shopify, apps móviles, agentes de IA y capacitación empresarial en Chile. La prioridad se basa en la coincidencia entre la consulta, lo que incluye el servicio y los ejemplos que puede ver el cliente. Los términos en inglés son adaptaciones para las páginas bajo `/en`. El volumen, la dificultad y las posiciones de Weavers siguen sin medirse.

- **Web y comercio.** Los proveedores consultados explicitan plataforma, precio inicial y alcance. Weavers puede responder estas preguntas con sus propios precios en CLP, el límite de cuatro secciones en la web y el catálogo de hasta 20 productos en Shopify. [Milaweb](https://www.milaweb.cl/) · [Kreadium](https://www.kreadium.cl/precios)
- **IA y capacitación.** En las fichas comerciales aparecen problemas concretos como responder consultas, ejecutar una tarea en otra herramienta o capacitar a un equipo con un caso real. El catálogo de Weavers permite dedicar una ficha a cada necesidad. [Autopilot](https://www.autopilot.cl/agentes-ia/) · [Vertex B2B](https://vertexb2b.cl/taller-ia-aplicada/)
- **Aplicaciones y videojuegos.** En apps, la plataforma y el uso en terreno ayudan a precisar el encargo. Para videojuegos se eligió una consulta de desarrollo por encargo, respaldada por la demo jugable de Lotus Ember. [MSCODE](https://www.mscode.cl/servicios/aplicaciones-moviles)

| Página | Consulta principal en español | Variantes específicas para esa página | Consulta principal en inglés |
| --- | --- | --- | --- |
| `/` | desarrollo web y automatización con IA en Chile | desarrollo de software a medida para empresas en Chile | web development and AI automation in Chile |
| `/pagina-web` | diseño de páginas web para pymes en Chile | precio de una página web en Chile, sitio web con formulario de contacto | website design for small businesses in Chile |
| `/e-commerce` | diseño de tiendas online con Shopify | cuánto cuesta una tienda Shopify en Chile, tienda online con pasarela de pago | Shopify online store design |
| `/chatbots` | chatbots para atención al cliente | chatbot de preguntas frecuentes, chatbot con derivación a una persona | custom chatbots for customer support |
| `/agentes` | agentes de IA para automatizar tareas | agente de IA para empresas, automatización con aprobación humana | AI agents for business automation |
| `/sistemas-agenticos` | sistemas multiagente para automatizar procesos | sistemas agénticos, coordinación de agentes de IA | multi-agent systems for workflow automation |
| `/apps` | desarrollo de aplicaciones móviles | desarrollo de apps iOS y Android, app a medida para trabajo en terreno | custom mobile app development for iOS and Android |
| `/juegos` | desarrollo de videojuegos a medida | prototipo de videojuego por encargo, desarrollo de juegos para navegador | custom video game development |
| `/capacitaciones-ia` | capacitación en inteligencia artificial para empresas | taller online de IA para equipos, precio de un taller de IA por grupo | practical AI training for business teams |
| `/trabajos/workshopia` | diseño de unidades didácticas con IA | Workshopia, ejemplo de planificación de talleres con IA | AI-assisted instructional design with Workshopia |
| `/about` | proyectos de Weavers | Weavers desarrollo web e IA, portafolio de Weavers | Weavers web development and AI projects |

**Primera prioridad de medición.** Revisar web, Shopify y chatbots. Las tres fichas combinan alcance, precio orientativo y proyectos que el visitante puede explorar. Para agentes y sistemas multiagente, comparar qué consultas llevan a la ficha de una tarea individual y cuáles llevan al piloto de dos agentes. Workshopia sirve a quien busca un ejemplo de esa coordinación.

**Aplicación editorial.** Usar la expresión principal en un título legible y describir el entregable en la página. Las variantes orientan ejemplos, precios y descripciones. Google puede construir el título y el fragmento a partir de distintos elementos de la página. [Títulos en Google](https://developers.google.com/search/docs/appearance/title-link) · [Fragmentos en Google](https://developers.google.com/search/docs/appearance/snippet)

- [x] Seleccionar una consulta principal y variantes por página a partir de la oferta de Weavers y las búsquedas revisadas.
- [x] Implementar y verificar 22 títulos y descripciones distintos, las tarjetas sociales y los datos estructurados de identidad del sitio en ambas portadas.
- [ ] Una vez verificado el dominio definitivo, registrar en Search Console los primeros 28 días completos. Comparar con los 28 siguientes por página, consulta, país e idioma de la URL. Revisar impresiones para medir alcance y clics y CTR para evaluar si el resultado atrae visitas.
