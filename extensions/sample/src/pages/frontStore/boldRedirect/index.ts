import { select } from '@evershop/postgres-query-builder';
import { pool } from '@evershop/evershop/lib/postgres';
import { buildUrl } from '@evershop/evershop/lib/router';
import { getContextValue, setContextValue } from '@evershop/evershop/graphql/services';
import { getSetting } from '@evershop/evershop/setting/services';
import { createBoldIntegritySignature, formatBoldAmount } from '../../../lib/bold.js';

export default async function boldRedirectIndex(
  request,
  response,
  next
) {
  const orderId = String(request.query.order_id || '');

  if (!orderId) {
    response.redirect(302, buildUrl('checkout'));
    return;
  }

  const order = await select()
    .from('order')
    .where('uuid', '=', orderId)
    .and('payment_method', '=', 'bold_redirect')
    .and('payment_status', '=', 'pending')
    .and('sid', '=', request.sessionID || '')
    .load(pool);

  if (!order) {
    response.redirect(302, buildUrl('checkout'));
    return;
  }

  const [billingAddress, apiKey, integrityKey, displayName, buttonStyle] =
    await Promise.all([
      order.billing_address_id
        ? select()
            .from('order_address')
            .where('order_address_id', '=', order.billing_address_id)
            .load(pool)
        : null,
      getSetting('boldApiKey', ''),
      getSetting('boldSecretKey', ''),
      getSetting('boldDisplayName', 'Bold'),
      getSetting('boldButtonStyle', 'dark-L')
    ]);

  const missingConfiguration: string[] = [];

  if (!apiKey) {
    missingConfiguration.push('Llave publica de Bold');
  }

  if (!integrityKey) {
    missingConfiguration.push('Llave de integridad de Bold');
  }

  const amount = formatBoldAmount(order.grand_total);
  const currency = order.currency || 'COP';
  let homeUrl = getContextValue(request, 'homeUrl', '') as string;

  // Bold docs: redirection-url MUST start with https:// — always.
  // Also replace 127.0.0.1 with localhost (Bold rejects 127.0.0.1).
  if (homeUrl) {
    homeUrl = homeUrl.replace('://127.0.0.1', '://localhost');
    if (homeUrl.startsWith('http://')) {
      homeUrl = homeUrl.replace('http://', 'https://');
    }
  }

  const redirectionUrl = `${homeUrl}${buildUrl('boldResult')}`;

  const customerData = JSON.stringify({
    email: order.customer_email || '',
    fullName: order.customer_full_name || '',
    phone: billingAddress?.telephone || '',
    dialCode: '+57'
  });

  const billingData = billingAddress
    ? JSON.stringify({
        address: billingAddress.address_1 || '',
        zipCode: billingAddress.postcode || '',
        city: billingAddress.city || '',
        state: billingAddress.province || '',
        country: billingAddress.country || 'CO'
      })
    : '';

  const integritySignature =
    missingConfiguration.length === 0
      ? createBoldIntegritySignature({
          orderId: order.uuid,
          amount,
          currency,
          integrityKey
        })
      : '';

  setContextValue(request, 'boldOrderId', order.uuid);
  setContextValue(request, 'boldApiKey', apiKey);
  setContextValue(request, 'boldAmount', amount);
  setContextValue(request, 'boldCurrency', currency);
  setContextValue(request, 'boldIntegritySignature', integritySignature);
  setContextValue(request, 'boldRedirectionUrl', redirectionUrl);
  setContextValue(request, 'boldDescription', `${displayName} - Orden #${order.order_number}`);
  setContextValue(request, 'boldButtonStyle', buttonStyle);
  setContextValue(request, 'boldCustomerData', customerData);
  setContextValue(request, 'boldBillingAddress', billingData);
  setContextValue(
    request,
    'boldMissingConfiguration',
    JSON.stringify(missingConfiguration)
  );
  setContextValue(
    request,
    'boldPayload',
    JSON.stringify({
      orderId: order.uuid,
      orderNumber: order.order_number,
      currency,
      amount,
      amountText: '',
      apiKey,
      integritySignature,
      redirectionUrl,
      description: `${displayName} - Orden #${order.order_number}`,
      buttonStyle,
      customerData,
      billingAddress: billingData || undefined,
      missingConfiguration
    })
  );
  next();
}
