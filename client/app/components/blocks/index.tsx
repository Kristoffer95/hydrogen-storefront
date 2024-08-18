import type {Images, Callout, Hero, HeroSection} from 'sanity/types';
import sanityImages from '~/utils/sanityImages';

import HeroBlock from './hero';
import CalloutBlock from './callout';
import HeroSectionBlock from './HeroSectionBlock';
import ImagesBlock from './images';

export const components = {
  types: {
    callout: ({value}: {value: Callout}) => {
      return <CalloutBlock value={value} />;
    },
    hero: ({value}: {value: Hero}) => {
      return <HeroBlock value={value} />;
    },
    images: ({value}: {value: Images}) => {
      return <ImagesBlock value={value} />;
    },
    heroSection: ({value}: {value: HeroSection}) => {
      return <HeroSectionBlock value={value} />;
    },
  },
};
