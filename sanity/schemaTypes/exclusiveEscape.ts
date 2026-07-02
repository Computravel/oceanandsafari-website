export const exclusiveEscape = {
  name: 'exclusiveEscape',
  title: 'Exclusive Escapes',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroImage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for SEO and accessibility',
        },
      ],
    },
    {
      name: 'originalPrice',
      title: 'Original Price (R pp)',
      type: 'number',
    },
    {
      name: 'offerPrice',
      title: 'Offer Price (R pp)',
      type: 'number',
    },
    {
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
    },
    {
      name: 'linkedExperience',
      title: 'Linked Experience',
      type: 'reference',
      to: [{ type: 'experience' }],
      description: 'Link to the full experience page',
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show or hide this escape on the homepage',
    },
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      media: 'heroImage',
      price: 'offerPrice',
    },
    prepare({ title, active, media, price }: any) {
      return {
        title,
        subtitle: `${active ? '✅ Active' : '⏸ Inactive'} · From R${price?.toLocaleString() ?? '0'} pp`,
        media,
      }
    },
  },
}