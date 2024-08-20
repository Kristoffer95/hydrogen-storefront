import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import {NavLink} from '@remix-run/react';
import type {
  Collection,
  ProductEdge,
  // ProductEdge,
  QueryRootCollectionsArgs,
} from '@shopify/hydrogen/storefront-api-types';

import type {
  FeaturedProductsQuery,
  ProductFieldsFragment,
} from 'storefrontapi.generated';

export default ({
  featuredProducts,
}: {
  featuredProducts: FeaturedProductsQuery['collection'];
}) => {
  return (
    <div className="container pb-10 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        pagination={{clickable: true}}
        onSlideChange={() => console.log('slide change')}
      >
        {featuredProducts &&
          featuredProducts.products.edges.map((product) => (
            <SwiperSlide key={product.node.id}>
              <ProductCard product={product.node} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export const ProductCard = ({product}: {product: ProductFieldsFragment}) => {
  return (
    <div className="group max-w-[500px]">
      <div className="relative overflow-hidden">
        <img
          className="group-hover:scale-125 transition-all duration-[350ms] delay-100 grayscale-50 group-hover:grayscale-0"
          src={product?.featuredImage?.url}
          alt={product?.title}
        />

        <NavLink
          prefetch="intent"
          to={`/products/${product.handle}`}
          end
          className="btn !px-10 absolute bottom-0 left-0 right-0 text-center"
        >
          Shop now
        </NavLink>
      </div>

      <div>
        <div className="flex justify-between py-5">
          <h3 className="text-xl font-light">{product.title}</h3>
          <p>
            {product.priceRange.minVariantPrice.currencyCode}
            {product.priceRange.minVariantPrice.amount}
          </p>
        </div>

        <p>{product.description}</p>
      </div>
    </div>
  );
};
