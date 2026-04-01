import React from 'react';
interface SearchBoxProps {
    searchPageUrl: string;
}
export default function SearchBox({ searchPageUrl }: SearchBoxProps): React.JSX.Element;
export declare const layout: {
    areaId: string;
    sortOrder: number;
};
export declare const query = "\n  query Query {\n    searchPageUrl: url(routeId: \"catalogSearch\")\n  }\n";
export {};
