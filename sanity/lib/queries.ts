import { client } from './client'

const options = { next: { revalidate: 30 } }

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
  return client.fetch(`
    *[_type == "experience" && slug.current == $slug && published == true][0] {
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
      itinerary,
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
      slug,
      seoTitle,
      seoDescription
    }
  `, { slug }, options)
}

// Fetch all experience slugs for static generation
export async function getExperienceSlugs() {
  return client.fetch(`
    *[_type == "experience" && published == true] {
      "slug": slug.current
    }
  `, {}, options)
}