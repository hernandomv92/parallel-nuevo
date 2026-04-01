import React from 'react';
interface BoldRedirectPageProps {
    order: {
        orderNumber: string;
        grandTotal: {
            text: string;
        };
    };
}
export default function BoldRedirectPage({ order }: BoldRedirectPageProps): React.JSX.Element;
export declare const layout: {
    areaId: string;
    sortOrder: number;
};
export declare const query = "\n  query Query {\n    order(uuid: getContextValue(\"boldOrderId\")) {\n      orderNumber\n      grandTotal {\n        text\n      }\n    }\n  }\n";
export {};
