'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ExperienceItem {
  _id: string
  title: string
  href: string
  category?: string
  destination?: string
  duration?: number | string
  priceFrom?: number
  heroImage?: string
  heroImageAlt?: string
}

interface WhoItem {
  _id: string
  name: string
  slug?: { current: string }
  location?: string
  region?: string
  country?: string
  starRating?: number
  priceRange?: string
  category?: string
  accommodationStyle?: string
  destinationsServed?: string[]
  heroImage?: string
  logo?: string
}

interface Props {
  accentColor: string
  experiences: ExperienceItem[]
  whoLabel?: string
  whoItems?: WhoItem[]
  whoBasePath?: string
  destinationNames?: string[]
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function CategoryTabs({
  accentColor,
  experiences,
  whoLabel,
  whoItems = [],
  whoBasePath,
  destinationNames = [],
}: Props) {
  const tabs: { key: 'experiences' | 'who' | 'where'; label: string }[] = [
    { key: 'experiences', label: 'Experiences' },
  ]
  if (whoLabel) tabs.push({ key: 'who', label: whoLabel })
  if (destinationNames.length > 0) tabs.push({ key: 'where', label: 'Destinations' })

  const [active, setActive] = useState<'experiences' | 'who' | 'where'>('experiences')

  const cardStyle: React.CSSProperties = {
    background: 'white',
    border: '0.5px solid var(--border)',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }

  return (
    <div>
      {/* ── TAB BAR ── */}
      {tabs.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: '48px',
            borderBottom: '0.5px solid var(--border)',
            paddingBottom: '0',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              style={{
                fontFamily: 'var(--font-jost), sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '14px 24px',
                color: active === tab.key ? 'var(--charcoal)' : 'var(--muted)',
                borderBottom: active === tab.key ? `2px solid ${accentColor}` : '2px solid transparent',
                marginBottom: '-1px',
                transition: 'color 0.15s ease, border-color 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* ── EXPERIENCES PANEL ── */}
      {active === 'experiences' &&
        (experiences.length > 0 ? (
          <div
            className="packages-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {experiences.map((exp) => (
              <Link key={exp._id} href={exp.href} style={{ textDecoration: 'none' }}>
                <div style={cardStyle}>
                  <div style={{ height: '220px', position: 'relative', overflow: 'hidden', background: 'var(--abyss)', flexShrink: 0 }}>
                    {exp.heroImage ? (
                      <img src={exp.heroImage} alt={exp.heroImageAlt || exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)' }} />
                    )}
                    <div
                      style={{
                        position: 'absolute', top: '12px', left: '12px',
                        fontFamily: 'var(--font-jost), sans-serif', fontSize: '11px',
                        letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
                        background: 'rgba(11,31,58,0.75)', color: 'white',
                        padding: '4px 10px', borderRadius: '2px', backdropFilter: 'blur(4px)',
                      }}
                    >
                      {exp.category}
                    </div>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '22px', color: 'var(--charcoal)', marginBottom: '6px', lineHeight: 1.3 }}>{exp.title}</div>
                    <div style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '15px', color: 'var(--muted)', marginBottom: '16px' }}>
                      {exp.duration} nights · {exp.destination}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '0.5px solid var(--border)', marginTop: 'auto' }}>
                      <div style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '18px', fontWeight: 500, color: 'var(--gold)' }}>
                        From R{exp.priceFrom?.toLocaleString()} <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 400 }}>pp</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--pearl)', background: 'var(--indigo)', padding: '9px 18px', borderRadius: '3px', fontWeight: 500 }}>
                        View details
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 40px', fontFamily: 'var(--font-cormorant), serif', fontSize: '24px', color: 'var(--muted)', border: '0.5px solid var(--border)', borderRadius: '8px' }}>
            New experiences coming soon — speak to a consultant to plan your bespoke journey.
          </div>
        ))}

      {/* ── WHO PANEL (Resorts / Cruise Lines / Safari Lodges) ── */}
      {active === 'who' &&
        (whoItems.length > 0 ? (
          <div
            className="who-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {whoItems.map((item) => {
              const image = item.heroImage || item.logo
              const subtitle =
                item.location ||
                [item.region, item.country].filter(Boolean).join(', ') ||
                item.destinationsServed?.join(', ')
              const tag = item.category || item.accommodationStyle || item.priceRange
              return (
                <Link key={item._id} href={`${whoBasePath}/${item.slug?.current}`} style={{ textDecoration: 'none' }}>
                  <div style={cardStyle}>
                    <div style={{ height: '200px', position: 'relative', overflow: 'hidden', background: 'var(--abyss)', flexShrink: 0 }}>
                      {image ? (
                        <img src={image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)' }} />
                      )}
                      {tag && (
                        <div
                          style={{
                            position: 'absolute', top: '12px', left: '12px',
                            fontFamily: 'var(--font-jost), sans-serif', fontSize: '11px',
                            letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
                            background: 'rgba(11,31,58,0.75)', color: 'white',
                            padding: '4px 10px', borderRadius: '2px', backdropFilter: 'blur(4px)',
                          }}
                        >
                          {tag}
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: '22px', color: 'var(--charcoal)', marginBottom: '6px', lineHeight: 1.3 }}>{item.name}</div>
                      {subtitle && (
                        <div style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '15px', color: 'var(--muted)', marginBottom: '16px' }}>{subtitle}</div>
                      )}
                      {item.starRating && (
                        <div style={{ fontFamily: 'var(--font-jost), sans-serif', fontSize: '14px', color: 'var(--gold)', marginTop: 'auto', paddingTop: '16px', borderTop: '0.5px solid var(--border)' }}>
                          {'★'.repeat(item.starRating)}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 40px', fontFamily: 'var(--font-cormorant), serif', fontSize: '24px', color: 'var(--muted)', border: '0.5px solid var(--border)', borderRadius: '8px' }}>
            {whoLabel} coming soon.
          </div>
        ))}

      {/* ── WHERE PANEL (Destinations) ── */}
      {active === 'where' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          {destinationNames.map((name) => (
            <Link
              key={name}
              href={`/destinations/${slugify(name)}`}
              style={{
                fontFamily: 'var(--font-jost), sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--charcoal)',
                background: 'white',
                border: '0.5px solid var(--border)',
                borderRadius: '999px',
                padding: '12px 28px',
                textDecoration: 'none',
              }}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
