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
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for SEO and accessibility. e.g. "Zanzibar Stone Town waterfront at sunset with traditional dhow boats"',
          validation: (Rule: any) => Rule.required().warning('Alt text is important for SEO — please add a description'),
        },
        {
          name: 'caption',
          title: 'Caption (optional)',
          type: 'string',
          description: 'Shown below the image on the article page',
        },
      ],
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
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for SEO and accessibility. e.g. "Zanzibar Stone Town waterfront at sunset"',
              validation: (Rule: any) => Rule.required().warning('Alt text is important for SEO — please add a description'),
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
              description: 'Shown below the image on the article page',
            },
          ],
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'alt',
            },
          },
        },
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
              description: 'Shown below the video',
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
              description: 'Shown below the video',
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
    {
      name: 'destinations',
      title: 'Destinations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'destination' }],
        }
      ],
      description: 'Link this article to one or more destinations.',
    },
    {
      name: 'relatedExperiences',
      title: 'Related Experiences',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'experience' }],
        }
      ],
      validation: (Rule: any) => Rule.max(3),
      description: 'Select up to 3 experiences to show at the bottom of this article.',
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
