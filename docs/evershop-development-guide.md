# Guia De Desarrollo En Evershop

## Objetivo

Esta guia sirve para entender como se debe editar EverShop de forma correcta cuando se desarrolla una tienda para un cliente. La idea es evitar tocar el core, reducir prueba y error, y separar bien lo visual, lo operativo y la logica del negocio.

## Principio base

En EverShop casi todo cae en una de estas capas:

- `config/`: configuracion del proyecto.
- `themes/<theme>/`: storefront visual.
- `extensions/<extension>/`: funcionalidad extra, admin custom, rutas, integraciones.
- `translations/<lang>/`: traducciones.
- `widgets`: bloques configurables desde admin que se muestran en el storefront.

La regla practica es esta:

- `theme` para experiencia visual del cliente.
- `extension` para comportamiento, operacion y personalizacion del admin.
- `widgets` para contenido editable sin tocar codigo.
- `config` para idioma, moneda, tema activo y extensiones activas.

## 1. Configuracion

Los ajustes globales viven en `config/default.json` y opcionalmente en archivos por entorno como `config/production.json`.

Aqui se define:

- `shop.language`
- `shop.currency`
- `shop.timezone`
- tema activo
- extensiones activas

Ejemplo de uso real:

- idioma de storefront: `es`
- moneda: `COP`
- tema activo: `sample`

## 2. Rutas Y Paginas

EverShop usa file-based routing.

- Las rutas viven dentro de `src/pages/...` o `src/api/...`.
- La carpeta representa el `routeId`.
- En modulos y extensiones, una ruta HTML normalmente vive junto a su `route.json` y su `index.js/ts`.

Hay dos grupos de paginas:

- `admin`: panel administrativo.
- `frontStore`: sitio publico.

Importante:

- El sistema es sensible a estructura y convenciones.
- Si un archivo compila pero no sigue la convencion esperada, puede no renderizarse aunque exista en `dist`.

## 3. Theme

El theme controla la capa visual del storefront.

Estructura tipica:

- `themes/<theme>/src/pages/all/`
- `themes/<theme>/src/pages/homepage/`
- `themes/<theme>/src/pages/categoryView/`
- `themes/<theme>/src/pages/productView/`
- `themes/<theme>/src/components/`
- `themes/<theme>/dist/`

Conceptos clave:

- `all/`: componentes comunes a todas las paginas.
- una carpeta por pagina: componentes especificos para esa vista.
- cada componente declara `layout = { areaId, sortOrder }`.

Esto significa que no se renderiza todo en un solo archivo, sino por areas.

Ejemplos de areas:

- header
- footer
- content
- product page sidebars
- category sections

## 4. View System

El storefront se arma por composicion de componentes en areas.

Cada componente puede declarar:

- `areaId`: en que zona se monta.
- `sortOrder`: en que orden aparece dentro de esa zona.

Consecuencia practica:

- Si un componente esta bien escrito pero usa una convencion incorrecta para la pagina o no entra al arbol de vista esperado, no aparece.
- Un problema comun no es React sino registro incorrecto en el sistema de vistas.

## 5. Extensions

Una extension es la forma correcta de extender EverShop sin tocar el core.

Debe usarse para:

- agregar rutas nuevas
- agregar APIs
- extender GraphQL
- personalizar pantallas del admin
- agregar jobs, subscribers o bootstrap
- preparar integraciones o importadores

No conviene usar una extension para rehacer todo el storefront si eso es puramente visual. Para eso va el theme.

## 6. Widgets

Los widgets son la forma correcta de volver editable el contenido del storefront desde admin.

Sirven para:

- hero banners
- carruseles
- menus configurables
- bloques de texto
- grids de productos o colecciones
- promociones editoriales

Regla recomendada:

- estructura visual base en `theme`
- contenido comercial cambiante en `widgets`

Asi el cliente puede editar home y landings sin tocar codigo.

## 7. Traducciones

La traduccion oficial se hace con:

- `shop.language` en config
- carpeta `translations/<lang>/`
- archivos CSV

Los CSV usan dos columnas:

- texto original
- texto traducido

Esto sirve especialmente para storefront y para cualquier texto custom que pase por el sistema de traduccion.

No basta con cambiar `shop.language` para tener todo el admin en espanol. Si el admin usa componentes custom o textos hardcodeados, hay que personalizarlos tambien.

## 8. Flujo Correcto De Desarrollo

### Storefront

1. Definir navegacion, taxonomia y areas.
2. Implementar layout y experiencia base en `theme`.
3. Mover contenido cambiante a `widgets`.
4. Traducir textos compartidos con `translations`.

### Admin

1. Mantener la operacion base de EverShop.
2. Agregar ayuda operativa o personalizaciones puntuales via `extension`.
3. Traducir lo traducible con `translations`.
4. Evitar rehacer todo el admin salvo que el proyecto lo justifique.

### Catalogo

1. Categorias para navegacion y URL.
2. Atributos para filtros y metadatos.
3. Variantes para color/talla.
4. Colecciones para campanas y curaduria.
5. CMS para contenido informativo.

## 9. Compilacion

En este proyecto hay tres niveles relevantes:

- `src`: codigo fuente editable.
- `dist`: codigo compilado del theme o extension.
- `.evershop/build`: build final que consume la app.

Flujo practico:

1. editar `src`
2. compilar theme o extension a `dist`
3. correr `evershop build`
4. correr `evershop start`

Si `src` cambia pero `dist` no se regenera, produccion seguira mostrando codigo viejo.

## 10. Reglas Para Proyectos De Cliente

- Nunca tocar el core de `node_modules/@evershop/evershop` como solucion permanente.
- Mantener una sola fuente de verdad para navegacion y catalogo.
- No meter contenido comercial duro en componentes si luego debe editarlo negocio.
- Separar claramente lo que es:
  - visual
  - editable por admin
  - logica de negocio
  - integracion futura

## 11. Arquitectura Recomendada Para Un Ecommerce Multimarca

### En `theme`

- header
- footer
- home base
- categoria/PLP
- PDP
- carrito y checkout visualmente alineados

### En `widgets`

- hero
- carrusel principal
- marcas destacadas
- banners de temporada
- bloques editoriales
- grids de colecciones

### En `extension`

- ayudas del admin
- rutas custom
- importadores
- integraciones con fuentes externas
- ajustes operativos
- personalizacion puntual del admin

### En `translations`

- textos comunes del storefront
- traducciones de componentes custom

## 12. Error Clasico Que Esta Guia Ayuda A Evitar

Uno de los errores mas comunes es asumir que “si el archivo compila, EverShop ya lo usa”.

No siempre.

En EverShop importa tambien:

- la estructura correcta
- la convencion de pagina
- la pagina a la que pertenece
- el area en que se monta
- que exista `dist`
- que el build final incluya ese componente

Por eso conviene validar siempre:

1. que el archivo esta en la carpeta correcta
2. que su layout apunta al area correcta
3. que el `dist` se regenero
4. que `.evershop/build` lo incluyo realmente

## 13. Resumen Ejecutivo

Para vender desarrollo sobre EverShop a un cliente, la propuesta debe plantearse asi:

- EverShop ya resuelve catalogo, variantes, admin, checkout y CMS base.
- El valor del desarrollo esta en:
  - theme premium
  - arquitectura de widgets
  - operacion del admin
  - taxonomia del catalogo
  - integraciones futuras

La implementacion correcta no es rehacer la plataforma, sino extenderla en las capas correctas.
