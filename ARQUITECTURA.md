# Arquitectura de Weavers

Weavers usa React, Vite y `react-router-dom`. La aplicación parte con la ruta `/`. Los siguientes lineamientos guían la organización del código a medida que se incorporen páginas y funcionalidades.

## Principios SOLID

- **Responsabilidad única.** Cada componente se encarga de una parte de la interfaz. Extraemos la lógica de negocio, la comunicación con servicios o el estado reutilizable cuando ameriten una responsabilidad propia.
- **Abierto/cerrado.** Ampliamos la interfaz mediante composición, props y módulos independientes. Por ejemplo, una nueva página puede usar el layout existente y registrarse en el router.
- **Sustitución de Liskov.** Los componentes o servicios intercambiables respetan el mismo contrato, incluidos los datos de entrada, los resultados y los estados de error.
- **Segregación de interfaces.** Cada componente recibe únicamente las props y callbacks que necesita. Por ejemplo, un selector de idioma recibe el idioma activo y la función para cambiarlo.
- **Inversión de dependencias.** Los módulos de negocio dependen de contratos. Si una funcionalidad necesita un servicio externo, el punto de composición le proporciona la implementación mediante props, un proveedor o parámetros, según corresponda.

## Organización modular

Esta estructura es una referencia para el crecimiento de la app. Cada carpeta se incorpora cuando tiene código que alojar.

```text
src/
  main.jsx
  app/
    router.jsx
  layouts/
    AppLayout/
      AppLayout.jsx
      AppLayout.module.css
  pages/
    Home/
      Home.jsx
      Home.module.css
  features/
  components/
    Header/
      Header.jsx
      Header.module.css
    Footer/
      Footer.jsx
      Footer.module.css
  i18n/
    LanguageContext.jsx
    locales/
      es.json
      en.json
  styles/
    global.css
```

- `main.jsx` monta React y los proveedores de la aplicación. `app/router.jsx` centraliza las rutas y las conecta con sus páginas y layouts.
- `pages/` aloja las vistas de cada ruta. `layouts/` contiene las estructuras compartidas que envuelven esas vistas.
- `features/` agrupa por funcionalidad sus componentes, hooks y servicios. `components/` aloja piezas de interfaz compartidas entre funcionalidades.
- Cada componente tiene su propia hoja `Nombre.module.css` junto a `Nombre.jsx`. El componente importa su hoja y aplica las clases mediante CSS Modules. `styles/global.css` concentra los estilos de alcance global, como la tipografía base y las variables de diseño.

## Idiomas y textos de interfaz

Un `LanguageProvider` en la raíz de la aplicación expone el idioma activo, la acción para cambiarlo y una función `t(clave, valores?)`. Los componentes consumen ese contexto mediante `useLanguage()`. React vuelve a renderizar los textos al cambiar de idioma y el proveedor actualiza el atributo `lang` del documento.

- Guardamos todos los textos de interfaz en catálogos por idioma, incluidos títulos, botones, mensajes, validaciones, textos alternativos, etiquetas accesibles y títulos de página. El nombre de marca también se obtiene desde el catálogo con `brand.name`.
- Nombramos las claves según la función del texto y el lugar donde se usa. Por ejemplo, `header.homeLinkLabel` identifica la etiqueta accesible del enlace al inicio, `footer.copyright` identifica el aviso del pie de página y `home.title` identifica el título de la vista inicial.
- Conservamos las mismas claves y los mismos parámetros en todos los idiomas. Podemos cambiar la redacción sin renombrar la clave mientras su función siga siendo la misma.
- Usamos español (`es`) como idioma inicial y de respaldo. Si una traducción falta en el idioma activo, mostramos la versión en español. Durante el desarrollo, una clave ausente del catálogo base debe quedar visible para corregirla.
- Traducimos frases completas y pasamos los valores dinámicos como parámetros para que cada idioma pueda ordenarlos. Por ejemplo, `t('footer.copyright', { year })` resuelve la plantilla `© {year} Weavers`. Usamos `Intl` con el idioma activo para fechas, números y plurales.
- Para incorporar un idioma, agregamos su catálogo con las mismas claves y lo registramos entre los idiomas disponibles del contexto.

```jsx
const { t } = useLanguage()

return (
  <Link to="/" aria-label={t('header.homeLinkLabel')}>
    {t('brand.name')}
  </Link>
)
```

## Estética e interacción

- Buscamos una interfaz minimalista. Priorizamos iconos de significado reconocible para las acciones, con una etiqueta accesible traducida. Cuando una acción pueda resultar ambigua, usamos una etiqueta breve.
- Las descripciones, explicaciones y relatos de marca se organizan en módulos vinculados al elemento que les da contexto. El contenido se revela cuando la persona interactúa con ese elemento. Los nombres, precios y datos necesarios para decidir o completar una acción se leen directamente.
- En escritorio, las notas breves se abren al pasar el cursor o al llegar con el teclado. Se pueden recorrer con el puntero y cerrar con Escape. En pantallas táctiles se abren con un botón visible y se cierran al volver a tocarlo o tocar fuera.
- Reutilizamos `ContextNote` para aclaraciones breves. Para un relato extenso, usamos un panel desplegable con espacio de lectura. Cada módulo obtiene su contenido y sus etiquetas del contexto de idioma.

## Paleta

| Color | Hex | Variable CSS | Uso |
| --- | --- | --- | --- |
| Azul eléctrico profundo | `#183FE0` | `--color-accent` | Primer rombo del símbolo de marca |
| Blanco frío | `#F3F6FF` | `--color-text` | Texto principal |
| Azul grisáceo claro | `#A8B6D1` | `--color-text-muted` | Texto secundario |
| Azul noche | `#080D19` | `--color-canvas` | Fondo general y encabezado |
| Azul marino | #10182B | --color-surface | Fondo del pie de página |
| Blanco | #FFFFFF | --color-wordmark | Logo y contorno de foco |
| Gris azulado oscuro | `#26334E` | `--color-border` | Líneas divisorias |

Los componentes consumen estas variables globales desde sus hojas de estilos. El SVG de la marca combina el azul eléctrico con un segundo rombo en azul claro (`#536FFF`) y el nombre en blanco.
