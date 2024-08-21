import {defineField, defineType} from 'sanity'

export const featuredProductsType = defineType({
  name: 'featuredProducts',
  title: 'Featured Products',
  type: 'object',
  fields: [
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      readOnly: true,
      description: 'Featured Products will automatically be integrated with this block.',
      initialValue: 'Featured Products will automatically be integrated with this block.',
    }),
  ],
  preview: {
    select: {
      title: 'note',
    },
    prepare({title}) {
      return {
        title: title || 'Featured Products',
        subtitle: 'This block will be automatically populated with featured products.',
      }
    },
  },
})
