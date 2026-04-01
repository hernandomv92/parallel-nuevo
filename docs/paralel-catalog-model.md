# Modelo De Catalogo Para Paralel Store

## Objetivo

Estructurar el catalogo para una tienda multimarca con navegacion por genero y capacidad de crecer hacia importaciones futuras.

## Estructura base

### Categorias raiz

- Hombre
- Mujer
- Ninos
- Deportes

### Atributos operativos

- marca
- genero
- deporte
- color
- talla
- coleccion
- material
- estado_promocion

### Uso correcto

- Usa categorias para la navegacion principal y URLs indexables.
- Usa atributos para filtros y consistencia de datos.
- Usa variantes para color y talla solo cuando el cliente realmente deba seleccionar una combinacion.
- Usa colecciones para campañas, marcas destacadas y selecciones.

## Preparacion para importacion futura

Toda fuente externa deberia mapear al menos estos campos:

- source_brand
- source_name
- source_sku
- source_category
- source_gender
- source_sport
- source_color
- source_size
- source_price
- source_images

Luego se normaliza a:

- `marca`
- `genero`
- `deporte`
- `color`
- `talla`
- `price.regular`
- `price.special`
- `category`
- `gallery`
