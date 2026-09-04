/**
 * beachcomberSpecial
 *
 * This document type is a sync + overlay model.
 *
 * - Fields in the "synced" group are written automatically once a day by the
 *   /api/cron/sync-beachcomber-rates job (see app/lib/beachcomber/sync.ts).
 *   They are marked readOnly so nobody accidentally edits them in Studio only
 *   to have the value overwritten on the next sync anyway.
 *
 * - Fields in the "editorial" group are owned by Lindsay / content editors.
 *   The sync job never touches these — it only ever `.set()`s the synced
 *   field names, so anything in the editorial group is safe.
 *
 * Documents are keyed by `beachcomberIdentity` (the `identity` field from
 * Beachcomber's /getRates response) via a deterministic Sanity _id of the
 * form `beachcomberSpecial.<identity>`, so re-running the sync updates the
 * same document rather than creating duplicates.
 */

export const beachcomberSpecial = {
  name: 'beachcomberSpecial',
  title: 'Beachcomber Special',
  type: 'document',
  groups: [
    { name: 'editorial', title: 'Editorial (Lindsay)', default: true },
    { name: 'synced', title: 'Beachcomber Data (auto-synced, read-only)' },
  ],
  fields: [
    // ---------------------------------------------------------------------
    // EDITORIAL FIELDS — safe to edit in Studio, never overwritten by sync
    // ---------------------------------------------------------------------
    {
      name: 'customTitle',
      title: 'Custom Title',
      type: 'string',
      group: 'editorial',
      description:
        'Overrides the raw Beachcomber offer title on the site. Leave blank to use "Offer Title (Beachcomber)" from the synced data.',
    },
    {
      name: 'customDescription',
      title: 'Custom Description',
      type: 'text',
      rows: 4,
      group: 'editorial',
      description:
        'Overrides the raw Beachcomber hotel description. Leave blank to use the synced description.',
    },
    {
      name: 'curatedImage',
      title: 'Curated Hero Image',
      type: 'image',
      group: 'editorial',
      options: { hotspot: true },
      description: 'Optional: override the hero image pulled from Beachcomber.',
    },
    {
      name: 'experienceRefs',
      title: 'Linked Experiences',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'experience' }] }],
      group: 'editorial',
      description:
        'Attach this special to one or more Experiences. It will appear inline on those Experience pages instead of a standalone specials page. This is the primary link — use it whenever a matching Experience exists.',
    },
    {
      name: 'destinationRef',
      title: 'Linked Destination (fallback)',
      type: 'reference',
      to: [{ type: 'destination' }],
      group: 'editorial',
      description:
        'Only needed if no matching Experience exists yet — links the special to a Destination page instead.',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'editorial',
      initialValue: false,
      description: 'Show this special in featured/homepage placements.',
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      group: 'editorial',
      description: 'Lower numbers show first. Leave blank for default (newest first).',
    },
    {
      name: 'isHidden',
      title: 'Hidden',
      type: 'boolean',
      group: 'editorial',
      initialValue: false,
      description:
        'Hides this special from the site. Set automatically to true if Beachcomber removes it from their feed — check before un-hiding manually.',
    },

    // ---------------------------------------------------------------------
    // SYNCED FIELDS — written by the daily sync job, read-only in Studio
    // ---------------------------------------------------------------------
    {
      name: 'beachcomberIdentity',
      title: 'Beachcomber ID',
      type: 'string',
      group: 'synced',
      readOnly: true,
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'bcReference', title: 'Offer Title (Beachcomber)', type: 'string', group: 'synced', readOnly: true },
    { name: 'hotelName', type: 'string', group: 'synced', readOnly: true },
    { name: 'hotelDescription', type: 'text', group: 'synced', readOnly: true },
    { name: 'country', type: 'string', group: 'synced', readOnly: true },
    { name: 'includeAir', type: 'boolean', group: 'synced', readOnly: true },
    { name: 'carrierCode', type: 'string', group: 'synced', readOnly: true },
    { name: 'departFrom', type: 'string', group: 'synced', readOnly: true },
    { name: 'includeTransfers', type: 'boolean', group: 'synced', readOnly: true },
    { name: 'transferType', type: 'string', group: 'synced', readOnly: true },
    { name: 'accomProductName', type: 'string', group: 'synced', readOnly: true },
    { name: 'accomProdDescription', type: 'text', group: 'synced', readOnly: true },
    { name: 'roomAllocation', type: 'string', group: 'synced', readOnly: true },
    { name: 'roomStatus', type: 'string', group: 'synced', readOnly: true },
    { name: 'totalPax', type: 'string', group: 'synced', readOnly: true },
    { name: 'numberOfNights', type: 'string', group: 'synced', readOnly: true },
    { name: 'accSpecial1', title: 'Special Label', type: 'string', group: 'synced', readOnly: true },
    { name: 'travelFromDate', type: 'datetime', group: 'synced', readOnly: true },
    { name: 'travelToDate', type: 'datetime', group: 'synced', readOnly: true },
    { name: 'bookingFromDate', type: 'datetime', group: 'synced', readOnly: true },
    { name: 'bookingToDate', type: 'datetime', group: 'synced', readOnly: true },
    { name: 'hotelInfoAddress', type: 'url', group: 'synced', readOnly: true },
    { name: 'hotelGalleryAddress', type: 'url', group: 'synced', readOnly: true },
    {
      name: 'hotelImages',
      type: 'array',
      group: 'synced',
      readOnly: true,
      of: [
        {
          type: 'object',
          fields: [
            { name: 'orderIndex', type: 'number' },
            { name: 'dimensions', type: 'string' },
            { name: 'imageURL', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'productImages',
      type: 'array',
      group: 'synced',
      readOnly: true,
      of: [
        {
          type: 'object',
          fields: [
            { name: 'orderIndex', type: 'number' },
            { name: 'dimensions', type: 'string' },
            { name: 'imageURL', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'packages',
      title: 'Package Pricing',
      type: 'array',
      group: 'synced',
      readOnly: true,
      of: [
        {
          type: 'object',
          fields: [
            { name: 'orderIndex', type: 'number' },
            { name: 'packagePriceZARFrom', type: 'number' },
            { name: 'pricePerPersonZARFrom', type: 'number' },
            { name: 'packageDesc', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'packageInclusions',
      type: 'array',
      group: 'synced',
      readOnly: true,
      of: [{ type: 'object', fields: [{ name: 'inclusion', type: 'string' }] }],
    },
    {
      name: 'packageExclusions',
      type: 'array',
      group: 'synced',
      readOnly: true,
      of: [{ type: 'object', fields: [{ name: 'exclusion', type: 'string' }] }],
    },
    {
      name: 'termsAndConditions',
      type: 'array',
      group: 'synced',
      readOnly: true,
      of: [{ type: 'object', fields: [{ name: 'tCItem', type: 'text' }] }],
    },
    {
      name: 'beachcomberPlusFactors',
      title: 'Beachcomber Plus Factors',
      type: 'array',
      group: 'synced',
      readOnly: true,
      of: [{ type: 'object', fields: [{ name: 'plusFactor', type: 'string' }] }],
    },
    {
      name: 'lastSyncedAt',
      type: 'datetime',
      group: 'synced',
      readOnly: true,
      description: 'Timestamp of the last successful sync from Beachcomber.',
    },
  ],
  preview: {
    select: {
      customTitle: 'customTitle',
      bcReference: 'bcReference',
      hotelName: 'hotelName',
      media: 'curatedImage',
      isHidden: 'isHidden',
      featured: 'featured',
    },
    prepare({ customTitle, bcReference, hotelName, media, isHidden, featured }: any) {
      const flags = [featured ? '★ Featured' : null, isHidden ? '(Hidden)' : null]
        .filter(Boolean)
        .join(' ')
      return {
        title: customTitle || bcReference || 'Untitled special',
        subtitle: [hotelName, flags].filter(Boolean).join(' — '),
        media,
      }
    },
  },
}
