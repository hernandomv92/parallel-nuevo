import Area from '@components/common/Area.js';
import {
  ProductProvider
} from '@components/frontStore/catalog/ProductContext.js';
import React from 'react';

export default function ProductView({ product }: any) {
  return (
    <ProductProvider product={product}>
      <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_420px] xl:grid-cols-[minmax(0,1.25fr)_480px]">
          <Area id="productPageMiddleLeft" className="min-w-0" />
          <div className="lg:sticky lg:top-24">
            <Area id="productPageMiddleRight" className="space-y-8" />
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-200 pt-12">
          <Area id="productPageBottom" className="max-w-[1100px]" />
        </div>
      </div>
    </ProductProvider>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
query Query {
    product: currentProduct {
      productId
      name
      description
      sku
      price {
        regular {
          value
          text
        }
        special {
          value
          text
        }
      }
      inventory {
        isInStock
      }
      attributes: attributeIndex {
        attributeName
        attributeCode
        optionText
      }
      image {
        alt
        url
      }
      gallery {
        alt
        url
      }
      variantGroup {
        variantAttributes {
          attributeId
          attributeCode
          attributeName
          options {
            optionId
            optionText
            productId
          }
        }
        items {
          productId
          attributes {
            attributeCode
            optionId
          }
        }
      }
    }
}`;
