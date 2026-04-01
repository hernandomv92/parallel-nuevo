interface BoldRedirectMethodProps {
    boldRedirectUrl: string;
    setting: {
        boldDisplayName: string;
    };
}
export default function BoldRedirectMethod({ boldRedirectUrl, setting: { boldDisplayName } }: BoldRedirectMethodProps): null;
export declare const layout: {
    areaId: string;
    sortOrder: number;
};
export declare const query = "\n  query Query {\n    setting {\n      boldDisplayName\n    }\n    boldRedirectUrl: url(routeId: \"boldRedirect\")\n  }\n";
export {};
