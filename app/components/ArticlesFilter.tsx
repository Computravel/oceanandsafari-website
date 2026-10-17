'use client'

import { useState } from 'react'
import Link from 'next/link'
import { sanityThumb } from '@/app/lib/sanityImage'

interface Article {
  _id: string
  title: string
  category?: string
  excerpt?: string
  heroImage?: string
  heroImageAlt?: string
  publishedAt?: string
  slug?: { current: string }
}

// value must match the category enum in sanity/schemaTypes/article.ts exactly
const CATEGORIES: { label: string; value: string | null }[] = [
  { label: 'All', value: null },
  { label: 'Destination Guide', value: 'destination-guide' },
  { label: 'Travel Tips', value: 'travel-tips' },
  { label: 'Client Stories', value: 'client-stories' },
  { label: 'Cruise Guides', value: 'cruise-guides' },
  { label: 'Safari Guides', value: 'safari-guides' },
  { label: 'Community & Sustainability', value: 'community-sustainability' },
  { label: 'Travel Requirements', value: 'travel-requirements' },
]

// articles is already sorted newest-first by getArticles() (order(publishedAt desc)),
// so filtering it here preserves that order within each category.
export default function ArticlesFilter({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active ? articles.filter((a) => a.category === active) : articles

  return (
    <>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            type="button"
            onClick={() => setActive(cat.value)}
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: active === cat.value ? 'var(--pearl)' : 'var(--muted)',
              background: active === cat.value ? 'var(--abyss)' : 'transparent',
              border: '0.5px solid var(--border)',
              padding: '6px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 40px', color: 'var(--muted)', fontFamily: 'var(--font-cormorant), serif', fontSize: '24px' }}>
          Articles coming soon — check back shortly.
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 40px', color: 'var(--muted)', fontFamily: 'var(--font-cormorant), serif', fontSize: '24px' }}>
          No articles in this category yet — check back shortly.
        </div>
      ) : (
        <div className="articles-grid">
          {filtered.map((article) => (
            <Link key={article._id} href={`/articles/${article.slug?.current}`} style={{ textDecoration: 'none', display: 'flex' }}>
              <div style={{ background: 'white', border: '0.5px solid var(--border)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative', background: 'var(--abyss)', flexShrink: 0 }}>
                  {article.heroImage ? (
                    <img src={sanityThumb(article.heroImage, 600, 400)} alt={article.heroImageAlt || article.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)' }} />
                  )}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', fontFamily: 'var(--font-jost), sans-serif', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500, background: 'rgba(11,31,58,0.75)', color: 'white', padding: '4px 10px', borderRadius: '2px', backdropFilter: 'blur(4px)' }}>{article.category?.replace(/-/g, ' ')}</div>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '20px', color: 'var(--charcoal)', lineHeight: 1.3, marginBottom: '10px' }}>{article.title}</h2>
                  {article.excerpt && (
                    <p style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px', flex: 1 }}>{article.excerpt}</p>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '0.5px solid var(--border)', marginTop: 'auto' }}>
                    <span style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '12px', color: 'var(--muted)' }}>
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </span>
                    <span style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '12px', color: 'var(--gold-text)', fontWeight: 500, letterSpacing: '0.06em' }}>Read more →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
