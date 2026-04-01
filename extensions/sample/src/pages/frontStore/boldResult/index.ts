import { select } from '@evershop/postgres-query-builder';
import { pool } from '@evershop/evershop/lib/postgres';
import { buildUrl } from '@evershop/evershop/lib/router';
import { setContextValue } from '@evershop/evershop/graphql/services';

export default async function boldResultIndex(
  request,
  response,
  next
) {
  const orderId = String(request.query['bold-order-id'] || '');
  const txStatus = String(request.query['bold-tx-status'] || '');

  if (!orderId) {
    response.redirect(302, buildUrl('homepage'));
    return;
  }

  const order = await select()
    .from('order')
    .where('uuid', '=', orderId)
    .and('payment_method', '=', 'bold_redirect')
    .load(pool);

  if (!order) {
    response.redirect(302, buildUrl('homepage'));
    return;
  }

  setContextValue(request, 'boldOrderId', order.uuid);
  setContextValue(request, 'boldTxStatus', txStatus);
  next();
}
