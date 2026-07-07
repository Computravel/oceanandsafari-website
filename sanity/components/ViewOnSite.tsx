import React from 'react'

interface Props {
  document: any
  type: 'articles' | 'experiences'
}

const SITE_URL = 'https://oceanandsafari.com'

export function ViewOnSite({ document, type }: Props) {
  const slug = document?.displayed?.slug?.current
  const url = slug ? `${SITE_URL}/${type}/${slug}` : null
  const label = type === 'articles' ? 'article' : 'experience'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: '20px',
      fontFamily: 'sans-serif',
      background: '#F7F2EA',
      padding: '40px',
    }}>
      <div style={{
        fontFamily: 'Georgia, serif',
        fontSize: '32px',
        color: '#0B1F3A',
        letterSpacing: '0.1em',
      }}>
        O <span style={{ color: '#C9A84C' }}>and</span> S
      </div>

      {url ? (
        <React.Fragment>
          <p style={{ color: '#6B5E50', fontSize: '14px', textAlign: 'center', lineHeight: 1.6 }}>
            This {label} is live at:
          </p>
          <code style={{
            background: '#E8E0D0',
            padding: '8px 14px',
            borderRadius: '4px',
            fontSize: '13px',
            color: '#2C2420',
            wordBreak: 'break-all',
            textAlign: 'center',
          }}>{url}</code>
          
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#0B1F3A',
              color: '#C9A84C',
              padding: '14px 28px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '0.06em',
            }}
          >
            View on Ocean and Safari
          </a>
          <p style={{ color: '#9C8E7A', fontSize: '12px', textAlign: 'center' }}>
            Opens in a new tab. Changes may take up to 30 seconds to appear.
          </p>
        </React.Fragment>
      ) : (
        <p style={{
          color: '#9C8E7A',
          fontSize: '14px',
          textAlign: 'center',
          lineHeight: 1.7,
          maxWidth: '300px',
        }}>
          Generate a slug and publish this {label} to view it on the website.
        </p>
      )}
    </div>
  )
}

export function ViewArticleOnSite({ document }: { document: any }) {
  return <ViewOnSite document={document} type="articles" />
}

export function ViewExperienceOnSite({ document }: { document: any }) {
  return <ViewOnSite document={document} type="experiences" />
}
