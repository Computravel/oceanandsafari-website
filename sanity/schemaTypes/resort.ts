export const resort = {
  name: 'resort',
  title: 'Resorts & Hotels',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Resort / Hotel Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. North Malé Atoll, Maldives',
    },
    {
      name: 'starRating',
      title: 'Star Rating',
      type: 'number',
      options: {
        list: [3, 4, 5],
      },
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'bestFor',
      title: 'Best For',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Honeymoon', value: 'honeymoon' },
          { title: 'Family', value: 'family' },
          { title: 'Solo', value: 'solo' },
          { title: 'Anniversary', value: 'anniversary' },
          { title: 'Groups', value: 'groups' },
          { title: 'Business', value: 'business' },
        ],
      },
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          { title: 'Luxury (R15,000+ pp/night)', value: 'luxury' },
          { title: 'Premium (R8,000–R15,000 pp/night)', value: 'premium' },
          { title: 'Superior (R4,000–R8,000 pp/night)', value: 'superior' },
        ],
      },
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      location: 'location',
      media: 'heroImage',
    },
    prepare({ title, location, media }: any) {
      return {
        title,
        subtitle: location,
        media,
      }
    },
  },
}