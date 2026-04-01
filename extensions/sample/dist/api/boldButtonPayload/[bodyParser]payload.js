import { select } from '@evershop/postgres-query-builder';
import { pool } from '@evershop/evershop/lib/postgres';
import { INVALID_PAYLOAD, OK } from '@evershop/evershop/lib/util/httpStatus';
import { getContextValue } from '@evershop/evershop/graphql/services';
import { getSetting } from '@evershop/evershop/setting/services';
import { createBoldIntegritySignature, formatBoldAmount } from '../../lib/bold.js';
function formatMoney(amount, currency) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency
    }).format(Number(amount || 0));
}
export default async function boldButtonPayload(request, response) {
    const { order_id: orderId } = request.body;
    if (!orderId) {
        return response.status(INVALID_PAYLOAD).json({
            error: {
                status: INVALID_PAYLOAD,
                message: 'Orden inválida para Bold.'
            }
        });
    }
    const order = await select()
        .from('order')
        .where('uuid', '=', orderId)
        .and('payment_method', '=', 'bold_redirect')
        .and('payment_status', '=', 'pending')
        .load(pool);
    if (!order) {
        return response.status(INVALID_PAYLOAD).json({
            error: {
                status: INVALID_PAYLOAD,
                message: 'La orden no existe o ya no está disponible para Bold.'
            }
        });
    }
    const [billingAddress, apiKey, integrityKey, displayName, buttonStyle] = await Promise.all([
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
    const missingConfiguration = [];
    if (!apiKey) {
        missingConfiguration.push('Llave pública de Bold');
    }
    if (!integrityKey) {
        missingConfiguration.push('Llave de integridad de Bold');
    }
    const amount = formatBoldAmount(order.grand_total);
    const currency = order.currency || 'COP';
    const contextHomeUrl = (request === null || request === void 0 ? void 0 : request.app) || (request === null || request === void 0 ? void 0 : request.locals)
        ? getContextValue(request, 'homeUrl', '')
        : '';
    const fallbackHomeUrl = request.get && request.protocol
        ? `${request.protocol}://${request.get('host')}`
        : '';
    let homeUrl = contextHomeUrl || fallbackHomeUrl;
    // Bold docs: redirection-url MUST start with https:// — always.
    // Also replace 127.0.0.1 with localhost (Bold rejects 127.0.0.1).
    if (homeUrl) {
        homeUrl = homeUrl.replace('://127.0.0.1', '://localhost');
        if (homeUrl.startsWith('http://')) {
            homeUrl = homeUrl.replace('http://', 'https://');
        }
    }
    const redirectionUrl = `${homeUrl}/checkout/pago-bold/resultado`;
    const customerData = {
        email: order.customer_email || '',
        fullName: order.customer_full_name || '',
        phone: (billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.telephone) || '',
        dialCode: '+57'
    };
    const billingData = billingAddress
        ? {
            address: billingAddress.address_1 || '',
            zipCode: billingAddress.postcode || '',
            city: billingAddress.city || '',
            state: billingAddress.province || '',
            country: billingAddress.country || 'CO'
        }
        : null;
    const integritySignature = missingConfiguration.length === 0
        ? createBoldIntegritySignature({
            orderId: order.uuid,
            amount,
            currency,
            integrityKey
        })
        : '';
    return response.status(OK).json({
        data: {
            orderId: order.uuid,
            orderNumber: order.order_number,
            currency,
            amount,
            amountText: formatMoney(order.grand_total, currency),
            apiKey,
            integritySignature,
            redirectionUrl,
            description: `${displayName} - Orden #${order.order_number}`,
            buttonStyle,
            customerData: JSON.stringify(customerData),
            billingAddress: billingData ? JSON.stringify(billingData) : undefined,
            missingConfiguration
        }
    });
}
//# sourceMappingURL=%5BbodyParser%5Dpayload.js.map