import type {EntryContext, AppLoadContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
  });

  // Parse the existing CSP header
  let updatedCspHeader = header;

  // Check if 'img-src' is already defined, and append or create it
  if (updatedCspHeader.includes('img-src')) {
    updatedCspHeader = updatedCspHeader.replace(
      /img-src[^;]*/,
      (match) => `${match} https://cdn.shopify.com https://cdn.sanity.io`,
    );
  } else {
    updatedCspHeader += `; img-src 'self' https://cdn.shopify.com https://cdn.sanity.io`;
  }

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', updatedCspHeader); // Set the updated CSP header

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
