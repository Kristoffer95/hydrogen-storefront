import type {HeroSection, Images} from 'sanity/types';
import sanityImage from '~/utils/sanityImage';

export default ({value}: {value: HeroSection}) => {
  // Get the image URL from sanityImage
  const imageUrl = sanityImage(value);

  return (
    <div>
      <h1>This is the hero section</h1>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          style={{
            width: 'auto',
          }}
        />
      ) : (
        <p>No image available</p> // Fallback when no image is available
      )}
    </div>
  );
};
