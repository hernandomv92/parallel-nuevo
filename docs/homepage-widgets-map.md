# Home Widgets Map

## Fecha

- 2026-03-27

## Objetivo

- dejar una parte real de la home editable desde admin sin perder la estructura visual del theme

## Areas editables activas

### `homepageFeaturedCollections`

Uso:

- bloque de productos por coleccion en la home

Widgets sembrados:

- `Home nuevos ingresos`
- `Home street rotation`

Tipo recomendado:

- `collection_products`

### `homepageEditorialLead`

Uso:

- tarjeta editorial de apoyo para narrativa comercial y CTA operativa

Widgets sembrados:

- `Home editorial lead`

Tipo recomendado:

- `text_block`

### `homepageOperationalBanner`

Uso:

- banner visual de apoyo antes de la franja final de servicio

Widgets sembrados:

- `Home operational banner`

Tipo recomendado:

- `banner`

## Restauracion

- ejecutar `node scripts/bootstrap-paralel-admin.mjs`

## Limite actual

- el hero principal, las tarjetas de genero y la estructura premium de la home siguen en codigo a proposito
- esta fase mueve solo el contenido que cambia mas seguido
