export const safari = {
  name: 'safari',
  title: 'Safaris',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Safari Operator Name',
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
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'e.g. Serengeti, Okavango Delta, Kruger',
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
      name: 'parksAndReserves',
      title: 'Parks & Reserves Covered',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Serengeti National Park, Ngorongoro Crater',
    },
    {
      name: 'accommodationStyle',
      title: 'Accommodation Style',
      type: 'string',
      options: {
        list: [
          { title: 'Luxury Tented Camp', value: 'luxury-tented' },
          { title: 'Lodge', value: 'lodge' },
          { title: 'Mobile Safari', value: 'mobile' },
          { title: 'Private Villa', value: 'private-villa' },
          { title: 'Mixed', value: 'mixed' },
        ],
      },
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          { title: 'Ultra Luxury (R30,000+ pp/night)', value: 'ultra-luxury' },
          { title: 'Luxury (R15,000–R30,000 pp/night)', value: 'luxury' },
          { title: 'Premium (R8,000–R15,000 pp/night)', value: 'premium' },
        ],
      },
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'Add YouTube videos or upload video files to showcase this safari',
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
      region: 'region',
      media: 'heroImage',
    },
    prepare({ title, region, media }: any) {
      return {
        title,
        subtitle: region,
        media,
      }
    },
  },
}