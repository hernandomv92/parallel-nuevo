# Bold — qué se hizo, qué funciona y qué no

## Objetivo
Integrar Bold como método de pago para que:
1. el cliente complete checkout en EverShop
2. se cree la orden
3. se abra una página intermedia de pago
4. ahí se monte el botón oficial de Bold
5. el cliente continúe al flujo de pago de Bold

## Archivos involucrados
### Registro del método de pago
- `extensions/sample/src/bootstrap.ts`

### UI de checkout
- `extensions/sample/src/pages/frontStore/checkout/BoldRedirect.tsx`

### Página intermedia
- `extensions/sample/src/pages/frontStore/boldRedirect/BoldRedirectPage.tsx`
- `extensions/sample/src/pages/frontStore/boldRedirect/index.ts`

### Endpoint payload
- `extensions/sample/src/api/boldButtonPayload/[bodyParser]payload.ts`
- `extensions/sample/src/api/boldButtonPayload/bodyParser[payload].ts`

### Pantalla de resultado
- `extensions/sample/src/pages/frontStore/boldResult/index.ts`

### Configuración admin
- `extensions/sample/src/pages/admin/paymentSetting/BoldPayment.tsx`

---

## Qué se hizo

### 1. Registro de Bold como payment method
Se confirmó que la extension registra Bold con `registerPaymentMethod`.

Estado:
- **Sí funciona** a nivel de disponibilidad del método.

### 2. Configuración admin para llaves y display name
Se validó que existen campos para:
- activar Bold
- nombre visible
- llave pública
- llave de integridad
- estilo del botón

Estado:
- **Parcialmente funciona**.
- Las llaves se pudieron guardar, aunque hubo confusión visual en el admin en distintas pruebas.

### 3. Destrabe de checkout con shipping manual
Se identificó que EverShop no permitía avanzar sin shipping method.
Se creó método manual para poder cerrar checkout.

Estado:
- **Sí funciona**.

### 4. Corrección de la URL del endpoint interno
Primero se estaba llamando a una ruta incorrecta. En EverShop las APIs custom bajo `src/api` viven bajo prefijo `/api`.

Se corrigió la llamada hacia:
- `/api/bold/button-payload`

Estado:
- **Sí funciona**. La ruta correcta ya no es 404.

### 5. Corrección de la cadena de middleware del endpoint
Se detectó que el endpoint tenía dependencia de `bodyParser`, pero no existía el middleware explícito en la carpeta de la API.

Se agregó:
- `extensions/sample/src/api/boldButtonPayload/bodyParser[payload].ts`

Estado:
- **Sí mejora la ejecución del endpoint**.

### 6. Corrección del lookup de la orden en el payload
El endpoint estaba filtrando por `sid = request.sessionID`, lo que bloqueaba órdenes válidas.
Se quitó ese filtro para permitir recuperar la orden real por:
- `uuid`
- `payment_method = bold_redirect`
- `payment_status = pending`

Estado:
- **Sí funciona** en la verificación directa del handler.

### 7. Fallback seguro para URL de retorno
Se detectó que `getContextValue(request, 'homeUrl')` era frágil en esta API route.
Se agregó fallback usando host/protocol del request.

Además, se reemplazó la construcción de la URL de retorno por path explícito:
- `/checkout/pago-bold/resultado`

Estado:
- **Sí funciona** en la verificación directa del handler.

### 8. Diagnóstico visual en la página intermedia
Se agregaron mensajes de estado y error en `BoldRedirectPage.tsx` para no trabajar a ciegas.

Estado:
- **Sí funciona** como herramienta de diagnóstico.

---

## Qué se verificó con evidencia

### Verificación positiva más importante
El handler del payload pudo devolver exitosamente un objeto válido con:
- `orderId`
- `orderNumber`
- `currency`
- `amount`
- `apiKey`
- `integritySignature`
- `redirectionUrl`
- `customerData`
- `billingAddress`

Eso significa que:
- la orden existe
- la configuración de Bold existe
- el payload se puede construir

---

## Qué funciona hoy
- Bold aparece como método de pago en checkout
- El checkout crea orden
- La orden llega a `/checkout/pago-bold?order_id=...`
- El endpoint interno de payload ya no está roto por routing
- El payload pudo generarse en pruebas directas
- La URL de retorno ya quedó definida

---

## Qué NO funciona hoy
### Problema principal actual
En navegador, la página de `/checkout/pago-bold` sigue mostrando:
- `Estado del script: idle`

Eso significa que el botón oficial de Bold **no se está montando/renderizando en el DOM del navegador**, aunque el flujo general ya avanzó bastante.

### En otras palabras
Hoy el cuello de botella ya no parece ser:
- ni el registro del método
- ni el shipping
- ni la creación de la orden
- ni el routing del endpoint

El cuello de botella parece estar en:
- la obtención efectiva del payload desde el browser en runtime, o
- el montaje del script oficial de Bold en React/DOM.

---

## Hipótesis técnicas pendientes
1. El browser no está recibiendo en runtime el mismo payload que sí se obtiene al invocar el handler directamente.
2. El script de Bold requiere una secuencia de montaje distinta en React.
3. Puede haber restricción adicional de Bold con `localhost` o con `redirection-url` no final.
4. Puede haber algún dato del payload que Bold rechaza silenciosamente.

---

## Qué NO hay que volver a discutir
- El selector naranja del checkout **no es el botón oficial de Bold**.
- El botón oficial debería aparecer recién en `/checkout/pago-bold`.
- EverShop sí necesita shipping para este checkout actual.
- La API custom vive bajo `/api/...`.

---

## Recomendación para quien continúe
La próxima persona/modelo debería concentrarse en:
1. verificar la respuesta real en navegador de `POST /api/bold/button-payload`
2. validar si el payload que recibe el browser coincide con el del handler probado manualmente
3. inspeccionar el DOM y el ciclo de vida de `BoldRedirectPage.tsx`
4. contrastar el montaje exacto con la guía React/manual de Bold
5. comprobar si Bold rechaza `localhost` o la URL de retorno en esta etapa
