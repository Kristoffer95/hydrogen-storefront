import {useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // You could perform additional logic here, like fetching page data based on the pathname

  return {pathname};
}

export default function CatchAllPage() {
  const {pathname} = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Dynamic Page: {pathname}</h1>
      <p>This is a dynamically rendered page for the path: {pathname}</p>
    </div>
  );
}
