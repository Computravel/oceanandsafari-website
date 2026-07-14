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
  return client.fetch(`
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
        }
      },
      publishedAt,
      seoTitle,
      seoDescription,
      slug
    }
  `, { slug }, options)
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
  return client.fetch(`
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
      highlights,
      bestTimeToVisit,
      travelTips,
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
}

// Fetch all destination slugs
export async function getDestinationSlugs() {
  return client.fetch(`
    *[_type == "destination" && published == true] {
      "slug": slug.current
    }
  `, {}, options)
}