import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedProductsQuery,
  ProductFieldsFragment,
} from 'storefrontapi.generated';
import {ProductCard} from '~/components/ProductCards';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({
    // ...deferredData,
    ...criticalData,
  });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collection}] = await Promise.all([
    context.storefront.query(FEATURED_PRODUCTS_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    // featuredCollection: collections.nodes[0],
    featuredProducts: collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  // const recommendedProducts = context.storefront
  //   .query(RECOMMENDED_PRODUCTS_QUERY)
  //   .catch((error) => {
  //     // Log query errors, but don't throw them so the page can still render
  //     console.error(error);
  //     return null;
  //   });

  return null;

  // return {
  //   recommendedProducts,
  // };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home container">
      <h1>this is index page</h1>

      {/* <pre>{JSON.stringify(data.featuredProducts, null, 2)}</pre> */}

      <FeaturedProducts collection={data.featuredProducts} />

      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
    </div>
  );
}

function FeaturedProducts({
  collection,
}: {
  collection: FeaturedProductsQuery['collection'];
}) {
  return (
    <div className="featured-products">
      <h2>Featured Products</h2>

      {/* <pre>{JSON.stringify(collection?.products.edges, null, 2)}</pre> */}

      {collection?.products.edges.map((product) => (
        <ProductCard key={product.node.id} product={product.node} />
      ))}

      {/* <ProductCards products={} /> */}

      {/* <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="featured-products-grid">
              <pre>{JSON.stringify(response, null, 2)}</pre>

              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="featured-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense> */}
      <br />
    </div>
  );
}

// function FeaturedCollection({
//   collection,
// }: {
//   collection: FeaturedCollectionFragment;
// }) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

// function RecommendedProducts({
//   products,
// }: {
//   products: Promise<RecommendedProductsQuery | null>;
// }) {
//   return (
//     <div className="recommended-products">
//       <h2>Recommended Products</h2>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {(response) => (
//             <div className="recommended-products-grid">
//               {response
//                 ? response.products.nodes.map((product) => (
//                     <Link
//                       key={product.id}
//                       className="recommended-product"
//                       to={`/products/${product.handle}`}
//                     >
//                       <Image
//                         data={product.images.nodes[0]}
//                         aspectRatio="1/1"
//                         sizes="(min-width: 45em) 20vw, 50vw"
//                       />
//                       <h4>{product.title}</h4>
//                       <small>
//                         <Money data={product.priceRange.minVariantPrice} />
//                       </small>
//                     </Link>
//                   ))
//                 : null}
//             </div>
//           )}
//         </Await>
//       </Suspense>
//       <br />
//     </div>
//   );
// }

// const FEATURED_COLLECTION_QUERY = `#graphql
//   fragment FeaturedCollection on Collection {
//     id
//     title
//     image {
//       id
//       url
//       altText
//       width
//       height
//     }
//     handle
//   }
//   query FeaturedCollection($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...FeaturedCollection
//       }
//     }
//   }
// ` as const;

// const RECOMMENDED_PRODUCTS_QUERY = `#graphql
//   fragment RecommendedProduct on Product {
//     id
//     title
//     handle
//     priceRange {
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//     images(first: 1) {
//       nodes {
//         id
//         url
//         altText
//         width
//         height
//       }
//     }
//   }
//   query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
//     @inContext(country: $country, language: $language) {
//     products(first: 4, sortKey: UPDATED_AT, reverse: true) {
//       nodes {
//         ...RecommendedProduct
//       }
//     }
//   }
// ` as const;

export const PRODUCT_FRAGMENT = `#graphql
  fragment ProductFields on Product {
    id
    handle
    createdAt
    description(truncateAt: 10)
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

export const FEATURED_PRODUCTS_QUERY = `#graphql
${PRODUCT_FRAGMENT}
query FeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
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
