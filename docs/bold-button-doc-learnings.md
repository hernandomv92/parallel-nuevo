# Bold — aprendizajes de documentación para configurar el botón de pagos

## Fuentes consultadas
- Bold manual integration:
  - https://developers.bold.co/pagos-en-linea/boton-de-pagos/integracion-manual/integracion-manual#1-integra-el-bot%C3%B3n-en-tu-sitio-web
- EverShop payment method docs:
  - https://evershop.io/docs/api/payment-method
- EverShop `registerPaymentMethod` docs:
  - https://evershop.io/docs/development/module/functions/registerpaymentmethod

## Qué pide Bold para la integración manual
Bold espera un script del botón con atributos `data-*` que incluyan, como mínimo:
- `data-bold-button`
- `data-api-key`
- `data-order-id`
- `data-currency`
- `data-amount`
- `data-integrity-signature`
- `data-redirection-url`

También pueden incluirse:
- `data-description`
- `data-customer-data`
- `data-billing-address`

## Qué significan las llaves
### Llave pública / identidad
Se usa como:
- `data-api-key`

### Llave de integridad / secreta
Se usa para construir la firma:
- `data-integrity-signature`

## Regla importante
Las llaves deben ser del **mismo ambiente**:
- prueba con prueba
- producción con producción

No mezclar:
- pública test + secreta live
- pública live + secreta test

---

## Qué aprendimos sobre el monto y la firma
La firma de integridad depende de:
- `orderId`
- `amount`
- `currency`
- `integrityKey`

### Importante
El monto debe respetar exactamente el formato que Bold espera.
En esta integración se normalizó el amount como string entero, por ejemplo:
- `273000`

No usar formato monetario visual tipo:
- `273.000,00`

Ese formato es solo para mostrar en UI, no para la firma.

---

## Qué aprendimos sobre React
La documentación de Bold marca cuidado especial cuando el botón se monta en React.
No alcanza con solo “tener el script en el proyecto”: hay que verificar que:
1. el contenedor exista en DOM
2. el script del botón se inserte cuando el payload ya está listo
3. la librería de Bold se cargue en el momento correcto
4. el DOM realmente cambie después de montar el script

## Traducción práctica
Si el script queda en estado `idle` o no renderiza nada, el problema puede estar en:
- momento de inyección
- orden de montaje
- payload inválido
- rechazo silencioso de Bold

---

## Qué aprendimos sobre localhost
Bold menciona `localhost` en su documentación de pruebas, así que **localhost no se puede descartar automáticamente** como causa.

Pero eso NO significa que cualquier cosa en localhost vaya a funcionar.
Hay que revisar también:
- `redirection-url`
- firma
- llaves correctas
- render del script

## Conclusión prudente
`localhost` no parece ser la primera causa a culpar, pero sigue siendo una variable a validar si todo lo demás está correcto y el script no monta.

---

## Qué aprendimos sobre `redirection-url`
El flujo necesita una URL de retorno válida para cuando Bold termine su proceso.
En este proyecto se está usando:
- `/checkout/pago-bold/resultado`

Y se construye con base en el host actual.

## Punto a revisar
Hay que confirmar si Bold acepta esa URL tal como se está enviando en local y si necesita condiciones adicionales en pruebas.

---

## Qué aprendimos de EverShop para payment methods
### `registerPaymentMethod`
Sirve para registrar el método de pago custom y hacerlo aparecer en checkout si pasa su `validator`.

### Eso NO resuelve por sí solo:
- el pago externo
- la firma de Bold
- el render del botón oficial
- la página intermedia

## Traducción práctica
En EverShop hay dos capas distintas:
1. **disponibilidad del método en checkout**
2. **flujo real del proveedor de pago**

Bold hoy ya está en la capa 1.
El problema restante está en la capa 2.

---

## Checklist correcto para configurar Bold
### En admin
- activar Bold
- cargar llave pública
- cargar llave de integridad
- definir nombre visible
- definir estilo del botón

### En checkout
- tener shipping method disponible
- cerrar checkout con `payment_method = bold_redirect`

### En página intermedia
- pedir payload interno
- construir script Bold con atributos válidos
- montar la librería de Bold
- verificar que el botón aparezca realmente

---

## Señales de que algo anda mal
### Si la página queda en `idle`
Probablemente:
- no llegó payload al frontend
- o el script nunca se inyectó correctamente

### Si hay payload pero no aparece botón
Probablemente:
- script de Bold no montó
- payload contiene dato rechazado
- React/DOM está montándolo fuera de secuencia

### Si aparece error de firma o atributos
Probablemente:
- llaves mezcladas
- amount mal formateado
- `order-id` o `redirection-url` no válidos

---

## Conclusión útil para la siguiente investigación
La próxima revisión no debería empezar de cero.
Debería validar, en este orden:
1. si el browser recibe payload correcto
2. si ese payload coincide con el generado en backend
3. si el script de Bold se monta realmente en DOM
4. si Bold rechaza algún `data-*` específico
5. si `localhost` o la `redirection-url` final condicionan el render
