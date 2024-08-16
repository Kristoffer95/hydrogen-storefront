import {CogIcon, ControlsIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

const TITLE = 'Navigation'

export const navigationType = defineType({
  name: 'navigation',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Navigation',
      icon: ControlsIcon,
    },
  ],
  fields: [
    defineField({
      name: 'header',
      type: 'headerNav',
      group: 'navigation',
    }),
    defineField({
      name: 'footer',
      type: 'footerNav',
      group: 'navigation',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
