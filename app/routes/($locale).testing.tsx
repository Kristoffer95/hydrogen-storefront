import {useLoaderData} from '@remix-run/react';
import {loadQuery} from 'sanity/loader.server';
import {PAGES_QUERY} from 'sanity/queries';
import type {Page} from 'sanity/types';

export const loader = async () => {
  const initial = await loadQuery(PAGES_QUERY);

  return {initial, query: PAGES_QUERY, params: {}};
};

export default function Testing() {
  const data = useLoaderData<{
    initial: Page[];
    query: string;
    params: Record<string, unknown>;
  }>();
  return (
    <div className="cart">
      <h1>Testing</h1>

      <pre>{JSON.stringify(data.initial, null, 2)}</pre>
      {/* <h1>Cart</h1>
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await
          resolve={rootData.cart}
          errorElement={<div>An error occurred</div>}
        >
          {(cart) => {
            return <CartMain layout="page" cart={cart} />;
          }}
        </Await>
      </Suspense> */}
    </div>
  );
}
