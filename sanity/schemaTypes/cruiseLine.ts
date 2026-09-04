import { richTextBlock } from './richTextBlock'

// Lets editors drop a photo or YouTube video directly into the flow of a
// free-text section, wherever it's contextually relevant — alongside the
// dedicated gallery fields (e.g. accommodationGallery) for sections that
// want a proper photo grid instead of one-off inline images.
const inlineImage = {
  type: 'image',
  options: { hotspot: true },
  fields: [
    { name: 'alt', title: 'Alt Text', type: 'string', description: 'Describe the image for SEO and accessibility' },
    { name: 'caption', title: 'Caption (optional)', type: 'string' },
  ],
}

const inlineYoutube = {
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
    { name: 'caption', title: 'Caption (optional)', type: 'string' },
  ],
  preview: {
    select: { url: 'url', caption: 'caption' },
    prepare({ url, caption }: any) {
      return { title: caption || 'YouTube Video', subtitle: url }
    },
  },
}

const richSectionOf = [richTextBlock, inlineImage, inlineYoutube]

export const cruiseLine = {
  name: 'cruiseLine',
  title: 'Cruise Lines',
  type: 'document',
  groups: [
    { name: 'core', title: 'Core', default: true },
    { name: 'story', title: 'The Story' },
    { name: 'planning', title: 'Planning' },
    { name: 'glance', title: 'At a Glance' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // — Core —
    {
      name: 'name',
      title: 'Cruise Line Name',
      type: 'string',
      group: 'core',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name' },
      group: 'core',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'core',
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
      group: 'core',
    },
    {
      name: 'starRating',
      title: 'Star Rating',
      type: 'number',
      options: { list: [3, 4, 5] },
      group: 'core',
    },
    {
      name: 'shipClasses',
      title: 'Ship Classes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. MSC Bellissima, MSC Seashore',
      group: 'core',
    },
    {
      name: 'destinationsServed',
      title: 'Destinations Served',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Mediterranean, Caribbean, Indian Ocean',
      group: 'core',
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'Add YouTube videos or upload video files to showcase this cruise line',
      group: 'core',
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
            { name: 'caption', title: 'Caption (optional)', type: 'string' },
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
            { name: 'caption', title: 'Caption (optional)', type: 'string' },
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
      group: 'core',
    },
    {
      name: 'description',
      title: 'Description (Legacy)',
      type: 'text',
      rows: 4,
      group: 'core',
      description: 'Older free-text field, kept so nothing already written is lost. Still shown on the page until its content is migrated into the numbered sections below, at which point it can be removed.',
    },
    {
      name: 'highlights',
      title: 'Highlights (Legacy)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'core',
      description: 'Older free-text field, kept so nothing already written is lost. Still shown on the page until migrated.',
    },

    // — 01–07 The Story —
    {
      name: 'section01Introduction',
      title: 'The Cruise Line: Introduction & Philosophy',
      type: 'array',
      of: richSectionOf,
      group: 'story',
    },
    {
      name: 'section02Experience',
      title: 'The Experience: What It Feels Like to Travel With Them',
      type: 'array',
      of: richSectionOf,
      group: 'story',
    },
    {
      name: 'lifeOnBoard',
      title: 'Life On Board',
      type: 'object',
      group: 'story',
      description: 'Dining & Cuisine · Wellness & Relaxation · Entertainment & Enrichment',
      fields: [
        { name: 'dining', title: 'Dining & Cuisine', type: 'array', of: richSectionOf },
        { name: 'wellness', title: 'Wellness & Relaxation', type: 'array', of: richSectionOf },
        { name: 'entertainment', title: 'Entertainment & Enrichment', type: 'array', of: richSectionOf },
      ],
    },
    {
      name: 'section04Accommodation',
      title: 'Suites & Accommodation',
      type: 'array',
      of: richSectionOf,
      group: 'story',
    },
    {
      name: 'accommodationGallery',
      title: 'Suites & Accommodation Gallery',
      type: 'array',
      group: 'story',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string', description: 'Describe the image for SEO and accessibility' },
            { name: 'caption', title: 'Caption (optional)', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'section05Destinations',
      title: 'Destinations: Where They Go',
      type: 'array',
      of: richSectionOf,
      group: 'story',
    },
    {
      name: 'signatureExperiencesIntro',
      title: 'Signature Experiences — Intro',
      type: 'text',
      rows: 2,
      group: 'story',
      description: 'Optional short intro line shown above the list',
    },
    {
      name: 'signatureExperiences',
      title: 'Signature Experiences',
      type: 'array',
      group: 'story',
      description: 'What makes this cruise line distinctive — each with a short title and description',
      of: [
        {
          type: 'object',
          name: 'signatureExperience',
          title: 'Signature Experience',
          fields: [
            { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    },
    {
      name: 'section07WhyChooseThem',
      title: 'Why Choose Them?',
      type: 'array',
      of: richSectionOf,
      group: 'story',
      description: 'Your editorial comparison / positioning against other cruise lines',
    },

    // — 08–11 Planning —
    {
      name: 'whoIsItFor',
      title: 'Who Is It For?',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Couples', value: 'couples' },
          { title: 'Families', value: 'families' },
          { title: 'Multigenerational', value: 'multigenerational' },
          { title: 'Solo Travellers', value: 'solo' },
          { title: 'Honeymooners', value: 'honeymooners' },
          { title: 'Groups of Friends', value: 'groups' },
        ],
      },
      group: 'planning',
    },
    {
      name: 'whenToGo',
      title: 'When to Go',
      type: 'array',
      group: 'planning',
      description: 'Seasonality and planning, broken down by period',
      of: [
        {
          type: 'object',
          name: 'season',
          title: 'Season / Period',
          fields: [
            { name: 'period', title: 'Period', type: 'string', validation: (Rule: any) => Rule.required() },
            { name: 'description', title: 'Why this period', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'period', subtitle: 'description' } },
        },
      ],
    },
    {
      name: 'ourPerspective',
      title: "Our Perspective",
      type: 'array',
      of: richSectionOf,
      group: 'planning',
      description: "Your travel advisor's recommendation",
    },
    {
      name: 'selectedVoyages',
      title: 'Selected Voyages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'experience' }] }],
      validation: (Rule: any) => Rule.max(6),
      group: 'planning',
      description: 'Up to 6 current, time-limited Experience packages to feature for this cruise line',
    },

    // — 12 At a Glance —
    {
      name: 'atAGlance',
      title: 'At a Glance',
      type: 'object',
      group: 'glance',
      description: 'Useful factual summary — adjust these fields to whatever facts matter most',
      fields: [
        { name: 'founded', title: 'Founded', type: 'string' },
        { name: 'fleetSize', title: 'Fleet Size', type: 'string', description: 'e.g. 17 ships' },
        { name: 'flagship', title: 'Flagship', type: 'string' },
        { name: 'onboardCurrency', title: 'Onboard Currency', type: 'string' },
        { name: 'gratuities', title: 'Gratuities', type: 'string' },
        { name: 'dressCode', title: 'Dress Code', type: 'string' },
        { name: 'idealVoyageLength', title: 'Ideal Voyage Length', type: 'string' },
        { name: 'pricePositioning', title: 'Price Positioning', type: 'string' },
      ],
    },

    // — SEO —
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Ideally 50–60 characters.',
      validation: (Rule: any) => Rule.max(60).warning('SEO titles over 60 characters may be truncated in Google'),
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Ideally 140–160 characters.',
      validation: (Rule: any) => Rule.max(160).warning('SEO descriptions over 160 characters may be truncated in Google'),
      group: 'seo',
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
