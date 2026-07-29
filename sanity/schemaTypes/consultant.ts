import { richTextBlock } from './richTextBlock'

export const consultant = {
  name: 'consultant',
  title: 'Consultants',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. Founder, CEO and Luxury Travel Specialist',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: '1 = first, 2 = second etc.',
      initialValue: 1,
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'e.g. Lindsay Quail, Founder of Ocean & Safari',
        },
      ],
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'array',
      of: [richTextBlock],
      description: 'Full biography — shown on the About page',
    },
    {
      name: 'specialities',
      title: 'Specialities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. Indian Ocean Islands, African Safaris, Luxury Cruises',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Optional — shown on the About page',
    },
    {
      name: 'quote',
      title: 'Personal Quote',
      type: 'text',
      rows: 2,
      description: 'A short personal quote shown on the profile card',
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
}