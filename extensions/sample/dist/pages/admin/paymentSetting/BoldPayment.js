import { InputField } from '@evershop/evershop/components/common/form/InputField';
import { ToggleField } from '@evershop/evershop/components/common/form/ToggleField';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@evershop/evershop/components/common/ui/Card';
import React from 'react';
export default function BoldPayment({ setting: { boldPaymentStatus, boldDisplayName, boldApiKey, boldSecretKey, boldButtonStyle } }) {
    return (React.createElement(Card, null,
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, null, "Bold por redirecci\u00F3n"),
            React.createElement(CardDescription, null, "Configura el bot\u00F3n de pagos de Bold para Colombia. Esta base crea la orden en EverShop y luego redirige al comprador a la pasarela de Bold.")),
        React.createElement(CardContent, null,
            React.createElement("div", { className: "grid grid-cols-3 gap-5" },
                React.createElement("div", { className: "col-span-1 flex items-center" },
                    React.createElement("h4", null, "\u00BFActivar Bold?")),
                React.createElement("div", { className: "col-span-2 flex justify-start" },
                    React.createElement(ToggleField, { name: "boldPaymentStatus", defaultValue: boldPaymentStatus, trueValue: 1, falseValue: 0 })))),
        React.createElement(CardContent, { className: "border-t border-border pt-4" },
            React.createElement("div", { className: "grid grid-cols-3 gap-5" },
                React.createElement("div", { className: "col-span-1 flex items-center" },
                    React.createElement("h4", null, "Nombre visible")),
                React.createElement("div", { className: "col-span-2" },
                    React.createElement(InputField, { name: "boldDisplayName", placeholder: "Paga con Bold", defaultValue: boldDisplayName })))),
        React.createElement(CardContent, { className: "border-t border-border pt-4" },
            React.createElement("div", { className: "grid grid-cols-3 gap-5" },
                React.createElement("div", { className: "col-span-1" },
                    React.createElement("h4", null, "Llave p\u00FAblica"),
                    React.createElement("p", { className: "mt-2 text-sm text-muted-foreground" },
                        "Es la llave de identidad que Bold pide como ",
                        React.createElement("code", null, "api-key"),
                        ".")),
                React.createElement("div", { className: "col-span-2" },
                    React.createElement(InputField, { name: "boldApiKey", placeholder: "Llave p\u00FAblica / identidad de Bold", defaultValue: boldApiKey })))),
        React.createElement(CardContent, { className: "border-t border-border pt-4" },
            React.createElement("div", { className: "grid grid-cols-3 gap-5" },
                React.createElement("div", { className: "col-span-1" },
                    React.createElement("h4", null, "Llave de integridad"),
                    React.createElement("p", { className: "mt-2 text-sm text-muted-foreground" }, "Se usa solo en backend para generar la firma SHA-256 del bot\u00F3n.")),
                React.createElement("div", { className: "col-span-2" },
                    React.createElement(InputField, { name: "boldSecretKey", placeholder: "Llave de integridad / secreta", defaultValue: boldSecretKey })))),
        React.createElement(CardContent, { className: "border-t border-border pt-4" },
            React.createElement("div", { className: "grid grid-cols-3 gap-5" },
                React.createElement("div", { className: "col-span-1" },
                    React.createElement("h4", null, "Estilo del bot\u00F3n"),
                    React.createElement("p", { className: "mt-2 text-sm text-muted-foreground" },
                        "Usa valores como ",
                        React.createElement("code", null, "dark-L"),
                        ", ",
                        React.createElement("code", null, "dark-M"),
                        " o",
                        ' ',
                        React.createElement("code", null, "light-L"),
                        ".")),
                React.createElement("div", { className: "col-span-2" },
                    React.createElement(InputField, { name: "boldButtonStyle", placeholder: "dark-L", defaultValue: boldButtonStyle || 'dark-L' })))),
        React.createElement(CardContent, { className: "border-t border-border pt-4 text-sm leading-7 text-muted-foreground" }, "Flujo previsto: el cliente finaliza checkout, EverShop crea la orden pendiente y luego abre la p\u00E1gina de pago de Bold con monto definido. La validaci\u00F3n final del pago debe cerrarse despu\u00E9s con consulta de transacci\u00F3n y/o webhook.")));
}
export const layout = {
    areaId: 'paymentSetting',
    sortOrder: 15
};
export const query = `
  query Query {
    setting {
      boldPaymentStatus
      boldDisplayName
      boldApiKey
      boldSecretKey
      boldButtonStyle
    }
  }
`;
//# sourceMappingURL=BoldPayment.js.map