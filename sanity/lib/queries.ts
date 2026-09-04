import { client, writeClient } from './client'
import { getCheapestPackage } from '@/app/lib/beachcomber/pricing'

const options = { next: { revalidate: 10 } }

// Fetch all published experiences
export async function getExperiences() {
  return client.fetch(`
    *[_type == "experience" && published == true] | order(_createdAt desc) {
      _id,
      title,
      category,
      destination,
      country,
      duration,
      priceFrom,
      "heroImage": heroImage.asset->url,
      "heroimagealt": heroimage.alt,
      description,
      highlights,
      slug
    }
  `, {}, options)
}

// Fetch all active exclusive escapes
export async function getExclusiveEscapes() {
  return client.fetch(`
    *[_type == "exclusiveEscape" && active == true] | order(_createdAt desc) {
      _id,
      title,
      description,
      "heroImage": heroImage.asset->url,
      "heroimagealt": heroimage.alt,
      originalPrice,
      offerPrice,
      expiryDate,
      "linkedExperience": linkedExperience->slug.current
    }
  `, {}, options)
}

// Fetch all published articles
export async function getArticles() {
  return client.fetch(`
    *[_type == "article" && published == true] | order(publishedAt desc) {
      _id,
      title,
      category,
      excerpt,
      "heroImage": heroImage.asset->url,
      "heroimagealt": heroimage.alt,
      publishedAt,
      slug,
      seoTitle,
      seoDescription
    }
  `, {}, options)
}

// Fetch single experience by slug
export async function getExperience(slug: string) {
  const experience = await client.fetch(`
    *[_type == "experience" && slug.current == $slug && published == true][0] {
      _id,
      title,
      category,
      destination,
      country,
      duration,
      priceFrom,
      "heroImage": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      description,
      highlights,
      itinerary[] {
        ...,
        _type == "image" => {
          ...,
          alt,
          caption,
          "asset": asset->
        }
      },
      included,
      notIncluded,
      departureDate,
      flights,
      transfers,
      accommodation,
      shipName,
      cruiseLine,
      departureCity,
      arrivalCity,
      needVisas,
      validFrom,
      validTo,
      offerExpires,
      tripReference,
      termsAndConditions,
      "gallery": gallery[] {
        "alt": coalesce(alt, asset->altText, asset->originalFilename),
        "caption": coalesce(caption, asset->description),
        "asset": asset->
      },
      "videos": videos[] {
        _type,
        url,
        caption,
        "video": video.asset->
      },
      slug,
      seoTitle,
      seoDescription
    }
  `, { slug }, options)

  if (experience) {
    experience.currentSpecials = await getCurrentSpecialsFor(experience._id)
  }

  return experience
}

// beachcomberSpecial documents are currently invisible to anonymous/CDN reads
// (a Sanity-side quirk, confirmed even for published, non-hidden documents —
// see the code comment on getOceanIslandSpecials below), so every read of
// this type goes through the authenticated writeClient instead of the public
// client used everywhere else in this file.
async function getCurrentSpecialsFor(refId: string) {
  return writeClient.fetch(`
    *[
      _type == "beachcomberSpecial" &&
      isHidden != true &&
      references($refId)
    ] | order(featured desc, travelFromDate asc) {
      _id,
      beachcomberIdentity,
      "title": coalesce(customTitle, bcReference),
      accSpecial1,
      travelFromDate,
      travelToDate,
      bookingToDate,
      numberOfNights,
      totalPax,
      includeAir,
      includeTransfers,
      roomStatus,
      packages,
      "curatedImageUrl": curatedImage.asset->url
    }
  `, { refId })
}

// Fetch all experience slugs for static generation
export async function getExperienceSlugs() {
  return client.fetch(`
    *[_type == "experience" && published == true] {
      "slug": slug.current
    }
  `, {}, options)
}

// Fetch single article by slug
export async function getArticle(slug: string) {
  const article = await client.fetch(`
    *[_type == "article" && slug.current == $slug && published == true][0] {
      _id,
      title,
      category,
      excerpt,
      "heroImage": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      body[] {
        ...,
        _type == "image" => {
          ...,
          alt,
          caption,
          "asset": asset->
        },
        _type == "uploadedVideo" => {
          ...,
          "video": video.asset->
        }
      },
      publishedAt,
      seoTitle,
      seoDescription,
      slug,
      "relatedExperienceIds": relatedExperiences[]._ref
    }
  `, { slug }, options)

  if (article) {
    article.relatedExperiences = await resolveRelatedExperiences(article.relatedExperienceIds)
  }

  return article
}

// Resolves a list of document IDs that may point to either `experience` or
// `beachcomberSpecial` documents (the Related Experiences field on articles
// and lodges accepts both), preserving the editor's original selection
// order. Beachcomber specials use a deterministic "beachcomberSpecial.
// <identity>" _id (see sync.ts), so the target type can be inferred from the
// _id prefix without an extra round-trip. Specials are resolved via
// writeClient — see the comment above getDestinationSpecials for why.
async function resolveRelatedExperiences(ids: string[] | undefined) {
  if (!ids || ids.length === 0) return []

  const experienceIds = ids.filter(id => !id.startsWith('beachcomberSpecial.'))
  const specialIds = ids.filter(id => id.startsWith('beachcomberSpecial.'))

  const [experiences, specials] = await Promise.all([
    experienceIds.length > 0
      ? client.fetch(`
          *[_id in $ids] {
            _id, title, category, destination, duration, priceFrom,
            "heroImage": heroImage.asset->url,
            "heroImageAlt": heroImage.alt,
            slug
          }
        `, { ids: experienceIds }, options)
      : [],
    specialIds.length > 0
      ? writeClient.fetch(`
          *[_id in $ids && isHidden != true] {
            _id,
            beachcomberIdentity,
            "title": coalesce(customTitle, bcReference, hotelName),
            "destination": country,
            numberOfNights,
            "heroImage": coalesce(curatedImage.asset->url, hotelImages[0].imageURL),
            packages
          }
        `, { ids: specialIds }, options)
      : [],
  ])

  const byId = new Map<string, any>()
  for (const exp of experiences) {
    byId.set(exp._id, {
      _id: exp._id,
      title: exp.title,
      category: exp.category,
      destination: exp.destination,
      duration: exp.duration,
      priceFrom: exp.priceFrom,
      heroImage: exp.heroImage,
      heroImageAlt: exp.heroImageAlt,
      href: `/experiences/${exp.slug?.current}`,
    })
  }
  for (const special of specials) {
    byId.set(special._id, {
      _id: special._id,
      title: special.title,
      tags: ['Island', 'Exclusive Offer'],
      destination: special.destination,
      duration: special.numberOfNights,
      priceFrom: getCheapestPackage(special.packages)?.pricePerPersonZARFrom,
      heroImage: special.heroImage,
      heroImageAlt: special.title,
      href: `/ocean-islands/specials/${special.beachcomberIdentity}`,
    })
  }

  // Drop any refs that failed to resolve (e.g. unpublished or since-hidden).
  return ids.map(id => byId.get(id)).filter(Boolean)
}

// Fetch all article slugs for static generation
export async function getArticleSlugs() {
  return client.fetch(`
    *[_type == "article" && published == true] {
      "slug": slug.current
    }
  `, {}, options)
}
// Fetch experiences by category
export async function getExperiencesByCategory(category: string) {
  return client.fetch(`
    *[_type == "experience" && published == true && category == $category] | order(_createdAt desc) {
      _id,
      title,
      category,
      destination,
      country,
      duration,
      priceFrom,
      "heroImage": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      description,
      highlights,
      slug
    }
  `, { category }, options)
}

// Fetch articles by category
export async function getArticlesByCategory(category: string) {
  return client.fetch(`
    *[_type == "article" && published == true && category == $category] | order(publishedAt desc) [0..5] {
      _id,
      title,
      category,
      excerpt,
      "heroImage": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      publishedAt,
      slug
    }
  `, { category }, options)
}
// Fetch all published destinations
export async function getDestinations() {
  return client.fetch(`
    *[_type == "destination" && published == true] | order(region asc, name asc) {
      _id,
      name,
      slug,
      level,
      region,
      "parent": parent->{ name, slug },
      "heroImage": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      bestTimeToVisit,
      published
    }
  `, {}, options)
}

// Fetch single destination by slug
export async function getDestination(slug: string) {
  const destination = await client.fetch(`
    *[_type == "destination" && slug.current == $slug && published == true][0] {
      _id,
      name,
      slug,
      level,
      region,
      "parent": parent->{ name, slug },
      "heroImage": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      description,
      whyYoullLoveIt,
      highlights,
      "gallery": gallery[] {
        "alt": coalesce(alt, asset->altText, asset->originalFilename),
        "caption": coalesce(caption, asset->description),
        "asset": asset->
      },
      signatureLuxuryExperiencesIntro,
      signatureLuxuryExperiences,
      travelTips,
      practicalInformation,
      bestTimeToVisit,
      bestTimeToVisitDetail,
      perfectFor,
      combineWith,
      seoTitle,
      seoDescription,
      "children": *[_type == "destination" && references(^._id) && published == true] | order(name asc) {
        _id, name, slug, level,
        "heroImage": heroImage.asset->url,
        "heroImageAlt": heroImage.alt,
      },
      "experiences": *[_type == "experience" && published == true && references(^._id)] | order(_createdAt desc) {
        _id, title, category, destination, duration, priceFrom,
        "heroImage": heroImage.asset->url,
        "heroImageAlt": heroImage.alt,
        slug
      },
      "articles": *[_type == "article" && published == true && references(^._id)] | order(publishedAt desc) [0..5] {
        _id, title, category, excerpt,
        "heroImage": heroImage.asset->url,
        publishedAt, slug
      }
    }
  `, { slug }, options)

  if (destination) {
    const specials = await getDestinationSpecials(destination.name)
    const specialCards = specials.map((special: any) => ({
      _id: special._id,
      title: special.title,
      category: "Exclusive Offer",
      destination: destination.name,
      duration: special.numberOfNights,
      priceFrom: getCheapestPackage(special.packages)?.pricePerPersonZARFrom,
      heroImage: special.heroImage,
      heroImageAlt: special.title,
      href: `/ocean-islands/specials/${special.beachcomberIdentity}`,
    }))
    destination.experiences = [...specialCards, ...(destination.experiences || [])]
  }

  return destination
}

// Fetch all destination slugs
export async function getDestinationSlugs() {
  return client.fetch(`
    *[_type == "destination" && published == true] {
      "slug": slug.current
    }
  `, {}, options)
}
// Fetch all published lodges
export async function getLodges() {
  return client.fetch(`
    *[_type == "lodge" && published == true] | order(region asc, name asc) {
      _id,
      name,
      region,
      country,
      "heroImage": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      description,
      highlights,
      accommodationStyle,
      priceRange,
      slug
    }
  `, {}, options)
}

// Fetch single lodge by slug
export async function getLodge(slug: string) {
  return client.fetch(`
    *[_type == "lodge" && slug.current == $slug && published == true][0] {
      _id,
      name,
      region,
      country,
      "heroImage": heroImage.asset->url,
      "heroImageAlt": heroImage.alt,
      "heroVideo": heroVideo[] {
        _type,
        url,
        caption,
        "video": video.asset->
      },
      description[] {
        ...,
        _type == "image" => {
          ...,
          alt,
          caption,
          "asset": asset->
        }
      },
      highlights,
      safariExperience[] {
        ...,
        _type == "image" => {
          ...,
          alt,
          caption,
          "asset": asset->
        }
      },
      wildlifeHighlights,
      "experienceGallery": experienceGallery[] {
        "alt": coalesce(alt, asset->altText, asset->originalFilename),
        "caption": coalesce(caption, asset->description),
        "asset": asset->
      },
      parksAndReserves,
      accommodationStyle,
      "accommodationGallery": accommodationGallery[] {
        "alt": coalesce(alt, asset->altText, asset->originalFilename),
        "caption": coalesce(caption, asset->description),
        "asset": asset->
      },
      suitableFor,
      bestTimeToVisit,
      conservationAndCommunity,
      "videos": videos[] {
        _type,
        url,
        caption,
        "video": video.asset->
      },
      priceRange,
      seoTitle,
      seoDescription,
      "relatedExperiences": relatedExperiences[]-> {
        _id,
        title,
        category,
        destination,
        country,
        duration,
        priceFrom,
        "heroImage": heroImage.asset->url,
        "heroImageAlt": heroImage.alt,
        slug
      },
      callToAction,
      slug
    }
  `, { slug }, options)
}

// Fetch all lodge slugs for static generation
export async function getLodgeSlugs() {
  return client.fetch(`
    *[_type == "lodge" && published == true] {
      "slug": slug.current
    }
  `, {}, options)
}

// Fetch all published resorts
export async function getResorts() {
  return client.fetch(`
    *[_type == "resort" && published == true] | order(name asc) {
      _id,
      name,
      slug,
      location,
      starRating,
      priceRange,
      bestFor,
      "heroImage": heroImage.asset->url
    }
  `, {}, options)
}

// Fetch all published cruise lines
export async function getCruiseLines() {
  return client.fetch(`
    *[_type == "cruiseLine" && published == true] | order(name asc) {
      _id,
      name,
      slug,
      category,
      starRating,
      shipClasses,
      destinationsServed,
      "logo": logo.asset->url
    }
  `, {}, options)
}

// Fetch single resort by slug
export async function getResort(slug: string) {
  return client.fetch(`
    *[_type == "resort" && slug.current == $slug && published == true][0] {
      _id,
      name,
      slug,
      location,
      starRating,
      "heroImage": heroImage.asset->url,
      "gallery": gallery[] {
        "alt": coalesce(alt, asset->altText, asset->originalFilename),
        "caption": coalesce(caption, asset->description),
        "asset": asset->
      },
      description,
      highlights,
      bestFor,
      priceRange,
      "videos": videos[] {
        _type,
        url,
        caption,
        "video": video.asset->
      }
    }
  `, { slug }, options)
}

// Fetch all resort slugs for static generation
export async function getResortSlugs() {
  return client.fetch(`
    *[_type == "resort" && published == true] {
      "slug": slug.current
    }
  `, {}, options)
}

// Fetch single cruise line by slug
export async function getCruiseLine(slug: string) {
  // Shared sub-projection for the free-text sections that allow inline
  // images alongside rich text blocks — dereferences the image asset so the
  // frontend gets a usable URL. youtubeEmbed items pass through as-is.
  const richSection = `[] {
    ...,
    _type == "image" => {
      ...,
      alt,
      caption,
      "asset": asset->
    }
  }`
  return client.fetch(`
    *[_type == "cruiseLine" && slug.current == $slug && published == true][0] {
      _id,
      name,
      slug,
      "logo": logo.asset->url,
      description,
      highlights,
      shipClasses,
      destinationsServed,
      starRating,
      category,
      "videos": videos[] {
        _type,
        url,
        caption,
        "video": video.asset->
      },
      "section01Introduction": section01Introduction${richSection},
      "introGallery": introGallery[] {
        "alt": coalesce(alt, asset->altText, asset->originalFilename),
        "caption": coalesce(caption, asset->description),
        "asset": asset->
      },
      "section02Experience": section02Experience${richSection},
      lifeOnBoard {
        "dining": dining${richSection},
        "wellness": wellness${richSection},
        "entertainment": entertainment${richSection}
      },
      "section04Accommodation": section04Accommodation${richSection},
      "accommodationGallery": accommodationGallery[] {
        "alt": coalesce(alt, asset->altText, asset->originalFilename),
        "caption": coalesce(caption, asset->description),
        "asset": asset->
      },
      "section05Destinations": section05Destinations${richSection},
      signatureExperiencesIntro,
      signatureExperiences,
      "section07WhyChooseThem": section07WhyChooseThem${richSection},
      whoIsItFor,
      whenToGo,
      "ourPerspective": ourPerspective${richSection},
      "selectedVoyages": selectedVoyages[]-> {
        _id,
        title,
        category,
        destination,
        country,
        duration,
        priceFrom,
        "heroImage": heroImage.asset->url,
        "heroImageAlt": heroImage.alt,
        slug
      },
      atAGlance,
      seoTitle,
      seoDescription
    }
  `, { slug }, options)
}

// Fetch all cruise line slugs for static generation
export async function getCruiseLineSlugs() {
  return client.fetch(`
    *[_type == "cruiseLine" && published == true] {
      "slug": slug.current
    }
  `, {}, options)
}

// Fetch all published consultants
export async function getConsultants() {
  return client.fetch(`
    *[_type == "consultant" && published == true] | order(order asc) {
      _id,
      name,
      role,
      "photo": photo.asset->url,
      "photoAlt": photo.alt,
      bio,
      specialities,
      email,
      quote,
    }
  `, {}, options)
}

// All beachcomberSpecial reads below go through writeClient, not the public
// client: anonymous/CDN reads of this document type currently return an
// empty result set even for published, non-hidden documents (confirmed
// directly against the Sanity API — dataset ACL is public and every other
// document type reads fine anonymously, so this looks like a Sanity-side
// quirk specific to this type/project rather than anything wrong with these
// queries). Using the existing server-only write token sidesteps it; this is
// safe since these functions only ever run in server components and the
// token never reaches the browser.

// Fetch all visible Beachcomber specials whose `country` matches a
// destination's name, for merging into that Destination page's Experiences
// section. Matches on the plain-text country field rather than requiring
// editors to manually link each special via `destinationRef` — every
// current and future special for that country picks this up automatically.
export async function getDestinationSpecials(country: string) {
  return writeClient.fetch(`
    *[_type == "beachcomberSpecial" && isHidden != true && country == $country] | order(featured desc, coalesce(displayOrder, 9999) asc, travelFromDate asc) {
      _id,
      beachcomberIdentity,
      "title": coalesce(customTitle, bcReference, hotelName),
      numberOfNights,
      "heroImage": coalesce(curatedImage.asset->url, hotelImages[0].imageURL),
      packages
    }
  `, { country }, options)
}

// Fetch all visible Beachcomber specials for the Ocean Islands Experiences listing
export async function getOceanIslandSpecials() {
  return writeClient.fetch(`
    *[_type == "beachcomberSpecial" && isHidden != true] | order(featured desc, coalesce(displayOrder, 9999) asc, travelFromDate asc) {
      _id,
      beachcomberIdentity,
      "title": coalesce(customTitle, bcReference, hotelName),
      "destination": country,
      numberOfNights,
      "heroImage": coalesce(curatedImage.asset->url, hotelImages[0].imageURL),
      packages
    }
  `, {}, options)
}

// Fetch a single Beachcomber special by its Beachcomber identity, for its detail page
export async function getBeachcomberSpecial(identity: string) {
  return writeClient.fetch(`
    *[_type == "beachcomberSpecial" && beachcomberIdentity == $identity && isHidden != true][0] {
      _id,
      beachcomberIdentity,
      "title": coalesce(customTitle, bcReference, hotelName),
      "description": coalesce(customDescription, hotelDescription),
      hotelName,
      country,
      accSpecial1,
      includeAir,
      carrierCode,
      departFrom,
      includeTransfers,
      transferType,
      accomProductName,
      accomProdDescription,
      roomAllocation,
      roomStatus,
      totalPax,
      numberOfNights,
      travelFromDate,
      travelToDate,
      bookingFromDate,
      bookingToDate,
      "heroImage": coalesce(curatedImage.asset->url, hotelImages[0].imageURL),
      hotelImages,
      productImages,
      packages,
      packageInclusions,
      packageExclusions,
      termsAndConditions,
      beachcomberPlusFactors,
      lastSyncedAt
    }
  `, { identity }, options)
}

// Fetch all visible Beachcomber special identities for static generation
export async function getBeachcomberSpecialIdentities() {
  return writeClient.fetch(`
    *[_type == "beachcomberSpecial" && isHidden != true && defined(beachcomberIdentity)] {
      "identity": beachcomberIdentity
    }
  `, {}, options)
}