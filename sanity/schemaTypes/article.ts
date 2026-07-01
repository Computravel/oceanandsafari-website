export const article = {
  name: 'article',
  title: 'Articles',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Destination Guide', value: 'destination-guide' },
          { title: 'Travel Tips', value: 'travel-tips' },
          { title: 'Client Stories', value: 'client-stories' },
          { title: 'Cruise Guides', value: 'cruise-guides' },
          { title: 'Safari Guides', value: 'safari-guides' },
          { title: 'Community & Sustainability', value: 'community-sustainability' },
          { title: 'Important Travel Requirements', value: 'travel-requirements' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'excerpt',
      title: 'Short excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary shown in article listings',
    },
    {
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to make this article visible on the website',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'heroImage',
    },
    prepare({ title, category, media }: any) {
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
}