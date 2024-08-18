import {dataset, projectId} from 'sanity/projectDetails';
import type {HeroSection, ImageFeature, Images} from 'sanity/types';

export default (data: HeroSection) => {
  const {imageFeatures} = data;

  if (imageFeatures && imageFeatures?.length > 0) {
    const imageRef = imageFeatures[0]?.asset?._ref;

    const parts = imageRef?.split('-');
    const imageId = parts?.[1];
    const dimensions = parts?.[2]?.split('x');
    const format = parts?.[3];

    // Construct the URL (adjust the base URL to your Sanity project's settings)
    const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}-${dimensions?.[0]}x${dimensions?.[1]}.${format}`;

    return imageUrl;
  }
};
