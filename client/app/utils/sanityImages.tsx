import {dataset, projectId} from 'sanity/projectDetails';
import type {HeroSection, ImageFeature, Images} from 'sanity/types';

export default (data: Images) => {
  const {imageFeatures} = data;

  return (
    imageFeatures?.map((feature, index) => {
      const imageRef = feature.image?.asset?._ref;

      // if (!imageRef) return null;

      // Extract the image ID and format from the _ref
      const parts = imageRef?.split('-');
      const imageId = parts?.[1];
      const dimensions = parts?.[2].split('x');
      const format = parts?.[3];

      // Construct the URL (adjust the base URL to your Sanity project's settings)
      const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}-${dimensions?.[0]}x${dimensions?.[1]}.${format}`;

      return {
        url: imageUrl,
        index,
      };
    }) || []
  );
};
