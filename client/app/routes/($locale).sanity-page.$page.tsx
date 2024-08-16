import {useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {loadQuery} from 'sanity/loader.server';
import {PAGE_QUERY} from 'sanity/queries';
import type {Page} from 'sanity/types';

export async function loader({request, params}: LoaderFunctionArgs) {
  const initial: Page[] = await loadQuery(PAGE_QUERY, params);

  // const url = new URL(request.url);
  // const pathname = url.pathname;

  // const path = pathname.replace('/sanity-page/', '');

  // if (!initial.map((page) => page?.slug?.current).includes(path)) {
  //   throw new Response(null, {status: 404});
  // }

  // return {pathname, initial};

  return {
    params,
    initial,
  };
}

export default function Pages() {
  // const {pathname, initial} = useLoaderData<typeof loader>();
  const {params, initial} = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Dynamic page</h1>

      <pre>{JSON.stringify(params, null, 2)}</pre>
      <pre>{JSON.stringify(initial, null, 2)}</pre>

      {/* <h1>Dynamic Page: {pathname}</h1>
      <p>This is a dynamically rendered page for the path: {pathname}</p>
      <pre>{pathname}</pre> */}

      {/* <pre>{JSON.stringify(initial, null, 2)}</pre> */}
    </div>
  );
}
