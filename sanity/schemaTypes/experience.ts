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
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for SEO and accessibility. e.g. "Aerial view of Maldives overwater bungalows at sunrise"',
          validation: (Rule: any) => Rule.required().warning('Alt text is important for SEO — please add a description'),
        },
      ],
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
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for SEO and accessibility',
              validation: (Rule: any) => Rule.required().warning('Alt text is important for SEO'),
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for SEO and accessibility',
              validation: (Rule: any) => Rule.required().warning('Alt text is important for SEO'),
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Add multiple images to display as a scrollable gallery on the experience page',
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'Add YouTube videos or upload video files to showcase this experience',
      of: [
        {
          type: 'object',
          name: 'youtubeEmbed',
          title: 'YouTube Video',
          fields: [
            {
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              description: 'Paste the full YouTube URL e.g. https://www.youtube.com/watch?v=ABC123',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: { url: 'url', caption: 'caption' },
            prepare({ url, caption }: any) {
              return { title: caption || 'YouTube Video', subtitle: url }
            },
          },
        },
        {
          type: 'object',
          name: 'uploadedVideo',
          title: 'Uploaded Video',
          fields: [
            {
              name: 'video',
              title: 'Video File',
              type: 'file',
              options: { accept: 'video/*' },
              description: 'Upload an MP4 video file. Keep under 100MB for best performance.',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: { caption: 'caption' },
            prepare({ caption }: any) {
              return { title: caption || 'Uploaded Video' }
            },
          },
        },
      ],
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
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Internal only — where this package information came from e.g. Thompsons, tour operator website',
    },
    {
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Internal only — notes about this experience, future updates needed, pricing review dates etc. Never shown on the website.',
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