import {Await, useRouteLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import type {FeaturedProducts, HeroSection, Images} from 'sanity/types';
import type {RootLoader} from '~/root';
import ProductCards from '../ProductCards';

export default ({value}: {value: FeaturedProducts}) => {
  const data = useRouteLoaderData<RootLoader>('root');

  return (
    <div className="featured-products py-10">
      <div className="container">
        <h2>Featured Products</h2>
      </div>

      <Suspense>
        <Await resolve={data?.featuredProducts}>
          {(featuredProduct) => (
            <ProductCards featuredProducts={featuredProduct.collection} />
          )}
        </Await>
      </Suspense>
    </div>
  );
};
