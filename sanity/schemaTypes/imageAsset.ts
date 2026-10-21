// Extends Sanity's built-in image asset document with a custom field.
// This doesn't create a new document type — it adds `source` onto every
// image uploaded to the project, so it appears in the Media Gallery's
// asset detail panel (and the default image field's asset dialog).
export const imageAsset = {
  type: 'sanity.imageAsset',
  name: 'sanity.imageAsset',
  fields: [
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where this image came from — a website URL, supplier name, or photographer. For internal reference only; never shown on the site.',
    },
  ],
}
