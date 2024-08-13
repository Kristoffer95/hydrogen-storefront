
/// <reference types="vite/client" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

import type {
  HydrogenContext,
  HydrogenSessionData,
  HydrogenEnv,
} from '@shopify/hydrogen';
import type {createAppLoadContext} from '~/lib/context';

declare global {
  interface Env extends HydrogenEnv {
    // declare additional Env parameters used in the fetch handler and Remix loader context here
  }
}

declare module '@shopify/remix-oxygen' {
  interface AppLoadContext
    extends Awaited<ReturnType<typeof createAppLoadContext>> {
    // to change context type, change the return of createAppLoadContext() instead
  }

  interface SessionData extends HydrogenSessionData {
    // declare local additions to the Remix session data here
  }
}

// Accessing the environment variables using Vite's import.meta.env
const projectId = import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID as string;
const dataset = import.meta.env.VITE_SANITY_STUDIO_DATASET as string;
const studioUrl = import.meta.env.VITE_SANITY_STUDIO_URL as string;
const stegaEnabled = import.meta.env.VITE_SANITY_STUDIO_STEGA_ENABLED === 'true';

if (!projectId || !dataset || !studioUrl) {
  throw new Error('Missing necessary environment variables in .env');
}

export const config = {
  projectId,
  dataset,
  studioUrl,
  stegaEnabled,
};
