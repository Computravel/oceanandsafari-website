export const linkAnnotation = {
  title: 'Link',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: (Rule: any) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    },
  ],
}

export const richTextBlock = {
  type: 'block',
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Underline', value: 'underline' },
      { title: 'Strike', value: 'strike-through' },
    ],
    annotations: [linkAnnotation],
  },
}
