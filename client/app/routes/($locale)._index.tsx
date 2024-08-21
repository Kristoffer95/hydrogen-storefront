import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {PAGE_QUERY} from 'sanity/queries';
import {loadQuery} from 'sanity/loader.server';
import {PortableText} from '@portabletext/react';
import {components} from '~/components/blocks';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  // const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({
    ...criticalData,
  });
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [page] = await Promise.all([
    loadQuery(PAGE_QUERY, {
      page: '/',
    }),
  ]);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return {
    // featuredCollection: collections.nodes[0],
    homePage: page,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  return null;
}

export default function Homepage() {
  const {homePage} = useLoaderData<typeof loader>();
  return <PortableText value={homePage.body} components={components} />;
}
