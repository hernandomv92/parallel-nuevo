# Estado Actual Del Proyecto

## Fecha de corte

- 2026-03-28

## Estado general

Proyecto activo: `ParalelStore`

Fase actual completada:

- Fase 10

Siguiente fase recomendada:

- Carga real de catalogo y contenido comercial desde admin

## Fases completadas

Estado base actual:

- storefront base estable
- admin base guiado en espanol
- home con widgets editables
- extension demo limpia en `src` y `dist`
- base inicial de pago con Bold por redireccion lista en extension
- siguiente frente recomendado: carga real de catalogo, contenido CMS y ajustes comerciales finos desde admin

### Fase 0. Base tecnica y estabilidad

Estado:

- completada

Resultado:

- se corrigio el problema que dejaba la `homepage` fuera del build del theme
- el theme se ajusto para compilar en formato que EverShop si detecta
- la demo `FooList` dejo de competir con la home real
- el storefront volvio a responder contenido visible

Archivos clave:

- `themes/sample/package.json`
- `extensions/sample/src/pages/frontStore/homepage/FooList.tsx`

Validacion realizada:

- `npm run build`
- smoke test de `/` con respuesta `200`

### Fase 1. Shell global del sitio

Estado:

- completada

Resultado:

- se consolido el header global
- se mejoro la busqueda del header
- se agrego navegacion movil en `headerBottom`
- se limpio el footer para dejar rutas mas coherentes con el catalogo actual

Archivos clave:

- `themes/sample/src/pages/all/TopBar.tsx`
- `themes/sample/src/pages/all/Menu.tsx`
- `themes/sample/src/pages/all/MobileMenu.tsx`
- `themes/sample/src/pages/all/SearchBox.tsx`
- `themes/sample/src/pages/all/Footer.tsx`
- `themes/sample/src/pages/all/FooterBottom.tsx`

Validacion realizada:

- compilacion del theme
- `npm run build`
- verificacion de registro de `MobileMenu` en `.evershop/build`

### Fase 2. Home comercial

Estado:

- completada

Resultado:

- la home se reforzo como vitrina comercial
- se incorporaron banners y logos locales de marcas reales
- se normalizaron assets reutilizables en `public/brand-assets`
- se mejoro la credibilidad visual del bloque de marcas

Archivos clave:

- `themes/sample/src/pages/homepage/OnlyHomePage.tsx`
- `public/brand-assets/*`

Validacion realizada:

- compilacion del theme
- `npm run build`
- smoke test de `/` con presencia de hero nuevo y assets locales

### Fase 3. Catalogo de categorias y PLP

Estado:

- completada

Resultado:

- la PLP ahora comunica mejor el contexto de categoria
- se agrego hero de categoria con imagen si existe
- se agregaron metricas rapidas de productos, subcategorias y filtros activos
- se agrego navegacion rapida a subcategorias cuando existan
- se mejoro la lectura de producto usando marca/deporte/color
- se agrego mensaje de estado vacio mas util

Archivos clave:

- `themes/sample/src/pages/categoryView/CategoryView.tsx`

Validacion realizada:

- compilacion del theme
- `npm run build`
- verificacion del build final sin errores

Nota operativa:

- `CategoryView` solo aparece cuando EverShop resuelve una categoria real
- si una URL como `/hombre` devuelve `404`, eso indica que la categoria aun no existe en datos o su `url_key` no coincide con esa ruta

### Fase 4. PDP o ficha de producto

Estado:

- completada

Resultado:

- se reforzo la galeria del producto con mejor lectura visual
- se mejoro el bloque principal de informacion con estado, precio, chips de contexto y logos de marca cuando existan assets compatibles
- se mejoro el bloque de variantes y compra con mensajes mas utiles para talla, soporte y confianza
- se enriquecio la descripcion con una ficha rapida derivada de atributos del producto

Archivos clave:

- `themes/sample/src/pages/productView/Gallery.tsx`
- `themes/sample/src/pages/productView/Info.tsx`
- `themes/sample/src/pages/productView/Form.tsx`
- `themes/sample/src/pages/productView/Description.tsx`

Validacion realizada:

- compilacion del theme
- `npm run build`
- verificacion del build final sin errores

## Situacion tecnica relevante

- existe una base visual estable en `home` y `categoryView`
- el shell global ya esta alineado con el proyecto
- la home ya usa assets locales de marca
- la PLP y la PDP ya pueden validarse con catalogo real base en lugar de datos demo

## Validacion complementaria posterior a Fase 4

Estado:

- completada

Resultado:

- se alinearon las categorias reales con la navegacion del sitio: `hombre`, `mujer`, `ninos`, `deportes`
- se cargaron 3 productos reales base usando assets locales en `public`
- se normalizaron las imagenes del catalogo en `public/catalog-assets`
- se dejo un script repetible para volver a sembrar este catalogo sin depender de cambios manuales en base de datos
- `CategoryView` y `ProductView` ya responden sobre rutas reales y no sobre placeholders

Archivos clave:

- `scripts/seed-paralel-catalog.mjs`
- `public/catalog-assets/*`

Validacion realizada:

- consulta directa a PostgreSQL para verificar categorias, productos, imagenes y atributos
- smoke test HTTP con respuesta `200` en `/hombre`
- smoke test HTTP con respuesta `200` en `/mujer`
- smoke test HTTP con respuesta `200` en `/hombre/jordan-rm-4-black-red`

Correccion posterior:

- se corrigio `CategoryView` para soportar descripciones enriquecidas de EverShop sin romper SSR en produccion
- las imagenes de producto pasaron del flujo `public/catalog-assets` al flujo nativo de catalogo `media -> /assets/...`
- se valido especificamente con `npm run start`, no solo en modo `dev`

Rutas reales disponibles:

- `/hombre`
- `/mujer`
- `/ninos`
- `/deportes`
- `/hombre/jordan-rm-4-black-red`
- `/mujer/nike-dunk-low-white-black`
- `/deportes/nike-lunar-roam-grey-black`

## Pendientes inmediatos

### Fase 5. Capa de contacto y conversion ligera

Estado:

- completada

Resultado:

- se definio una capa de contacto comercial reutilizable con configuracion centralizada
- la home ahora empuja una conversacion real con CTA a WhatsApp y bloque de conversion ligera
- la PLP agrega asesoría comercial contextual por categoria y CTA directo desde la vista de resultados
- la PDP agrega consulta rapida por WhatsApp para resolver talla, disponibilidad o pedido
- el footer ahora funciona como cierre comercial y no solo como bloque informativo

Archivos clave:

- `themes/sample/src/lib/contact.ts`
- `themes/sample/src/pages/homepage/OnlyHomePage.tsx`
- `themes/sample/src/pages/categoryView/CategoryView.tsx`
- `themes/sample/src/pages/productView/Form.tsx`
- `themes/sample/src/pages/productView/Info.tsx`
- `themes/sample/src/pages/all/Footer.tsx`

Validacion realizada:

- `npm run build`
- verificacion de cadenas y componentes nuevos en `themes/sample/dist`
- verificacion del build final en `.evershop/build`

Nota operativa:

- el numero de WhatsApp y el correo quedaron centralizados pero siguen en modo placeholder
- antes de pasar a una fase de conversion mas seria hay que reemplazar `+57 300 000 0000` y `ventas@paralelstore.co` por los datos reales del negocio

### Fase 6. Contacto formal y pagina dedicada

Estado:

- completada

Resultado:

- se creo la ruta real `/contacto` dentro del storefront
- la pagina ahora explica canal principal, horario, email, cobertura y expectativas de respuesta
- el menu desktop, el menu movil y el footer ya llevan a esta pagina
- `contact.ts` ahora normaliza el numero de WhatsApp desde el valor visible para evitar desalineacion entre texto y enlace

Archivos clave:

- `themes/sample/src/lib/contact.ts`
- `themes/sample/src/pages/all/Menu.tsx`
- `themes/sample/src/pages/all/MobileMenu.tsx`
- `themes/sample/src/pages/all/Footer.tsx`
- `extensions/sample/src/pages/frontStore/contact/route.json`
- `extensions/sample/src/pages/frontStore/contact/ContactPage.tsx`
- `extensions/sample/dist/pages/frontStore/contact/route.json`

Validacion realizada:

- `npm run tsc` en `themes/sample`
- `npm run tsc` en `extensions/sample`
- `npm run build`
- smoke test HTTP con respuesta `200` en `/contacto`
- smoke test HTTP confirmando presencia de hero y CTA de WhatsApp en la nueva pagina

Nota operativa:

- EverShop esta resolviendo esta ruta desde `extensions/sample/dist`, no desde `src`
- por eso la ruta nueva requirio completar tambien la salida compilada de la extension
- hoy la pagina `/contacto` replica los datos base de contacto dentro de la extension para no romper el build; mas adelante conviene centralizar esta configuracion en una capa compartida o editable

### Fase 7. Admin y modelo real de catalogo

Estado:

- completada

Resultado:

- se dejo un bootstrap reproducible para atributos, opciones, colecciones, paginas CMS y asignaciones editoriales de productos demo
- el admin ahora muestra una guia mas concreta sobre el modelo real de catalogo y el comando de bootstrap
- se documento el modelo operativo del catalogo para futuras sesiones y para la carga del equipo
- quedaron preparadas colecciones y paginas CMS base para que la siguiente fase mueva contenido hacia widgets y CMS

Archivos clave:

- `scripts/bootstrap-paralel-admin.mjs`
- `docs/admin-catalog-model.md`
- `extensions/sample/src/pages/admin/all/Hello.tsx`
- `extensions/sample/src/pages/admin/productEdit+productNew/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/attributeEdit+attributeNew/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/collectionEdit+collectionNew/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/cmsPageGrid/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/widgetGrid/OperationsGuide.tsx`

Validacion realizada:

- `node scripts/bootstrap-paralel-admin.mjs`
- verificacion directa en PostgreSQL de atributos base, colecciones base, paginas CMS base y links `product_collection`
- `npm run tsc` en `extensions/sample`
- `npm run build`

Nota operativa:

- la primera corrida del bootstrap revelo una diferencia real del esquema: `attribute` no tiene `updated_at` en esta base; el script ya quedo ajustado
- hoy el bootstrap cubre bien la base operativa del proyecto actual y sirve como punto de restauracion para nuevas sesiones

### Fase 8. Widgets y contenido editable

Estado:

- completada

Resultado:

- la home ya abre areas editables reales mediante `Area` y widgets nativos de EverShop
- se migraron a admin un bloque editorial, un bloque de colecciones y un banner operativo sin romper la estructura visual principal
- el bootstrap admin ahora restaura tambien widgets base para la home
- quedo documentado el mapa de areas editables para futuras sesiones

Archivos clave:

- `themes/sample/src/pages/homepage/OnlyHomePage.tsx`
- `scripts/bootstrap-paralel-admin.mjs`
- `extensions/sample/src/pages/admin/widgetGrid/OperationsGuide.tsx`
- `docs/homepage-widgets-map.md`

Validacion realizada:

- `node scripts/bootstrap-paralel-admin.mjs`
- `npm run tsc` en `themes/sample`
- `npm run tsc` en `extensions/sample`
- `npm run build`
- verificacion directa en PostgreSQL de widgets sembrados para `homepage`
- smoke test HTTP con respuesta `200` en `/`

Nota operativa:

- se movio a widgets el contenido que cambia mas seguido
- el hero principal, las tarjetas de genero y otros bloques de identidad siguen en codigo para no perder consistencia visual

### Fase 9. Limpieza final y cierre de base

Estado:

- completada

Resultado:

- se limpiaron restos demo de la extension `sample` en `src`
- se neutralizo el cron heredado y se retiraron rutas, GraphQL, API y subscriber `Foo`
- se reemplazaron varias salidas genericas a `/search` por rutas reales del catalogo actual
- se actualizo la documentacion operativa de la extension para futuras restauraciones

Archivos clave:

- `extensions/sample/src/bootstrap.ts`
- `extensions/sample/Readme.md`
- `themes/sample/src/pages/all/TopBar.tsx`
- `themes/sample/src/pages/all/SearchBox.tsx`
- `themes/sample/src/pages/all/MobileMenu.tsx`
- `themes/sample/src/pages/all/Footer.tsx`
- `themes/sample/src/pages/all/FooterBottom.tsx`
- `themes/sample/src/pages/homepage/OnlyHomePage.tsx`
- `extensions/sample/src/pages/frontStore/contact/ContactPage.tsx`

Validacion realizada:

- `npm run tsc` en `themes/sample`
- `npm run tsc` en `extensions/sample`
- `npm run build`

Nota operativa:

- `extensions/sample/dist` debe mantenerse limpio de artefactos demo viejos porque `tsc` no elimina archivos borrados en `src`
- todavia existe `FooList.tsx` como pieza neutra en homepage de la extension, pero no aporta UI ni bloquea el storefront

Siguiente fase recomendada:

- carga real de catalogo y contenido comercial sobre la base ya estabilizada

### Fase 10. Refinamiento comercial del admin

Estado:

- completada

Resultado:

- se retiro el bloque global grande con mensajes internos y se movio la narrativa principal a un `dashboard` mas claro para demo comercial
- se agregaron guias operativas nuevas en productos, cupones, categorias, colecciones y atributos
- se reforzo la ficha de producto con una explicacion puntual para SEO
- se agrego una guia puntual para explicar como crear variantes por talla dentro de edicion de producto
- se ajustaron guias existentes para hablar en tono de negocio y no depender de scripts o lenguaje interno
- se preparo una primera capa de traduccion `es` para labels, botones y textos frecuentes del admin

Archivos clave:

- `extensions/sample/src/pages/admin/all/Hello.tsx`
- `extensions/sample/src/pages/admin/dashboard/Overview.tsx`
- `extensions/sample/src/components/admin/GuidePanel.tsx`
- `extensions/sample/src/pages/admin/productGrid/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/productEdit+productNew/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/productEdit+productNew/SeoGuide.tsx`
- `extensions/sample/src/pages/admin/productEdit/VariantGuide.tsx`
- `extensions/sample/src/pages/admin/categoryGrid/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/collectionGrid/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/attributeGrid/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/couponGrid/OperationsGuide.tsx`
- `extensions/sample/src/pages/admin/couponEdit+couponNew/OperationsGuide.tsx`
- `translations/es/admin.csv`

Validacion realizada:

- revision de `docs/evershop-development-guide.md`
- verificacion de la guia oficial de traduccion de EverShop
- `npm run tsc` en `extensions/sample`
- `npm run build`

Nota operativa:

- la capa CSV traduce lo que EverShop expone por su sistema de locale, pero puede quedar texto aislado en ingles si algun modulo del core no pasa por traduccion en todos sus puntos
- si aparece texto residual en ingles, la siguiente iteracion debe cerrarlo con mas entradas en `translations/es/*.csv` o con personalizacion puntual via extension

Extension posterior:

- se dejo preparada una integracion base de Bold por redireccion con settings propios, metodo de pago custom, pantalla intermedia de pago y pagina de retorno
- la firma de integridad se genera en backend usando `order_id + amount + currency + integrity_key`
- queda pendiente cerrar la validacion definitiva del pago mediante consulta de transaccion y/o webhook antes de marcar ordenes como pagadas

## Regla para siguientes sesiones

Al cerrar cada fase se debe actualizar este archivo con:

- fase completada
- resultado logrado
- archivos clave tocados
- validacion realizada
- siguiente fase recomendada
