import { richTextBlock } from './richTextBlock'

export const lodge = {
  name: 'lodge',
  title: 'Safari Lodges & Reserves',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media & Galleries' },
    { name: 'related', title: 'Related & CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // — Content —
    {
      name: 'name',
      title: 'Safari Lodge or Reserve Name',
      type: 'string',
      group: 'content',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name' },
      group: 'content',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'e.g. Serengeti, Okavango Delta, Kruger',
      group: 'content',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      description: 'e.g. Tanzania, Botswana, South Africa',
      group: 'content',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        richTextBlock,
        { type: 'image', options: { hotspot: true } },
      ],
      description: 'Full formatted description, ~180–250 words, with rich text support',
      group: 'content',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.min(5).max(8).warning('Aim for 5–8 concise highlights'),
      description: '5–8 concise bullet points — one line each',
      group: 'content',
    },
    {
      name: 'safariExperience',
      title: 'Safari Experience',
      type: 'array',
      of: [
        richTextBlock,
        { type: 'image', options: { hotspot: true } },
      ],
      description: 'Describe what the safari experience is actually like — game drives, guiding style, pace, etc.',
      group: 'content',
    },
    {
      name: 'wildlifeHighlights',
      title: 'Wildlife Highlights',
      type: 'array',
      of: [richTextBlock],
      description: 'What animals and wildlife guests can expect to see — Big Five, birdlife, marine life, etc.',
      group: 'content',
    },
    {
      name: 'parksAndReserves',
      title: 'Parks & Reserves Covered',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Serengeti National Park, Ngorongoro Crater',
      group: 'content',
    },
    {
      name: 'accommodationStyle',
      title: 'Accommodation Style',
      type: 'string',
      options: {
        list: [
          { title: 'Luxury Tented Camp', value: 'luxury-tented' },
          { title: 'Lodge', value: 'lodge' },
          { title: 'Luxury Suite', value: 'luxury-suite' },
          { title: 'Mobile Safari', value: 'mobile' },
          { title: 'Private Villa', value: 'private-villa' },
          { title: 'Mixed', value: 'mixed' },
        ],
      },
      group: 'content',
    },
    {
      name: 'suitableFor',
      title: 'Suitable For',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Families', value: 'families' },
          { title: 'Honeymooners', value: 'honeymooners' },
          { title: 'Solo Travellers', value: 'solo' },
          { title: 'Couples', value: 'couples' },
          { title: 'Groups of Friends', value: 'groups' },
          { title: 'Multi-Generational', value: 'multi-generational' },
          { title: 'Active & Adventure Travellers', value: 'active-adventure' },
        ],
      },
      description: 'Select all traveller types this lodge suits',
      group: 'content',
    },
    {
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      description: 'e.g. June to October (dry season) for game viewing',
      group: 'content',
    },
    {
      name: 'conservationAndCommunity',
      title: 'Conservation & Community',
      type: 'array',
      of: [richTextBlock],
      description: 'Conservation initiatives, community partnerships, sustainability practices',
      group: 'content',
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
      group: 'content',
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle to make this lodge visible on the website',
      group: 'content',
    },

    // — Media & Galleries —
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
          description: 'Describe the image for SEO and accessibility',
          validation: (Rule: any) => Rule.required().warning('Alt text is important for SEO — please add a description'),
        },
      ],
      description: 'Used at the top of the page unless a Hero Video is also provided below',
      group: 'media',
    },
    {
      name: 'heroVideo',
      title: 'Hero Video (optional)',
      type: 'array',
      description: 'If provided, this video plays at the top of the page instead of the Hero Image above. Add at most one.',
      validation: (Rule: any) => Rule.max(1),
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
      group: 'media',
    },
    {
      name: 'experienceGallery',
      title: 'Experience Image Gallery',
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
      description: 'Photos of the safari experience — game drives, landscapes, guests in the field',
      group: 'media',
    },
    {
      name: 'accommodationGallery',
      title: 'Accommodation Image Gallery',
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
      description: 'Photos of rooms, tents, common areas, pools, dining',
      group: 'media',
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'Add one or more YouTube videos or uploaded video files to showcase this lodge',
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
      group: 'media',
    },

    // — Related & CTA —
    {
      name: 'relatedExperiences',
      title: 'Related Experiences (Packages for this Lodge or Reserve)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'experience' }],
        },
      ],
      validation: (Rule: any) => Rule.max(6),
      description: 'Select up to 6 bookable experiences/packages that feature this lodge — shown at the bottom of the page',
      group: 'related',
    },
    {
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      description: 'Drives the enquiry section heading/copy and the sidebar button label on the lodge page',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Defaults to "Enquire About This Lodge" if left blank',
        },
        {
          name: 'subtext',
          title: 'Supporting Copy',
          type: 'text',
          rows: 2,
        },
        {
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'string',
          description: 'Defaults to "Enquire Now" if left blank',
        },
      ],
      group: 'related',
    },

    // — SEO —
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Appears in Google search results. Ideally 50–60 characters.',
      validation: (Rule: any) => Rule.max(60).warning('SEO titles over 60 characters may be truncated in Google'),
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Appears under the title in Google search results. Ideally 140–160 characters.',
      validation: (Rule: any) => Rule.max(160).warning('SEO descriptions over 160 characters may be truncated in Google'),
      group: 'seo',
    },
  ],
  preview: {
    select: {
      title: 'name',
      region: 'region',
      country: 'country',
      media: 'heroImage',
    },
    prepare({ title, region, country, media }: any) {
      return {
        title,
        subtitle: [region, country].filter(Boolean).join(', '),
        media,
      }
    },
  },
}
