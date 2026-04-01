# Plan De Implementacion Por Secciones

## Objetivo

Convertir `ParalelStore` en un catalogo digital administrable, construido sobre EverShop, implementando el sitio por secciones y validando cada etapa antes de abrir la siguiente.

Este plan parte de dos realidades del proyecto:

- la arquitectura base ya esta bien orientada entre `theme`, `extension`, `widgets`, `translations` y `config`
- el storefront todavia no esta estable porque la `homepage` nueva no se esta montando correctamente

La regla de trabajo sera esta:

1. estabilizar primero
2. implementar una seccion a la vez
3. validar resultado visual, tecnico y operativo
4. solo despues abrir la siguiente etapa

## Principios Del Plan

- `theme` resuelve la experiencia visual base
- `extension` resuelve operacion, ayudas del admin e integraciones futuras
- `widgets` resuelven contenido editable por negocio
- `translations` resuelven textos reutilizables
- no avanzar a nuevas secciones si la anterior no quedo navegable, compilada y entendible para operacion

## Orden Maestro De Implementacion

1. Base tecnica y estabilidad del storefront
2. Shell global del sitio
3. Home comercial
4. Catalogo de categorias y PLP
5. PDP o ficha de producto
6. Capa de contacto y conversion ligera
7. Admin y modelo real de catalogo
8. Widgets y contenido editable
9. Limpieza tecnica y salida a produccion

---

## Fase 0. Base Tecnica Y Estabilidad

### Objetivo

Recuperar una base estable para poder evaluar cualquier avance visual o funcional sin ruido tecnico.

### Alcance

- corregir el registro/render de `homepage`
- confirmar flujo correcto `src -> dist -> .evershop/build`
- eliminar o aislar demos heredadas que puedan confundir el proyecto
- dejar claro que vive en `theme` y que vive en `extension`

### Piezas involucradas

- `themes/sample/src/pages/homepage/`
- `themes/sample/dist/`
- `extensions/sample/src/`
- `.evershop/build/`

### Entregable esperado

- la home vuelve a renderizar contenido real
- el storefront deja de salir en blanco
- el proyecto puede compilar y levantarse sin piezas demo que generen ambiguedad

### Validacion antes de avanzar

- la ruta principal carga HTML y contenido visible
- los componentes de home aparecen en el area correcta
- un cambio pequeno en `src` se refleja en `dist` y luego en el build final
- se identifico que demos heredadas quedan fuera de la fase comercial

### No avanzar si

- la home sigue vacia
- el sistema sigue dependiendo de prueba y error sobre convenciones de EverShop
- no esta claro si un fallo es del `theme`, la `extension` o el build

---

## Fase 1. Shell Global Del Sitio

### Objetivo

Definir la estructura comun del storefront para que todas las paginas compartan identidad, navegacion y consistencia.

### Alcance

- top bar
- logo
- menu principal
- buscador
- iconos de cuenta y mini cart
- footer principal
- footer inferior

### Piezas EverShop

- `themes/sample/src/pages/all/TopBar.tsx`
- `themes/sample/src/pages/all/Logo.tsx`
- `themes/sample/src/pages/all/Menu.tsx`
- `themes/sample/src/pages/all/SearchBox.tsx`
- `themes/sample/src/pages/all/CustomerIcon.tsx`
- `themes/sample/src/pages/all/MiniCartIcon.tsx`
- `themes/sample/src/pages/all/Footer.tsx`
- `themes/sample/src/pages/all/FooterBottom.tsx`

### Entregable esperado

- encabezado claro para catalogo multimarca
- navegacion principal alineada con la taxonomia real del negocio
- footer con informacion comercial basica, contacto y confianza

### Validacion antes de avanzar

- header y footer aparecen en todas las vistas relevantes
- el menu refleja categorias reales o una estructura provisional aprobada
- el buscador y los iconos no rompen layout en movil y desktop
- existe coherencia visual entre home, categoria y producto

### No avanzar si

- todavia no existe estructura global estable
- el menu fue montado sin relacion con el catalogo real
- el layout responsive del header no esta resuelto

---

## Fase 2. Home Comercial

### Objetivo

Construir una home que venda confianza, ordene la oferta y dirija al usuario hacia categorias, marcas o colecciones destacadas.

### Alcance inicial

- hero principal
- bloque de categorias destacadas
- bloque editorial o promocional
- carrusel o grid de productos/colecciones destacadas
- bloque de marcas o beneficios
- CTA de contacto

### Piezas EverShop

- `themes/sample/src/pages/homepage/OnlyHomePage.tsx`
- futura migracion parcial a `widgets`

### Entregable esperado

- una home funcional, clara y creible
- enfoque de catalogo administrable, no de ecommerce complejo
- base visual lista para luego volver editables algunos bloques

### Validacion antes de avanzar

- la home comunica que negocio es, que vende y a donde navegar
- el primer scroll ya muestra categorias o caminos comerciales utiles
- el CTA de contacto existe y es visible
- la pagina se siente completa aunque aun no todo sea editable desde admin

### No avanzar si

- la home solo es bonita pero no orienta navegacion
- todo el contenido esta duro sin distinguir que luego debe migrar a widgets
- no hay relacion clara entre home y estructura de categorias

---

## Fase 3. Catalogo De Categorias Y PLP

### Objetivo

Hacer navegable el catalogo y permitir que el usuario encuentre tenis por categoria, uso o atributos relevantes.

### Alcance

- vista de categoria
- grid de productos
- filtros iniciales prioritarios
- ordenamiento si aporta valor
- estados vacios y mensajes utiles

### Piezas EverShop

- `themes/sample/src/pages/categoryView/CategoryView.tsx`
- categorias, atributos y colecciones del admin

### Entregable esperado

- una PLP clara, rapida y facil de recorrer
- filtros alineados al modelo real del catalogo
- relacion correcta entre categorias visibles y productos cargados

### Validacion antes de avanzar

- las categorias principales ya existen en el admin
- los productos aparecen en la categoria correcta
- los filtros elegidos responden a necesidades reales del negocio
- la URL y breadcrumbs tienen sentido comercial

### No avanzar si

- aun no existe taxonomia minima aprobada
- se intenta diseñar filtros sin definir atributos reales
- la PLP se construye sobre datos inventados que luego cambiaran por completo

---

## Fase 4. PDP O Ficha De Producto

### Objetivo

Mostrar cada producto con suficiente claridad para facilitar consulta, comparacion y contacto.

### Alcance

- galeria de imagenes
- nombre, marca, referencia y precio si aplica
- variantes de color y talla
- descripcion y detalles tecnicos
- CTA principal de contacto o compra segun fase

### Piezas EverShop

- `themes/sample/src/pages/productView/ProductView.tsx`
- `themes/sample/src/pages/productView/Gallery.tsx`
- `themes/sample/src/pages/productView/Info.tsx`
- `themes/sample/src/pages/productView/Form.tsx`
- `themes/sample/src/pages/productView/Description.tsx`

### Entregable esperado

- una ficha premium pero simple de operar
- variantes visibles y entendibles
- contenido consistente para catalogo de tenis

### Validacion antes de avanzar

- las variantes funcionan con datos reales
- el usuario entiende disponibilidad comercial aunque no haya flujo complejo
- el CTA dirige a la accion correcta: contacto, consulta o compra
- la descripcion tiene estructura reutilizable para carga operativa

### No avanzar si

- las variantes no estan bien modeladas en el catalogo
- la ficha depende de contenido inconsistente de producto a producto
- no esta definida la accion comercial principal del sitio

---

## Fase 5. Capa De Contacto Y Conversion Ligera

### Objetivo

Cerrar el flujo comercial minimo para que el sitio no sea solo exhibicion pasiva.

### Alcance

- CTA a WhatsApp
- formularios simples si hacen falta
- mensajes de confianza
- puntos de contacto en home, PLP, PDP y footer

### Piezas EverShop

- componentes de `theme`
- posibles ajustes menores en `extension` si se necesita logica puntual

### Entregable esperado

- rutas claras para que el cliente consulte o compre
- experiencia alineada al enfoque de catalogo administrable

### Validacion antes de avanzar

- existe al menos un CTA principal y uno secundario bien ubicados
- el negocio confirma como quiere recibir leads
- movil y desktop permiten contacto sin friccion

### No avanzar si

- el sitio aun no tiene propuesta comercial clara
- no esta definido si el objetivo es contacto, pedido manual o compra directa

---

## Fase 6. Admin Y Modelo Real De Catalogo

### Objetivo

Asegurar que el sitio pueda ser operado por el negocio sin depender del desarrollador para cambios cotidianos.

### Alcance

- categorias reales
- atributos reales
- variantes color/talla
- colecciones
- estructura de carga de producto
- ayudas operativas en admin

### Piezas EverShop

- `extensions/sample/src/pages/admin/...`
- `docs/paralel-catalog-model.md`
- `docs/paralel-admin-guide.md`

### Entregable esperado

- modelo de catalogo claro y repetible
- flujo de carga entendible para quien opere la tienda
- admin con ayudas realmente utiles

### Validacion antes de avanzar

- existe estructura minima aprobada de categorias
- existe politica minima de naming y carga de producto
- un operador puede crear un producto completo sin depender de memoria informal
- las ayudas del admin responden a tareas reales y no a demos

### No avanzar si

- no hay modelo real de catalogo
- se siguen cargando productos de forma inconsistente
- el admin custom no aporta a la operacion real

---

## Fase 7. Widgets Y Contenido Editable

### Objetivo

Mover contenido comercial cambiante fuera del codigo para que el negocio pueda editarlo desde admin.

### Alcance

- hero editable
- banners de temporada
- bloques editoriales
- colecciones destacadas
- menus o promos si cambia con frecuencia

### Piezas EverShop

- `widgets`
- bloques del `theme` preparados para contenido configurable

### Entregable esperado

- home y landings menos dependientes de hardcode
- separacion real entre estructura visual y contenido comercial

### Validacion antes de avanzar

- esta claro que bloques cambian seguido y cuales no
- el negocio puede editar al menos los bloques comerciales principales
- el `theme` sigue controlando la experiencia sin perder consistencia

### No avanzar si

- todavia no esta estable la version hardcoded de la home
- se intenta volver editable algo que aun no esta bien diseñado

---

## Fase 8. Limpieza Tecnica Y Preparacion De Produccion

### Objetivo

Dejar una base mantenible, limpia y lista para presentar, vender y evolucionar.

### Alcance

- retirar demos heredadas de extension
- revisar traducciones
- limpiar piezas vacias o confusas
- revisar compilacion final
- preparar checklist de salida

### Piezas EverShop

- `extensions/sample/src/pages/frontStore/...`
- `extensions/sample/src/api/createFoo/...`
- `extensions/sample/src/graphql/types/Foo/...`
- `extensions/sample/src/subscribers/...`
- `translations/es/storefront.csv`

### Entregable esperado

- proyecto coherente para cliente
- sin ruido tecnico heredado del sample
- con base clara para futuras integraciones o importadores

### Validacion antes de cerrar

- no quedan demos que parezcan funcionalidad real
- las traducciones visibles del storefront estan controladas
- existe una narrativa clara del producto para presentar al cliente
- el build final corre con la estructura limpia

### No cerrar si

- el proyecto aun mezcla demo, experimento y negocio
- la documentacion no refleja el sistema real que queda funcionando

---

## Matriz De Revision Por Seccion

Cada fase debe revisarse con estas cuatro preguntas:

1. Funciona tecnicamente en EverShop segun su convencion real.
2. Se ve bien y responde al objetivo comercial de la seccion.
3. Puede operarse o mantenerse sin generar deuda innecesaria.
4. Ya esta lista para congelarse y no reabrirse de inmediato.

Si una fase falla en alguna de esas preguntas, no se deberia abrir la siguiente.

## Recomendacion De Ejecucion Real

Para este proyecto, el orden mas sano de trabajo inmediato es:

1. resolver Fase 0
2. cerrar Fase 1
3. construir una primera Home funcional de Fase 2
4. modelar simultaneamente la base del catalogo para habilitar Fase 3 y Fase 4
5. solo despues mover bloques a widgets

## Siguiente Paso Recomendado

El siguiente frente concreto no es diseñar todo a la vez.

El siguiente frente correcto es:

1. diagnosticar y corregir la `homepage`
2. confirmar la convencion exacta que EverShop espera para esa vista
3. dejar visible una primera home funcional
4. a partir de ahi iterar seccion por seccion
