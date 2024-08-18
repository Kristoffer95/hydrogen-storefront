import {NavLink} from '@remix-run/react';
import type {HeroSection, Images} from 'sanity/types';
import sanityImage from '~/utils/sanityImage';

export default ({value}: {value: HeroSection}) => {
  // Get the image URL from sanityImage
  const imageUrl = sanityImage(value);

  return (
    <div className="relative">
      <div
        className="absolute z-10 left-1/2 top-1/2.5 -translate-x-1/2 -translate-y-1/2 bg-white/10
        w-full flex flex-col items-center justify-center py-20 backdrop-blur-sm contrast-125"
      >
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-white">C.O.F.F.E.E</h1>

          <h3 className="text-coffee-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h3>
        </div>

        <NavLink
          prefetch="intent"
          to="/collections/all"
          end
          className="px-36 py-3 bg-coffee-brown hover:bg-coffee-dark !text-white font-thin
          tracking-widest capitalize rounded-sm transition-all duration-300"
        >
          Shop now
        </NavLink>
      </div>

      {imageUrl && (
        <div
          className="max-w-screen h-[900px] brightness-[0.9] contrast-125 "
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
      )}
    </div>
  );
};
