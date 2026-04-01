# Mapa Exacto Del Proyecto Actual

## Resumen

Proyecto: `ParalelStore`

Tecnologia base:

- EverShop `2.1.1`
- un theme custom activo: `sample`
- una extension activa: `sample`

Configuracion activa:

- [config/default.json](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/config/default.json)
- idioma: `es`
- moneda: `COP`
- timezone: `America/Bogota`
- theme activo: `sample`
- extension activa: `sample`

## 1. Capa Raiz

### [package.json](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/package.json)

Rol:

- arranque y build principal de EverShop

Scripts:

- `npm run dev`
- `npm run build`
- `npm run start`

Decision:

- correcto dejar la orquestacion principal aqui

## 2. Config

### [config/default.json](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/config/default.json)

Rol actual:

- idioma, moneda y timezone
- activacion de theme y extension

Estado:

- bien ubicado
- es la fuente correcta para configuracion global

## 3. Theme Activo

Ruta:

- [themes/sample](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample)

Rol correcto del theme:

- controlar storefront visual
- header, footer, home, PLP, PDP y layout general

### Archivos globales del storefront

#### [themes/sample/src/pages/all/TopBar.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/TopBar.tsx)

Rol:

- franja superior operativa del header

Decision:

- debe quedarse en `theme`

#### [themes/sample/src/pages/all/Logo.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/Logo.tsx)

Rol:

- logo/marca textual del sitio

Decision:

- debe quedarse en `theme`

#### [themes/sample/src/pages/all/Menu.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/Menu.tsx)

Rol:

- navegacion principal `Hombre / Mujer / Ninos / Deportes`

Decision:

- debe quedarse en `theme`
- a mediano plazo conviene migrar el contenido del menu a un widget o menu configurable si el negocio va a editarlo seguido

#### [themes/sample/src/pages/all/SearchBox.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/SearchBox.tsx)

Rol:

- busqueda en header

Decision:

- debe quedarse en `theme`

#### [themes/sample/src/pages/all/CustomerIcon.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/CustomerIcon.tsx)

Rol:

- acceso a cuenta

Decision:

- debe quedarse en `theme`

#### [themes/sample/src/pages/all/MiniCartIcon.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/MiniCartIcon.tsx)

Rol:

- acceso al mini cart

Decision:

- debe quedarse en `theme`

#### [themes/sample/src/pages/all/Footer.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/Footer.tsx)

Rol:

- footer principal

Decision:

- debe quedarse en `theme`

#### [themes/sample/src/pages/all/FooterBottom.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/FooterBottom.tsx)

Rol:

- franja inferior de footer

Decision:

- debe quedarse en `theme`

#### [themes/sample/src/pages/all/SilenceFooter.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/SilenceFooter.tsx)

Rol:

- control de footer por vista

Decision:

- revisar si sigue siendo necesario
- si no aporta, conviene simplificarlo mas adelante

#### [themes/sample/src/pages/all/EveryWhere.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/all/EveryWhere.tsx)

Rol actual:

- componente nulo global en `content`

Decision:

- hoy no aporta valor
- conviene mantenerlo vacio solo si el theme necesita reservar esa convencion

### Home

#### [themes/sample/src/pages/homepage/OnlyHomePage.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/homepage/OnlyHomePage.tsx)

Rol previsto:

- home editorial Nike-inspired

Estado actual:

- el codigo existe
- compila a `dist`
- pero la home no lo esta montando

Problema detectado:

- EverShop no lo esta registrando correctamente para la ruta `homepage`
- hoy la `homepage` queda con `content` vacio en produccion

Decision:

- este archivo debe quedarse en `theme`
- pero debe corregirse su convencion/registro para que entre al build de `homepage`

Recomendacion:

- una vez funcione, dividir esta home en:
  - estructura base en theme
  - contenido comercial editable en widgets

### Categoria / PLP

#### [themes/sample/src/pages/categoryView/CategoryView.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/categoryView/CategoryView.tsx)

Rol:

- rediseño de listado de categoria

Decision:

- debe quedarse en `theme`
- es el lugar correcto para una experiencia tipo Nike

### PDP

#### [themes/sample/src/pages/productView/ProductView.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/productView/ProductView.tsx)
#### [themes/sample/src/pages/productView/Gallery.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/productView/Info.tsx)
#### [themes/sample/src/pages/productView/Form.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/productView/Form.tsx)
#### [themes/sample/src/pages/productView/Description.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/productView/Description.tsx)

Rol:

- galeria
- informacion de producto
- selector de variantes
- CTA de compra
- descripcion extendida

Decision:

- estos archivos deben quedarse en `theme`
- son la capa correcta para construir un PDP premium

Comentario:

- [Form.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/productView/Form.tsx) ya apunta bien a variantes de color/talla con `VariantSelector`

### Tipos del theme

#### [themes/sample/src/types/evershop.d.ts](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/types/evershop.d.ts)

Rol:

- compatibilidad TypeScript con imports y modulos de EverShop

Decision:

- debe quedarse
- es soporte tecnico del theme

## 4. Extension Activa

Ruta:

- [extensions/sample](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample)

Rol correcto de la extension:

- personalizacion operativa y funcional
- no storefront visual base

### Bootstrap y cron

#### [extensions/sample/src/bootstrap.ts](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/bootstrap.ts)

Rol actual:

- registra un cron demo cada minuto

#### [extensions/sample/src/crons/everyMinute.ts](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/crons/everyMinute.ts)

Rol actual:

- job de prueba

Decision:

- esto es demo heredado
- no aporta al negocio actual
- a futuro conviene eliminarlo o reemplazarlo por jobs reales

### Admin custom

#### [extensions/sample/src/pages/admin/all/Hello.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/admin/all/Hello.tsx)

Rol:

- banner operativo del dashboard

Decision:

- esta bien en `extension`
- es una personalizacion puntual del admin

#### [extensions/sample/src/components/admin/GuidePanel.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/components/admin/GuidePanel.tsx)

Rol:

- componente reusable para ayudas operativas

Decision:

- debe quedarse en `extension`

#### Guias operativas por pantalla

- [extensions/sample/src/pages/admin/productEdit+productNew/OperationsGuide.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/admin/productEdit+productNew/OperationsGuide.tsx)
- [extensions/sample/src/pages/admin/categoryEdit+categoryNew/OperationsGuide.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/admin/categoryEdit+categoryNew/OperationsGuide.tsx)
- [extensions/sample/src/pages/admin/collectionEdit+collectionNew/OperationsGuide.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/admin/collectionEdit+collectionNew/OperationsGuide.tsx)
- [extensions/sample/src/pages/admin/attributeEdit+attributeNew/OperationsGuide.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/admin/attributeEdit+attributeNew/OperationsGuide.tsx)
- [extensions/sample/src/pages/admin/cmsPageGrid/OperationsGuide.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/admin/cmsPageGrid/OperationsGuide.tsx)
- [extensions/sample/src/pages/admin/widgetGrid/OperationsGuide.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/admin/widgetGrid/OperationsGuide.tsx)

Rol:

- ayudas contextuales de operacion

Decision:

- estan bien ubicadas en `extension`
- no son una traduccion completa del admin
- sirven como capa operativa para el negocio

### FrontStore demo heredado

#### [extensions/sample/src/pages/frontStore/all/FreeShippingMessage.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/frontStore/all/FreeShippingMessage.tsx)
#### [extensions/sample/src/pages/frontStore/homepage/FooList.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/frontStore/foo/Foos.tsx)
#### [extensions/sample/src/pages/frontStore/foo/route.json](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/pages/frontStore/foo/route.json)

Rol actual:

- piezas demo/heredadas

Decision:

- no deberian formar parte de una base limpia para cliente
- conviene eliminarlas o reemplazarlas cuando se estabilice el proyecto

### API y GraphQL demo heredado

#### [extensions/sample/src/api/createFoo/route.json](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/api/createFoo/route.json)
#### [extensions/sample/src/api/createFoo/[bodyParser]createFoo.ts](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/api/createFoo/[bodyParser]createFoo.ts)
#### [extensions/sample/src/graphql/types/Foo/Foo.graphql](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/graphql/types/Foo/Foo.graphql)
#### [extensions/sample/src/graphql/types/Foo/Foo.resolvers.js](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/graphql/types/Foo/Foo.resolvers.js)

Rol actual:

- demo tecnico heredado del sample extension

Estado:

- parte de esto ya fue neutralizado para no romper el build

Decision:

- no es funcionalidad de negocio
- conviene retirarlo en una siguiente limpieza tecnica

### Subscribers demo

#### [extensions/sample/src/subscribers/product_created/consoleLog.js](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/subscribers/product_created/consoleLog.js)

Rol actual:

- demo de subscriber

Decision:

- no aporta al negocio actual

### Tipos de extension

#### [extensions/sample/src/types/evershop.d.ts](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/extensions/sample/src/types/evershop.d.ts)

Rol:

- soporte TypeScript de la extension

Decision:

- debe quedarse

## 5. Traducciones

### [translations/es/storefront.csv](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/translations/es/storefront.csv)

Rol:

- base de traducciones del storefront

Decision:

- esta en la capa correcta
- debe crecer y organizarse por dominio:
  - `general.csv`
  - `catalog.csv`
  - `checkout.csv`
  - `customer.csv`

## 6. Documentacion Del Proyecto

### [docs/paralel-admin-guide.md](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/docs/paralel-admin-guide.md)

Rol:

- guia operativa del admin para Paralel

Decision:

- correcta
- conviene mantenerla y corregir encoding en una futura pasada

### [docs/paralel-catalog-model.md](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/docs/paralel-catalog-model.md)

Rol:

- definicion del modelo de catalogo de Paralel

Decision:

- correcta
- conviene mantenerla y corregir encoding en una futura pasada

## 7. Problema Tecnico Actual Mas Importante

### Storefront en blanco

Estado:

- el admin si refleja las personalizaciones de la extension
- la home responde HTML pero el `content` sale vacio

Causa detectada:

- la implementacion nueva de home en [themes/sample/src/pages/homepage/OnlyHomePage.tsx](/c:/Users/herna/OneDrive/Escritorio/ParalelStore/app/themes/sample/src/pages/homepage/OnlyHomePage.tsx) no esta entrando correctamente al build de `homepage`

Implicacion:

- el problema no es del servidor ni de la base de datos
- es de convencion/registro/render dentro del sistema de vistas del theme

## 8. Mapa De Que Debe Ir En Cada Capa

### Debe quedarse en `theme`

- TopBar
- Logo
- Menu
- SearchBox
- CustomerIcon
- MiniCartIcon
- Footer
- FooterBottom
- CategoryView
- ProductView
- Gallery
- Info
- Form
- Description
- home base cuando quede corregida

### Debe quedarse en `extension`

- Hello del dashboard
- GuidePanel
- OperationsGuide de producto, categoria, coleccion, atributo, CMS y widgets
- futuras integraciones
- futuros importadores
- personalizaciones puntuales del admin

### Debe pasar gradualmente a `widgets`

- hero principal de la home
- carrusel editorial
- bloques de marcas
- banners de temporada
- grids de colecciones y destacados

### Debe permanecer en `translations`

- traducciones del storefront
- textos reutilizables de componentes custom

## 9. Prioridades Reales De Implementacion

1. Corregir el registro/render de la home para que el storefront vuelva a cargar.
2. Limpiar demo heredado de la extension `sample`.
3. Estabilizar el theme en home, PLP y PDP.
4. Migrar contenido hardcodeado de la home a widgets.
5. Completar traducciones y guias del admin.
6. Modelar catalogo real en categorias, atributos, variantes y colecciones.
7. Dejar lista una futura extension de importacion/sync.

## 10. Resumen Ejecutivo

Hoy el proyecto tiene una buena direccion de arquitectura, pero todavia mezcla:

- theme real
- extension demo heredada
- widgets aun no implementados
- contenido editorial todavia hardcodeado

La mejora correcta no es seguir metiendo cosas al azar, sino consolidar:

- `theme` como capa visual
- `extension` como capa operativa
- `widgets` como capa editable
- `translations` como capa idiomatica

Ese es el mapa correcto para convertir este proyecto en una base vendible para clientes.
