export const destination = {
  name: 'destination',
  title: 'Destinations',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g. Mauritius, Western Cape, Cape Town',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Region', value: 'region' },
          { title: 'Country', value: 'country' },
          { title: 'Province / State / Area', value: 'province' },
          { title: 'City / Town', value: 'city' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
      description: 'What level in the hierarchy is this destination?',
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Indian Ocean Islands', value: 'indian-ocean-islands' },
          { title: 'Southern Africa', value: 'southern-africa' },
          { title: 'East Africa', value: 'east-africa' },
          { title: 'Europe', value: 'europe' },
          { title: 'Asia', value: 'asia' },
          { title: 'Americas', value: 'americas' },
          { title: 'Polar & Expedition', value: 'polar-expedition' },
          { title: 'Ocean Voyages', value: 'ocean-voyages' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Which broad region does this destination belong to?',
    },
    {
      name: 'parent',
      title: 'Parent Destination',
      type: 'reference',
      to: [{ type: 'destination' }],
      description: 'e.g. Western Cape\'s parent is South Africa. Cape Town\'s parent is Western Cape.',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for SEO',
          validation: (Rule: any) => Rule.required().warning('Alt text is important for SEO'),
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Introduction to this destination — shown at the top of the destination page',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Key highlights for this destination',
    },
    {
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      description: 'e.g. May to October for dry season',
    },
    {
      name: 'travelTips',
      title: 'Travel Tips',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Practical tips for visiting this destination',
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to make this destination visible on the website',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule: any) => Rule.max(60).warning('SEO titles over 60 characters may be truncated in Google'),
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(160).warning('SEO descriptions over 160 characters may be truncated in Google'),
    },
  ],
  preview: {
    select: {
      title: 'name',
      level: 'level',
      region: 'region',
      media: 'heroImage',
      parent: 'parent.name',
    },
    prepare({ title, level, region, media, parent }: any) {
      const subtitle = parent ? `${parent} → ${title}` : `${region} · ${level}`
      return { title, subtitle, media }
    },
  },
}