
import {defineField} from 'sanity';
import { navLinkType } from '../link/navLinkType';

export const footerNavType = defineField({
  name: 'footerNav',
  title: 'Footer Nav',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    {
      title: 'Link',
      name: 'link',
      type: 'array',
      of: [
        {
          title: 'Link details',
          type: 'object',
          fields: [
            navLinkType,
            {
              title: 'Sub Navigation',
              name: 'subNavigation',
              type: 'array',
              of: [navLinkType],
            },
          ],
          preview: {
            select: {
              label: 'navLink.label',
              linkInternal: 'navLink.linkInternal.reference.title',
            },
            prepare({label, linkInternal}) {
              return  {
                title: label || linkInternal || 'Untitled'
              }
            }
          },
        },
      ],
    },
  ],
});
