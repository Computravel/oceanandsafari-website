import 'server-only'
import { writeClient } from '@/sanity/lib/client'
import { beachcomberFetch } from './client'
import type { GetRatesResponse, RateItem } from './types'

/** Deterministic Sanity _id so re-running the sync updates the same doc. */
function docIdFor(identity: string) {
  return `beachcomberSpecial.${identity}`
}

/**
 * Maps a Beachcomber RateItem onto ONLY the "synced" fields defined in
 * sanity/schemaTypes/beachcomberSpecial.ts. Editorial fields (customTitle,
 * featured, isHidden, etc.) are deliberately absent from this object so the
 * .patch().set() call below never touches them.
 */
function mapRateItemToSyncedFields(item: RateItem) {
  return {
    beachcomberIdentity: item.identity,
    bcReference: item.bcReference,
    hotelName: item.hotelName,
    hotelDescription: item.hotelDescription,
    country: item.country,
    includeAir: item.includeAir,
    carrierCode: item.carrierCode ?? null,
    departFrom: item.departFrom ?? null,
    includeTransfers: item.includeTransfers,
    transferType: item.transferType ?? null,
    accomProductName: item.accomProductName,
    accomProdDescription: item.accomProdDescription,
    roomAllocation: item.roomAllocation,
    roomStatus: item.roomStatus,
    totalPax: item.totalPax,
    numberOfNights: item.numberOfNights,
    accSpecial1: item.accSpecial1 ?? null,
    travelFromDate: item.travelFromDate,
    travelToDate: item.travelToDate,
    bookingFromDate: item.bookingFromDate,
    bookingToDate: item.bookingToDate,
    hotelInfoAddress: item.hotelInfoAddress,
    hotelGalleryAddress: item.hotelGalleryAddress,
    hotelImages: (item.hotelImages || []).map((img) => ({
      ...img,
      _key: `img-${img.orderIndex}`,
      _type: 'object' as const,
    })),
    productImages: (item.productImages || []).map((img) => ({
      ...img,
      _key: `pimg-${img.orderIndex}`,
      _type: 'object' as const,
    })),
    packages: (item.packages || []).map((p) => ({
      ...p,
      _key: `pkg-${p.orderIndex}`,
      _type: 'object' as const,
    })),
    packageInclusions: (item.packageInclusions || []).map((p, i) => ({
      ...p,
      _key: `inc-${i}`,
      _type: 'object' as const,
    })),
    packageExclusions: (item.packageExclusions || []).map((p, i) => ({
      ...p,
      _key: `exc-${i}`,
      _type: 'object' as const,
    })),
    termsAndConditions: (item.termsAndConditions || []).map((p, i) => ({
      ...p,
      _key: `tc-${i}`,
      _type: 'object' as const,
    })),
    beachcomberPlusFactors: (item.beachcomberPlusFactors || []).map((p, i) => ({
      ...p,
      _key: `pf-${i}`,
      _type: 'object' as const,
    })),
    lastSyncedAt: new Date().toISOString(),
    // If a hidden special reappears in the feed, un-hide it automatically.
    isHidden: false,
  }
}

export interface SyncResult {
  lastRatesUpdate: string
  upserted: number
  hidden: number
  errors: string[]
}

export async function syncBeachcomberRates(): Promise<SyncResult> {
  const data = await beachcomberFetch<GetRatesResponse>('/getRates', {})
  const items = data.beachcomberRates || []

  const result: SyncResult = {
    lastRatesUpdate: data.lastRatesUpdate,
    upserted: 0,
    hidden: 0,
    errors: [],
  }

  const seenIds: string[] = []

  for (const item of items) {
    const id = docIdFor(item.identity)
    seenIds.push(id)
    try {
      // Create the doc with sane editorial defaults if it doesn't exist yet.
      await writeClient.createIfNotExists({
        _id: id,
        _type: 'beachcomberSpecial',
        featured: false,
        ...mapRateItemToSyncedFields(item),
      })
      // Then patch ONLY the synced fields — editorial fields already on the
      // document (customTitle, featured, displayOrder, etc.) are untouched.
      await writeClient
        .patch(id)
        .set(mapRateItemToSyncedFields(item))
        .commit({ autoGenerateArrayKeys: true })
      result.upserted += 1
    } catch (err) {
      result.errors.push(`${item.identity}: ${(err as Error).message}`)
    }
  }

  // Anything previously synced but no longer in today's feed gets hidden,
  // not deleted — Lindsay may still reference it in a legacy quote/email.
  if (seenIds.length > 0) {
    const stale = await writeClient.fetch<{ _id: string }[]>(
      `*[_type == "beachcomberSpecial" && !(_id in $seenIds) && isHidden != true]{ _id }`,
      { seenIds }
    )
    for (const doc of stale) {
      await writeClient.patch(doc._id).set({ isHidden: true }).commit()
      result.hidden += 1
    }
  }

  return result
}
