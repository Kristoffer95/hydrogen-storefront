import { defineField } from 'sanity';

export const navLinkType = defineField({
  title: 'Nav Link',
  name: 'navLink',
  type: 'object',
  fields: [
    {
      title: "Label",
      name: "label",
      type: "string",
    },
    defineField({
      name: 'linkInternal',
      type: 'linkInternal',
      options: {
        collapsed: false,
        collapsible: true
      }
    }),
  ],
  preview: {
    select: {
      title: 'label'
    }
  }
});
