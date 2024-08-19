import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import {type CartViewPayload, useAnalytics} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import type {Navigation, NAVIGATION_QUERYResult} from 'sanity/types';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  headerNav: NAVIGATION_QUERYResult[number]['header'];
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  headerNav,
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="sticky top-0 bg-white/20 backdrop-blur-lg z-30">
      <div className="container header">
        <NavLink
          prefetch="intent"
          to="/"
          style={activeLinkStyle}
          end
          className={'!text-coffee-light text-sm  uppercase tracking-wide'}
        >
          <strong>{shop.name}</strong>
        </NavLink>

        <HeaderMenu
          menu={header.menu}
          headerNav={headerNav}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
        {/* <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      /> */}
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );
}

export function HeaderMenu({
  headerNav,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
  menu,
}: {
  headerNav: NAVIGATION_QUERYResult[number]['header'];
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  function slugHandler(nav: any) {
    if (nav.navLink?.link?.slug?.current.startsWith('/')) {
      return nav.navLink?.link?.slug?.current;
    }

    return `/sanity-page/${nav.navLink?.link?.slug?.current}`;
  }

  return (
    <nav className="pl-6 flex gap-6" role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}

      {headerNav?.link?.map((nav, index) => (
        <NavLink
          className="!text-coffee-light text-sm hover:!opacity-100 transition-all duration-300 uppercase tracking-wide"
          end
          // eslint-disable-next-line react/no-array-index-key
          key={`nav-${index}`}
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to={slugHandler(nav)}
        >
          {/* @ts-ignore */}
          {nav.navLink?.label ?? nav.navLink?.link?.title}
        </NavLink>
      ))}

      {/* <NavLink
        className="header-menu-item !text-coffee-dark-brown"
        end
        onClick={closeAside}
        prefetch="intent"
        to="/testing"
      >
        Testing
      </NavLink> */}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink
        prefetch="intent"
        to="/account"
        style={activeLinkStyle}
        className={'!text-coffee-light'}
      >
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      className="reset !text-coffee-light !text-sm uppercase tracking-wide"
      onClick={() => open('search')}
    >
      Search
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className="!text-coffee-light !text-sm uppercase tracking-wide"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    // textDecoration: isActive ? 'underline' : undefined,
    opacity: isActive ? 1 : 0.5,
  };
}
