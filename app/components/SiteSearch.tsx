'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Fuse from 'fuse.js'
import type { SearchFacet, SearchIndexItem } from '@/app/lib/search/types'
import { sanityThumb } from '@/app/lib/sanityImage'

const FACETS: SearchFacet[] = ['Safari', 'Island', 'Cruise', 'Coastal', 'Rail', 'Destination', 'Journal']
const MAX_RESULTS = 40

// Module-level so the index survives across opens/closes for the whole
// session — only ever fetched once per page load, not once per open.
let indexPromise: Promise<SearchIndexItem[]> | null = null

function loadIndex(): Promise<SearchIndexItem[]> {
  if (!indexPromise) {
    indexPromise = fetch('/api/search-index')
      .then((res) => res.json())
      .catch((err) => {
        indexPromise = null // allow retry on next open instead of caching a failure forever
        throw err
      })
  }
  return indexPromise
}

const visuallyHidden: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
}

export default function SiteSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeFacet, setActiveFacet] = useState<SearchFacet | 'All'>('All')
  const [items, setItems] = useState<SearchIndexItem[] | null>(null)
  const [loadError, setLoadError] = useState(false)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function prefetch() {
    loadIndex().catch(() => {})
  }

  function openSearch() {
    setOpen(true)
    setLoadError(false)
    loadIndex()
      .then(setItems)
      .catch(() => setLoadError(true))
  }

  function closeSearch() {
    setOpen(false)
    setQuery('')
    setActiveFacet('All')
    triggerRef.current?.focus()
  }

  // Cmd/Ctrl+K opens search from anywhere on the site
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  // While open: focus the input, lock body scroll, trap Tab within the
  // panel, close on Escape.
  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    inputRef.current?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeSearch()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const fuse = useMemo(() => {
    if (!items) return null
    return new Fuse(items, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'searchKeywords', weight: 1.5 },
        { name: 'location', weight: 1 },
        { name: 'facet', weight: 0.5 },
        { name: 'excerpt', weight: 0.5 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    })
  }, [items])

  const results = useMemo(() => {
    if (!items) return []
    const matched = query.trim() && fuse ? fuse.search(query).map((r) => r.item) : items
    const filtered = activeFacet === 'All' ? matched : matched.filter((item) => item.facet === activeFacet)
    return filtered.slice(0, MAX_RESULTS)
  }, [items, query, activeFacet, fuse])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openSearch}
        onMouseEnter={prefetch}
        onFocus={prefetch}
        aria-label="Search"
        className="search-trigger"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--charcoal)',
          opacity: 0.75,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {open && createPortal(
        <div
          onClick={closeSearch}
          className="search-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(11,31,58,0.55)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            justifyContent: 'center',
            padding: '10vh 24px 24px',
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            onClick={(e) => e.stopPropagation()}
            className="search-panel"
            style={{
              background: 'var(--pearl)',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '720px',
              maxHeight: '76vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(11,31,58,0.35)',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '18px 20px',
              borderBottom: '0.5px solid var(--border)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, lodges, resorts, cruise lines..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  background: 'none',
                  fontFamily: 'var(--font-jost), sans-serif',
                  fontSize: '17px',
                  color: 'var(--charcoal)',
                }}
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--muted)',
                  fontSize: '14px',
                  fontFamily: 'var(--font-jost), sans-serif',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '4px 8px',
                }}
              >
                Esc
              </button>
            </div>

            <div className="search-facets" style={{
              display: 'flex',
              gap: '8px',
              padding: '14px 20px',
              overflowX: 'auto',
              borderBottom: '0.5px solid var(--border)',
            }}>
              {(['All', ...FACETS] as const).map((facet) => (
                <button
                  key={facet}
                  type="button"
                  onClick={() => setActiveFacet(facet)}
                  style={{
                    flexShrink: 0,
                    fontFamily: 'var(--font-jost), sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    padding: '7px 14px',
                    borderRadius: '999px',
                    border: activeFacet === facet ? '1px solid var(--teal)' : '0.5px solid var(--border)',
                    background: activeFacet === facet ? 'rgba(29,165,160,0.1)' : 'white',
                    color: activeFacet === facet ? 'var(--teal-text)' : 'var(--muted)',
                    cursor: 'pointer',
                  }}
                >
                  {facet}
                </button>
              ))}
            </div>

            <div aria-live="polite" style={visuallyHidden}>
              {items ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Loading results'}
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              {loadError && (
                <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Something went wrong loading search — please try again.
                </div>
              )}

              {!loadError && !items && (
                <div style={{ padding: '40px 24px', textAlign: 'center', color: 'var(--muted)', fontFamily: 'var(--font-jost), sans-serif' }}>
                  Loading…
                </div>
              )}

              {!loadError && items && results.length === 0 && (
                <div style={{ padding: '40px 24px', textAlign: 'center', fontFamily: 'var(--font-jost), sans-serif' }}>
                  <p style={{ color: 'var(--charcoal)', fontSize: '17px', marginBottom: '8px' }}>
                    No results for &ldquo;{query}&rdquo;
                  </p>
                  <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                    Speak to a consultant to plan your bespoke journey —{' '}
                    <Link href="/#enquire" onClick={closeSearch} style={{ color: 'var(--teal-text)' }}>
                      enquire now
                    </Link>
                  </p>
                </div>
              )}

              {!loadError && items && results.length > 0 && (
                <div>
                  {results.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      onClick={closeSearch}
                      style={{
                        display: 'flex',
                        gap: '14px',
                        alignItems: 'center',
                        padding: '12px 20px',
                        textDecoration: 'none',
                        borderBottom: '0.5px solid var(--border)',
                      }}
                    >
                      <div style={{ width: '64px', height: '48px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, background: 'var(--abyss)' }}>
                        {item.heroImage ? (
                          <img
                            src={sanityThumb(item.heroImage, 128, 96)}
                            alt={item.heroImageAlt || item.title}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--indigo) 0%, var(--cobalt) 100%)' }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontFamily: 'var(--font-jost), sans-serif',
                          fontSize: '16px',
                          fontWeight: 500,
                          color: 'var(--charcoal)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {item.title}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-jost), sans-serif',
                          fontSize: '13px',
                          color: 'var(--muted)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {item.facet}
                          {item.badge && ` · ${item.badge}`}
                          {item.location && ` · ${item.location}`}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
