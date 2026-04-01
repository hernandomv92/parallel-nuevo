import React from 'react';
interface BoldPaymentProps {
    setting: {
        boldPaymentStatus: true | false | 0 | 1;
        boldDisplayName: string;
        boldApiKey: string;
        boldSecretKey: string;
        boldButtonStyle: string;
    };
}
export default function BoldPayment({ setting: { boldPaymentStatus, boldDisplayName, boldApiKey, boldSecretKey, boldButtonStyle } }: BoldPaymentProps): React.JSX.Element;
export declare const layout: {
    areaId: string;
    sortOrder: number;
};
export declare const query = "\n  query Query {\n    setting {\n      boldPaymentStatus\n      boldDisplayName\n      boldApiKey\n      boldSecretKey\n      boldButtonStyle\n    }\n  }\n";
export {};
