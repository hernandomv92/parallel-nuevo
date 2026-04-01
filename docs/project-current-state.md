# Estado actual del proyecto — contexto operativo

## Resumen ejecutivo
Este proyecto es una tienda basada en EverShop con un theme custom (`themes/sample`) y una extension custom (`extensions/sample`).

El storefront ya fue simplificado para verse más como tienda y menos como guía interna. El branding visible del usuario quedó en **Parallel**, mientras que algunos nombres técnicos o históricos del proyecto todavía siguen usando `paralel` en paths, docs y dominio.

## Stack y estructura relevante
- App principal: EverShop
- Theme custom: `themes/sample`
- Extension custom principal: `extensions/sample`
- Docs clave:
  - `docs/evershop-development-guide.md`
  - `docs/project-status.md`
  - `docs/homepage-widgets-map.md`

## Cómo está organizado hoy
### Theme
Renderiza la UI del storefront:
- home
- category view
- product view
- header / footer / search box

Ruta importante:
- `themes/sample/src/...`

### Extension
Contiene la lógica custom de negocio e integración:
- contacto custom
- integración Bold
- páginas intermedias de pago
- configuración admin para Bold
- API custom para payload de Bold

Ruta importante:
- `extensions/sample/src/...`

## Estado funcional general
### Lo que sí está razonablemente encaminado
- Home custom renderizando
- Widgets activos y entendidos
- Búsqueda del header corregida para usar `/search`
- Branding visible del storefront orientado a `Parallel`
- Checkout llega a crear orden y redirigir a la página intermedia de Bold

### Lo que sigue problemático
- Integración de pago con Bold todavía **no termina de renderizar el botón oficial**
- El flujo actual llega a `/checkout/pago-bold?order_id=...`, pero el script del botón queda en estado `idle`
- Hay fragilidad en la integración custom de Bold entre:
  - método de pago EverShop
  - endpoint custom de payload
  - página intermedia de render del botón

## Estado actual de Bold en una frase
**La orden sí se crea y la página intermedia sí abre, pero el botón oficial de Bold todavía no aparece ni redirige al checkout de Bold.**

## Configuración operativa actual
### Envío
Para poder avanzar en checkout hubo que crear un método de envío manual. Sin método de envío, EverShop no permite cerrar checkout.

### Pago
Bold está registrado como método de pago custom vía `registerPaymentMethod`.

## Archivos más importantes para seguir investigando
### Método de pago / bootstrap
- `extensions/sample/src/bootstrap.ts`

### Botón en checkout
- `extensions/sample/src/pages/frontStore/checkout/BoldRedirect.tsx`

### Página intermedia de pago
- `extensions/sample/src/pages/frontStore/boldRedirect/BoldRedirectPage.tsx`
- `extensions/sample/src/pages/frontStore/boldRedirect/index.ts`

### Endpoint custom del payload de Bold
- `extensions/sample/src/api/boldButtonPayload/[bodyParser]payload.ts`
- `extensions/sample/src/api/boldButtonPayload/bodyParser[payload].ts`

### Resultado de Bold
- `extensions/sample/src/pages/frontStore/boldResult/index.ts`

## Flujo actual esperado
1. Cliente completa checkout
2. EverShop crea orden con `payment_method = bold_redirect`
3. Se redirige a `/checkout/pago-bold?order_id=...`
4. La página intenta pedir el payload interno a `/api/bold/button-payload`
5. Con ese payload debería montarse el botón oficial de Bold
6. Recién ahí Bold debería abrir su flujo de pago

## Estado observable al cierre de este documento
- El payload ya no está en 404
- El endpoint ya devolvió data válida en verificación directa
- Pero en navegador el script de Bold sigue sin renderizar el botón y queda `idle`
- La siguiente investigación debería enfocarse en el render real del script de Bold en la página intermedia
