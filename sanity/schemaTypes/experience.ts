export const experience = {
  name: 'experience',
  title: 'Experiences',
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
          { title: 'Safari', value: 'safari' },
          { title: 'Island', value: 'island' },
          { title: 'Cruise', value: 'cruise' },
          { title: 'Coastal', value: 'coastal' },
          { title: 'Rail', value: 'rail' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Duration (nights)',
      type: 'number',
    },
    {
      name: 'priceFrom',
      title: 'Price From (R pp)',
      type: 'number',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
      description: 'Full formatted description with rich text support',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        { type: 'block' },
      ],
      description: 'Key selling points — paste multiple lines at once, use bullet points',
    },
    {
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'included',
      title: 'What is Included',
      type: 'array',
      of: [
        { type: 'block' },
      ],
      description: 'Paste multiple items at once — use bullet points or numbered list',
    },
    {
      name: 'notIncluded',
      title: 'What is Not Included',
      type: 'array',
      of: [
        { type: 'block' },
      ],
      description: 'Paste multiple items at once — use bullet points or numbered list',
    },
    {
      name: 'departureDate',
      title: 'Departure Date',
      type: 'date',
    },
    {
      name: 'flights',
      title: 'Flights',
      type: 'string',
      options: {
        list: [
          { title: 'Included', value: 'included' },
          { title: 'Not Included', value: 'not-included' },
        ],
      },
    },
    {
      name: 'transfers',
      title: 'Transfers',
      type: 'string',
      options: {
        list: [
          { title: 'Included', value: 'included' },
          { title: 'Not Included', value: 'not-included' },
        ],
      },
    },
    {
      name: 'accommodation',
      title: 'Accommodation',
      type: 'text',
      rows: 2,
    },
    {
      name: 'shipName',
      title: 'Ship Name',
      type: 'string',
      description: 'Cruises only',
    },
    {
      name: 'cruiseLine',
      title: 'Cruise Line',
      type: 'string',
      description: 'Cruises only',
    },
    {
      name: 'departureCity',
      title: 'Departure City',
      type: 'string',
    },
    {
      name: 'arrivalCity',
      title: 'Arrival City',
      type: 'string',
    },
    {
      name: 'needVisas',
      title: 'Visa Requirements',
      type: 'string',
      initialValue: 'Check with travel advisor',
    },
    {
      name: 'validFrom',
      title: 'Travel Valid From',
      type: 'date',
    },
    {
      name: 'validTo',
      title: 'Travel Valid To',
      type: 'date',
    },
    {
      name: 'offerExpires',
      title: 'Offer Expires',
      type: 'date',
    },
    {
      name: 'tripReference',
      title: 'Trip Reference',
      type: 'string',
    },
    {
      name: 'termsAndConditions',
      title: 'Terms and Conditions',
      type: 'text',
      rows: 4,
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to make this experience visible on the website',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Appears in Google search results. Ideally 50-60 characters.',
      validation: (Rule: any) => Rule.max(60).warning('SEO titles over 60 characters may be truncated in Google'),
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Appears under the title in Google search results. Ideally 140-160 characters.',
      validation: (Rule: any) => Rule.max(160).warning('SEO descriptions over 160 characters may be truncated in Google'),
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'heroImage',
      price: 'priceFrom',
    },
    prepare({ title, category, media, price }: any) {
      return {
        title,
        subtitle: `${category} · From R${price?.toLocaleString() ?? '0'} pp`,
        media,
      }
    },
  },
}