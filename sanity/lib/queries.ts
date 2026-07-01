import { client } from './client'

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
      description,
      highlights,
      slug
    }
  `)
}

// Fetch all active exclusive escapes
export async function getExclusiveEscapes() {
  return client.fetch(`
    *[_type == "exclusiveEscape" && active == true] | order(_createdAt desc) {
      _id,
      title,
      description,
      "heroImage": heroImage.asset->url,
      originalPrice,
      offerPrice,
      expiryDate,
      "linkedExperience": linkedExperience->slug.current
    }
  `)
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
      publishedAt,
      slug
    }
  `)
}