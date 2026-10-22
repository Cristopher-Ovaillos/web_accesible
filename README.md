# Inelco Ingeniería – sitio accesible (TP3: navegación accesible)

Sitio publicado: https://cristopher-ovaillos.github.io/web_accesible/

Cinco páginas (Inicio, Nosotros, Servicios, Catálogo, Contacto) más el mapa del sitio. Este repositorio conserva dos estados del trabajo sobre navegación:

- `tp3-inicial`: estado previo a las mejoras (commit `4c5a78e`).
- `tp3-final`: estado entregado.

Para ver el cambio completo: `git diff tp3-inicial tp3-final`.

## Cambios y hallazgos que resuelven

| Hallazgo | Criterio WCAG 2.1 | Cambio | Dónde |
|---|---|---|---|
| H-01 | 2.4.1 | Enlace "Saltar al contenido principal", oculto hasta recibir el foco, que lleva a `<main id="contenido-principal">` | Todas las páginas, `.skip-link` en `style.css` |
| H-02 | 3.2.5 (orientativo) | Se elimina la apertura automática del modal a los 2 s; se abre con el botón "Ver promoción vigente" | `index.html`, `script.js` |
| H-03 | 2.4.3 | Modal con `<dialog>` y `showModal()`: fondo inerte, foco dentro del diálogo, Esc cierra y el foco vuelve al botón de origen | `index.html`, `script.js`, `style.css` |
| H-04 | 1.3.1, 2.4.8 (orientativo) | `aria-current="page"` en el enlace de la página actual, con marca visual (negrita y subrayado) | Menú de todas las páginas |
| H-05 | 2.4.8 (orientativo), 2.4.5 | Migas de pan (`nav` + `ol`, `aria-label="Ruta de navegación"`) | Nosotros, Servicios, Catálogo, Contacto, Mapa del sitio |
| H-06 | 2.4.5 | Mapa del sitio como segunda vía, enlazado desde el pie de todas las páginas | `mapa-del-sitio.html`, `footer` |
| H-07 | 1.3.1, 2.4.1 | `<footer>` en todas las páginas y barra de navegación vertical (`nav` con `aria-label="Secciones de servicios"`) | Todas / `servicios.html` |
| H-08 | 2.4.6 | Los h1 empiezan con el nombre del enlace del menú | Nosotros, Servicios, Catálogo, Contacto |
| H-11 | 1.3.1 | Menú principal como lista (`ul`/`li`) en las seis páginas | Todas |

## Pendiente

- H-09: el logo y "Inicio" llevan al mismo destino con nombres distintos (3.2.4).
- H-10: el enlace al portal de soporte es externo, usa `http` y no avisa que sale del sitio (2.4.4).
- H-08 es parcial: el h1 de Inicio sigue siendo la consigna institucional.
