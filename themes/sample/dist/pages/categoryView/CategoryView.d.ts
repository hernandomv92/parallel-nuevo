import React from 'react';
export default function CategoryView({ category }: {
    category: any;
}): React.JSX.Element;
export declare const layout: {
    areaId: string;
    sortOrder: number;
};
export declare const query = "\n  query Query {\n    category: currentCategory {\n      showProducts\n      name\n      uuid\n      description\n      image {\n        alt\n        url\n      }\n      products {\n        items {\n          ...Product\n        }\n        currentFilters {\n          key\n          operation\n          value\n        }\n        total\n      }\n      availableAttributes {\n        attributeCode\n        attributeName\n        options {\n          optionId\n          optionText\n        }\n      }\n      priceRange {\n        min\n        max\n        minText\n        maxText\n      }\n      children {\n        categoryId\n        name\n        uuid\n        url\n      }\n    }\n  }\n";
export declare const fragments = "\n  fragment Product on Product {\n    productId\n    name\n    sku\n    url\n    price {\n      regular {\n        value\n        text\n      }\n      special {\n        value\n        text\n      }\n    }\n    inventory {\n      isInStock\n    }\n    image {\n      alt\n      url\n    }\n    attributes: attributeIndex {\n      attributeCode\n      optionText\n    }\n    variantGroup {\n      variantAttributes {\n        attributeCode\n        attributeName\n        options {\n          optionId\n          optionText\n          productId\n        }\n      }\n    }\n  }\n";
