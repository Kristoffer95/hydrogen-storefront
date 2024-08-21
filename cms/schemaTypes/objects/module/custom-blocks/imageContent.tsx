import {ImageIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export const imageContentType = defineField({
  name: 'imageContent',
  title: 'Image Content',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image Block',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentBlock',
      title: 'Content Block',
      type: 'portableTextSimple',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'image.asset.originalFilename',
      media: 'image',
    },
    prepare({title, media}) {
      return {
        media,
        title: title || 'No title',
        subtitle: 'Image Content',
      }
    },
  },
})
