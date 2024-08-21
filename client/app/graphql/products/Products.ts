// fragments
export const PRODUCT_FRAGMENT = `#graphql
  fragment ProductFields on Product {
    id
    handle
    createdAt
    description(truncateAt: 60)
    title
    seo {
      title
      description
    }
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
        }
      }
    }
    featuredImage {
      url
    }
  }
` as const;

// queries

// export const PRODUCTS_QUERY = `#graphql
//   ${PRODUCT_FRAGMENT}
//   query products {
//     products(first: 10) {
//       edges {
//         node {
//           ...ProductFields
//         }
//       }
//     }
//   }
// ` as const;

export const FEATURED_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query collections {
    collection(id: "gid://shopify/Collection/422532579560") {
      description(truncateAt: 10)
      id
      handle
      title
      trackingParameters
      updatedAt
      products(first: 10) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  }
` as const;
