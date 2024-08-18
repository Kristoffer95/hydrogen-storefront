import type {HeroSection, Images} from 'sanity/types';
import sanityImages from '~/utils/sanityImages';

export default ({value}: {value: Images}) => {
  // Get the image URL from sanityImage
  const images = sanityImages(value);

  return (
    <div className="container">
      <h1>This is Images Block</h1>

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
