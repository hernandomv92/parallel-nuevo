import { Button } from '@evershop/evershop/components/common/ui/Button';
import { useCheckout, useCheckoutDispatch } from '../../../../../../node_modules/@evershop/evershop/dist/components/frontStore/checkout/CheckoutContext.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
function BoldLogo() {
    return (React.createElement("span", { className: "inline-flex items-center rounded-full bg-[#ff6b00] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white" }, "Bold"));
}
export default function BoldRedirectMethod({ boldRedirectUrl, setting: { boldDisplayName } }) {
    const { orderPlaced, orderId, checkoutData: { paymentMethod } } = useCheckout();
    const { registerPaymentComponent } = useCheckoutDispatch();
    useEffect(() => {
        if (orderPlaced && orderId && paymentMethod === 'bold_redirect') {
            window.location.href = `${boldRedirectUrl}?order_id=${encodeURIComponent(orderId)}`;
        }
    }, [boldRedirectUrl, orderPlaced, orderId, paymentMethod]);
    useEffect(() => {
        registerPaymentComponent('bold_redirect', {
            nameRenderer: () => (React.createElement("div", { className: "flex w-full items-center justify-between" },
                React.createElement("span", null, boldDisplayName),
                React.createElement(BoldLogo, null))),
            formRenderer: () => (React.createElement("div", { className: "flex justify-center text-muted-foreground" },
                React.createElement("div", { className: "w-2/3 py-3 text-center" }, _('Serás redirigido a Bold para completar el pago de forma segura.')))),
            checkoutButtonRenderer: () => {
                const { checkout } = useCheckoutDispatch();
                const { loadingStates, orderPlaced } = useCheckout();
                const handleClick = async (e) => {
                    e.preventDefault();
                    try {
                        await checkout();
                    }
                    catch (error) {
                        toast.error(_('No se pudo preparar la orden para Bold.'));
                    }
                };
                const isDisabled = loadingStates.placingOrder || orderPlaced;
                return (React.createElement(Button, { variant: "default", size: "xl", type: "button", onClick: handleClick, disabled: isDisabled, className: "w-full bg-[#ff6b00] text-white transition-colors duration-200 hover:bg-[#e45f00] disabled:cursor-not-allowed disabled:bg-[#ff6b00]" }, loadingStates.placingOrder
                    ? _('Preparando pago en Bold...')
                    : orderPlaced
                        ? _('Redirigiendo a Bold...')
                        : _('Continuar a Bold')));
            }
        });
    }, [boldDisplayName, registerPaymentComponent]);
    return null;
}
export const layout = {
    areaId: 'checkoutForm',
    sortOrder: 12
};
export const query = `
  query Query {
    setting {
      boldDisplayName
    }
    boldRedirectUrl: url(routeId: "boldRedirect")
  }
`;
//# sourceMappingURL=BoldRedirect.js.map