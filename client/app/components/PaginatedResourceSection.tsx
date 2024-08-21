import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 */

export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resoucesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div className="flex flex-col gap-4">
            <div>
              <div className="py-10 flex justify-center">
                <PreviousLink className="btn">
                  {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
                </PreviousLink>
              </div>
              {resourcesClassName ? (
                <div className={resourcesClassName}>{resoucesMarkup}</div>
              ) : (
                resoucesMarkup
              )}
              <div className="py-10 flex justify-center">
                <NextLink className="px-36 py-3 bg-coffee-brown hover:bg-coffee-dark !text-white font-thin tracking-widest capitalize rounded-sm transition-all duration-300">
                  {isLoading ? 'Loading...' : <span>Load more ↓</span>}
                </NextLink>
              </div>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
