import {
  PortableText,
  type PortableTextMarkComponentProps,
} from '@portabletext/react';
import {dataset, projectId} from 'sanity/projectDetails';
import type {ImageContent} from 'sanity/types';

export default ({value}: {value: ImageContent}) => {
  const parts = value.image?.asset?._ref?.split('-');
  const imageId = parts?.[1];
  const dimensions = parts?.[2]?.split('x');
  const format = parts?.[3];

  const image = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}-${dimensions?.[0]}x${dimensions?.[1]}.${format}`;

  function cleanClassName(className: string) {
    return className.replace(/[\u200B-\u200D\uFEFF]/g, ''); // Removes zero-width spaces and other control chars
  }

  const components = {
    marks: {
      customClass: ({
        children,
        value,
      }: PortableTextMarkComponentProps<{
        className: string;
        _type: string;
      }>) => {
        return (
          <span className={cleanClassName(value?.className!)}>{children}</span>
        );
      },
    },
  };

  return (
    <div className="container py-28">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="image">
          <img src={image} loading="lazy" alt="image-content" />
        </div>

        <div className="content">
          <PortableText value={value.contentBlock!} components={components} />
        </div>
      </div>
    </div>
  );
};
