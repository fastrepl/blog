import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true, // Enables the hotspot functionality for more flexible image cropping
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark this post as featured content',
      initialValue: false,
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Call to Action Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaType',
      title: 'Call to Action Type',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          {title: 'Individual', value: 'individual'},
          {title: 'Team', value: 'team'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'individual',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'},
        {
          type: 'object',
          name: 'table',
          title: 'Table',
          fields: [
            {
              name: 'rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'row',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      of: [{type: 'string'}],
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              rows: 'rows',
            },
            prepare({rows}) {
              return {
                title: 'Table',
                subtitle: `${rows?.length || 0} row(s)`,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'embed',
          title: 'Embed',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (rule) => rule.uri({allowRelative: false, scheme: ['http', 'https']}),
            },
          ],
          preview: {
            select: {
              url: 'url',
            },
            prepare({url}) {
              return {
                title: 'Embed',
                subtitle: url,
              }
            },
          },
        },
      ],
    }),
  ],
})
