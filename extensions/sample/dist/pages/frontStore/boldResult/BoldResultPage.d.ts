import React from 'react';
interface BoldResultPageProps {
    order: {
        orderNumber: string;
        grandTotal: {
            text: string;
        };
        paymentStatus: {
            code: string;
            name: string;
        };
    };
}
export default function BoldResultPage({ order }: BoldResultPageProps): React.JSX.Element;
export declare const layout: {
    areaId: string;
    sortOrder: number;
};
export declare const query = "\n  query Query {\n    order(uuid: getContextValue(\"boldOrderId\")) {\n      orderNumber\n      grandTotal {\n        text\n      }\n      paymentStatus {\n        code\n        name\n      }\n    }\n  }\n";
export {};
