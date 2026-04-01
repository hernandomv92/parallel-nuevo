# Paralel Extension

Esta extension ya no es un sample generico. Su responsabilidad actual es:

- ayudas operativas dentro del admin
- pagina `/contacto`
- piezas puntuales del storefront que no pertenecen al theme

## Restauracion base

1. Ejecuta `node scripts/bootstrap-paralel-admin.mjs`
2. Ejecuta `node scripts/seed-paralel-catalog.mjs` si necesitas restaurar categorias y productos demo base
3. Ejecuta `npm run build`

## Nota

- esta extension debe mantenerse libre de demos tecnicas, crons de prueba y rutas `Foo`
