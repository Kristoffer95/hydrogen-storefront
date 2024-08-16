import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({params, context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we are still at the default locale
    // then the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  // Let the request continue to other routes (like the catch-all route)
  return null;
}
