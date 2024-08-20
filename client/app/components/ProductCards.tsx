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
  QueryRootCollectionsArgs,
} from '@shopify/hydrogen/storefront-api-types';

export default ({featuredProducts}: {featuredProducts: Collection}) => {
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
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export const ProductCard = ({product}: {product: ProductEdge}) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden">
        <img
          className="group-hover:scale-125 transition-all duration-[350ms] delay-100 grayscale-50 group-hover:grayscale-0"
          src={product?.node?.featuredImage?.url}
          alt={product?.node?.title}
        />

        <NavLink
          prefetch="intent"
          to={`/products/${product.node.handle}`}
          end
          className="btn !px-10 absolute bottom-0 left-0 right-0 text-center"
        >
          Shop now
        </NavLink>
      </div>

      <div>
        <div className="flex justify-between py-5">
          <h3 className="text-xl font-light">{product.node.title}</h3>
          <p>₱{product.node.priceRange.minVariantPrice.amount}</p>
        </div>

        {/* <p>{product.node.description}</p> */}
      </div>
    </div>
  );
};
