import type {HeroSection, Images} from 'sanity/types';
import sanityImages from '~/utils/sanityImages';

export default ({value}: {value: Images}) => {
  // Get the image URL from sanityImage
  const images = sanityImages(value);

  return (
    <div>
      <h1>This is the hero section</h1>

      {/* <pre>{JSON.stringify(images, null, 2)}</pre> */}

      {images && images?.length > 0 ? (
        images?.map((image, index) => (
          <img key={`${image.index}`} src={image.url} alt="sample alt" />
        ))
      ) : (
        <p>No image available</p> // Fallback when no image is available
      )}
    </div>
  );
};
