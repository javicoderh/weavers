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
