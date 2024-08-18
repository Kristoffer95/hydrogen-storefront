import {Await, useRouteLoaderData} from '@remix-run/react';
import {Suspense} from 'react';
import type {FeaturedProducts, HeroSection, Images} from 'sanity/types';
import type {RootLoader} from '~/root';
import ProductCards from '../ProductCards';

export default ({value}: {value: FeaturedProducts}) => {
  const data = useRouteLoaderData<RootLoader>('root');

  return (
    <div className="featured-products">
      <h3>From featured products query</h3>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <Suspense>
        <Await resolve={data?.featuredProducts}>
          {(featuredProduct) => (
            <div className="border">
              <ProductCards featuredProducts={featuredProduct} />
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};
