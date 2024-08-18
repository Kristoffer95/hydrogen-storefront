import {TagIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import {defineField} from 'sanity'

export const featuredProductsType = defineField({
  name: 'featuredProducts',
  title: 'Featured Products',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'products',
      type: 'array',
      of: [{type: 'productReference'}],
      validation: (Rule) => Rule.required().max(2),
    }),
    defineField({
      name: 'layout',
      type: 'string',
      initialValue: 'card',
      options: {
        direction: 'horizontal',
        layout: 'radio',
        list: [
          {
            title: 'Cards (large)',
            value: 'card',
          },
          {
            title: 'Pills (small)',
            value: 'pill',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      products: 'products',
    },
    prepare({products}) {
      return {
        subtitle: 'Featured Products',
        title: products.length > 0 ? pluralize('product', products.length, true) : 'No products',
        media: TagIcon,
      }
    },
  },
})

// import {TiersIcon} from '@sanity/icons'
// import pluralize from 'pluralize-esm'
// import {defineField} from 'sanity'

// export const featuredProductsType = defineField({
//   name: 'featuredProducts',
//   title: 'Featured Products',
//   type: 'object',
//   icon: TiersIcon,
//   fields: [
//     defineField({
//       name: 'imageFeatures',
//       title: 'Images',
//       type: 'array',
//       of: [{type: 'imageFeature'}],
//       validation: (Rule) => Rule.required().max(6),
//     }),
//     // defineField({
//     //   name: 'fullWidth',
//     //   type: 'boolean',
//     //   description: 'Display single image at full width (on larger breakpoints)',
//     //   initialValue: false,
//     //   hidden: ({parent}) => parent?.modules?.length > 1,
//     // }),
//     // defineField({
//     //   name: 'verticalAlign',
//     //   title: 'Vertical alignment',
//     //   type: 'string',
//     //   initialValue: 'top',
//     //   options: {
//     //     direction: 'horizontal',
//     //     layout: 'radio',
//     //     list: ['top', 'center', 'bottom'],
//     //   },
//     //   hidden: ({parent}) => !parent?.modules || parent?.modules?.length < 2,
//     //   validation: (Rule) => Rule.required(),
//     // }),
//   ],
//   preview: {
//     select: {
//       images: 'imageFeatures',
//     },
//     prepare({images}) {
//       return {
//         subtitle: 'Images',
//         title: images?.length > 0 ? pluralize('image', images.length, true) : 'No images',
//         media: TiersIcon,
//       }
//     },
//   },
// })
