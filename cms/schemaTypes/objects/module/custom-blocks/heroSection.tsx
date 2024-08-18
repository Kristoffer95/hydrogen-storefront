// 'imageFeature'

import {ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'

export const heroSectionType = defineField({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'imageFeatures',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}, validation: (Rule) => Rule.required()}],
      validation: (Rule) => Rule.required().max(1),
    }),
  ],
  preview: {
    select: {
      fileName: 'imageFeatures',
      image: 'imageFeatures',
    },
    prepare({fileName, image}) {
      console.log('filename', fileName)

      return {
        media: ImageIcon,
        // subtitle: 'sub title',
        title: 'Hero Section',
      }
    },
  },
})
