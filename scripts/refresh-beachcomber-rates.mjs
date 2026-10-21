#!/usr/bin/env node
// Manually refreshes priceFrom/validFrom/validTo/offerExpires on the 8 Beachcomber
// `experience` documents from Beachcomber's live /getRates feed. Run this by hand
// whenever rates or travel dates need updating — it is NOT wired to a cron.
//
// It touches ONLY those four fields. Title, description, images, highlights and
// everything else you've edited in Studio are left exactly as they are.
//
// Usage:
//   node scripts/refresh-beachcomber-rates.mjs           (apply changes)
//   node scripts/refresh-beachcomber-rates.mjs --dry-run  (preview only)

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const DRY_RUN = process.argv.includes('--dry-run')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-07-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

// Maps each experience's slug to the substring that identifies it in
// Beachcomber's `hotelName` field (e.g. "Canonnier Beachcomber Golf Resort &
// Spa - 4 star"). Update this list if a property is renamed or a new
// Beachcomber property is converted to an experience doc.
const PROPERTY_MAP = [
  { slug: 'canonnier-beachcomber-5-night-mauritius-escape', match: 'Canonnier Beachcomber' },
  { slug: 'dinarobin-beachcomber-5-night-luxury-mauritius-escape', match: 'Dinarobin Beachcomber' },
  { slug: 'mauricia-beachcomber-5-night-grand-bay-escape', match: 'Mauricia Beachcomber' },
  { slug: 'paradis-beachcomber-5-night-le-morne-golf-escape', match: 'Paradis Beachcomber' },
  { slug: 'royal-palm-beachcomber-5-night-ultra-luxury-mauritius-escape', match: 'Royal Palm Beachcomber' },
  { slug: 'shandrani-beachcomber-5-night-marine-park-escape', match: 'Shandrani Beachcomber' },
  { slug: 'trou-aux-biches-beachcomber-5-night-luxury-golf-escape', match: 'Trou aux Biches Beachcomber' },
  { slug: 'victoria-beachcomber-5-night-family-beach-escape', match: 'Victoria Beachcomber' },
]

async function fetchLiveRates() {
  const apiKey = process.env.BEACHCOMBER_API_KEY
  if (!apiKey) {
    throw new Error('BEACHCOMBER_API_KEY is not set in .env.local')
  }

  const response = await fetch('https://api.beachcomberonline.co.za/getRates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', BeachcomberKey: apiKey },
    body: JSON.stringify({}),
  })

  const json = await response.json()
  if (!response.ok || json.errorMsg) {
    throw new Error(json.errorMsg || json.message || `Beachcomber /getRates failed (${response.status})`)
  }

  return json.beachcomberRates || []
}

function toDateOnly(isoString) {
  return isoString ? isoString.slice(0, 10) : undefined
}

function summarizeByHotel(rateItems) {
  const byHotel = new Map()
  for (const item of rateItems) {
    if (!byHotel.has(item.hotelName)) byHotel.set(item.hotelName, [])
    byHotel.get(item.hotelName).push(item)
  }

  const summaries = new Map()
  for (const [hotelName, items] of byHotel) {
    const prices = items.flatMap((d) => (d.packages || []).map((p) => p.pricePerPersonZARFrom))
    const travelFrom = items.map((d) => d.travelFromDate).sort()[0]
    const travelTo = items.map((d) => d.travelToDate).sort().reverse()[0]
    const bookBy = items.map((d) => d.bookingToDate).filter(Boolean).sort().reverse()[0]
    summaries.set(hotelName, {
      cheapestPrice: Math.min(...prices),
      validFrom: toDateOnly(travelFrom),
      validTo: toDateOnly(travelTo),
      offerExpires: toDateOnly(bookBy),
    })
  }
  return summaries
}

async function run() {
  console.log(DRY_RUN ? 'Dry run — no changes will be written.\n' : 'Fetching live rates from Beachcomber...\n')

  const rateItems = await fetchLiveRates()
  const summaries = summarizeByHotel(rateItems)

  for (const { slug, match } of PROPERTY_MAP) {
    const hotelName = [...summaries.keys()].find((name) => name.includes(match))
    if (!hotelName) {
      console.log(`SKIP  ${slug} — no live rate found for "${match}" (property may be temporarily off the Beachcomber feed)`)
      continue
    }

    const summary = summaries.get(hotelName)
    const doc = await client.fetch(
      `*[_type == "experience" && slug.current == $slug][0]{_id, priceFrom, validFrom, validTo, offerExpires}`,
      { slug }
    )
    if (!doc) {
      console.log(`SKIP  ${slug} — no matching experience document found in Sanity`)
      continue
    }

    const changed =
      doc.priceFrom !== summary.cheapestPrice ||
      doc.validFrom !== summary.validFrom ||
      doc.validTo !== summary.validTo ||
      doc.offerExpires !== summary.offerExpires

    if (!changed) {
      console.log(`OK    ${slug} — already up to date (R${summary.cheapestPrice}pps)`)
      continue
    }

    console.log(
      `${DRY_RUN ? 'WOULD UPDATE' : 'UPDATE'}  ${slug}\n` +
        `   priceFrom:    R${doc.priceFrom} -> R${summary.cheapestPrice}\n` +
        `   validFrom:    ${doc.validFrom} -> ${summary.validFrom}\n` +
        `   validTo:      ${doc.validTo} -> ${summary.validTo}\n` +
        `   offerExpires: ${doc.offerExpires} -> ${summary.offerExpires}`
    )

    if (!DRY_RUN) {
      await client
        .patch(doc._id)
        .set({
          priceFrom: summary.cheapestPrice,
          validFrom: summary.validFrom,
          validTo: summary.validTo,
          offerExpires: summary.offerExpires,
        })
        .commit()
    }
  }

  console.log('\nDone.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
