# Modelo Operativo Del Catalogo

## Objetivo

Dejar clara la fuente de verdad del catalogo dentro de EverShop para que el equipo cargue productos, filtros y contenido sin rehacer la estructura despues.

## Navegacion raiz

- `hombre`
- `mujer`
- `ninos`
- `deportes`

Estas categorias mandan la navegacion principal y las URLs de entrada del storefront.

## Atributos base

- `brand`
- `gender`
- `sport`
- `color`
- `size`
- `material`
- `promo_state`

Regla:

- categoria resuelve navegacion
- atributo resuelve filtro, metadato y consistencia operativa
- color y talla deben quedar listos para variantes reales

## Colecciones base

- `nike`
- `jordan`
- `running`
- `nuevos-ingresos`
- `street-rotation`

Estas colecciones sirven para bloques editoriales, home, widgets y narrativas de marca sin tocar la taxonomia principal.

## Paginas CMS base

- `/envios`
- `/cambios-y-devoluciones`
- `/guia-de-tallas`
- `/faq`
- `/terminos-y-condiciones`
- `/privacidad`

La pagina `/contacto` vive hoy como ruta custom en la extension, no como CMS.

## Flujo recomendado de carga

1. Crear o confirmar categoria correcta.
2. Asignar atributos base del producto.
3. Cargar imagen principal y galeria.
4. Confirmar precio, stock y slug.
5. Vincular a colecciones si el producto participa en home o narrativa editorial.
6. Revisar que la ficha y la categoria se vean bien en storefront.

## Bootstrap reproducible

La base operativa se puede volver a sembrar con:

```bash
node scripts/bootstrap-paralel-admin.mjs
```

Ese script asegura:

- atributos y opciones base
- colecciones iniciales
- paginas CMS iniciales
- asignaciones de coleccion para los productos demo cargados
