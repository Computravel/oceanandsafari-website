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
      validation: (Rule: any) => Rule.required(),
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
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'Add YouTube videos or upload video files to showcase this resort',
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