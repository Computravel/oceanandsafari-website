export const cruiseLine = {
  name: 'cruiseLine',
  title: 'Cruise Lines',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Cruise Line Name',
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
      name: 'logo',
      title: 'Logo',
      type: 'image',
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
      name: 'shipClasses',
      title: 'Ship Classes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. MSC Bellissima, MSC Seashore',
    },
    {
      name: 'destinationsServed',
      title: 'Destinations Served',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Mediterranean, Caribbean, Indian Ocean',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Luxury', value: 'luxury' },
          { title: 'Premium', value: 'premium' },
          { title: 'Contemporary', value: 'contemporary' },
          { title: 'Expedition', value: 'expedition' },
          { title: 'River', value: 'river' },
        ],
      },
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'Add YouTube videos or upload video files to showcase this cruise line',
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
      media: 'logo',
      category: 'category',
    },
    prepare({ title, media, category }: any) {
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
}