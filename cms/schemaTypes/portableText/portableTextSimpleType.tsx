import {defineArrayMember, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const portableTextSimpleType = defineField({
  name: 'portableTextSimple',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Italic', value: 'em'},
          {title: 'Strong', value: 'strong'},
        ],
        annotations: [
          {name: 'linkProduct', type: 'linkProduct'},
          {name: 'linkEmail', type: 'linkEmail'},
          {name: 'linkInternal', type: 'linkInternal'},
          {name: 'linkExternal', type: 'linkExternal'},
          defineField({
            name: 'customClass',
            type: 'object',
            title: 'Custom CSS Class',
            icon: CogIcon,
            fields: [
              defineField({
                name: 'className',
                type: 'string',
                title: 'CSS Class',
                description: 'Enter a custom CSS class for this text.',
              }),
            ],
          }),
        ],
      },
    }),
  ],
})
