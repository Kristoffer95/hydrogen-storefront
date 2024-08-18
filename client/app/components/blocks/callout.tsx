import type {Callout} from 'sanity/types';

export default ({value}: {value: Callout}) => (
  <div>
    <h4>This is callout component. hey....</h4>
    <pre>{JSON.stringify(value.text, null, 2)}</pre>
  </div>
);
