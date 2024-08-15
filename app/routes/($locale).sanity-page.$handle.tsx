import {useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {loadQuery} from 'sanity/loader.server';
import {PAGES_QUERY} from 'sanity/queries';
import type {Page} from 'sanity/types';

export async function loader({request, params}: LoaderFunctionArgs) {
  // const initial: Page[] = await loadQuery(PAGES_QUERY);

  // const url = new URL(request.url);
  // const pathname = url.pathname;

  // const path = pathname.replace('/sanity-page/', '');

  // if (!initial.map((page) => page?.slug?.current).includes(path)) {
  //   throw new Response(null, {status: 404});
  // }

  // return {pathname, initial};

  return {
    params,
  };
}

export default function CatchAllPage() {
  // const {pathname, initial} = useLoaderData<typeof loader>();
  const {params} = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Dynamic page</h1>

      <pre>{JSON.stringify(params, null, 2)}</pre>

      {/* <h1>Dynamic Page: {pathname}</h1>
      <p>This is a dynamically rendered page for the path: {pathname}</p>
      <pre>{pathname}</pre> */}

      {/* <pre>{JSON.stringify(initial, null, 2)}</pre> */}
    </div>
  );
}
