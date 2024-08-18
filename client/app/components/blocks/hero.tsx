import {PortableText} from '@portabletext/react';
import type {Hero} from 'sanity/types';

function HeroBlock({value}: {value: Hero}) {
  return (
    <div>
      <h1>This is hero</h1>

      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
  // return <PortableText value={value.content} />;
}
export default HeroBlock;
