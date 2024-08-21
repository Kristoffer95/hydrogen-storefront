import {PortableText} from '@portabletext/react';
import {dataset, projectId} from 'sanity/projectDetails';
import type {ImageContent} from 'sanity/types';

export default ({value}: {value: ImageContent}) => {
  const parts = value.image?.asset?._ref?.split('-');
  const imageId = parts?.[1];
  const dimensions = parts?.[2]?.split('x');
  const format = parts?.[3];

  // Construct the URL (adjust the base URL to your Sanity project's settings)
  const image = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}-${dimensions?.[0]}x${dimensions?.[1]}.${format}`;

  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="image">
          <img src={image} loading="lazy" alt="image-content" />
        </div>

        <div className="content">
          <PortableText value={value.contentBlock!} />
        </div>
      </div>
    </div>
  );
};
