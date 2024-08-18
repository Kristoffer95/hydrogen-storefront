import {PortableText} from '@portabletext/react';
import {useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {loadQuery} from 'sanity/loader.server';
import {PAGE_QUERY} from 'sanity/queries';
import type {Page} from 'sanity/types';
import {components} from '~/components/blocks';

export async function loader({request, params}: LoaderFunctionArgs) {
  const initial: Page = await loadQuery(PAGE_QUERY, params);

  return {
    params,
    initial,
  };
}

export default function Pages() {
  // const {pathname, initial} = useLoaderData<typeof loader>();
  const {params, initial} = useLoaderData<typeof loader>();

  return <PortableText value={initial.body!} components={components} />;
}
