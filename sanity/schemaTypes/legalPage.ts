import { richTextBlock } from './richTextBlock'

export const legalPage = {
  name: 'legalPage',
  title: 'Legal Pages',
  type: 'document',
  fields: [
    {
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Terms & Conditions', value: 'terms' },
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'POPIA Compliance', value: 'popia' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Which page on the website this content appears on. Create only one document per page.',
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'Shown at the top of the page so visitors know how current it is.',
    },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [richTextBlock],
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      pageKey: 'pageKey',
      lastUpdated: 'lastUpdated',
    },
    prepare({ title, pageKey, lastUpdated }: any) {
      return {
        title: title || 'Untitled',
        subtitle: [pageKey, lastUpdated].filter(Boolean).join(' · '),
      }
    },
  },
}
