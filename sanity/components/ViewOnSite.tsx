import React from 'react'

const SITE_URL = 'https://oceanandsafari.com'

function ViewOnSite(props: { document: any; type: 'articles' | 'experiences' | 'destinations' | 'safari-lodges' | 'ocean-islands/resorts' | 'luxury-cruises/cruise-lines' }) {
  const slug = props.document?.displayed?.slug?.current
  const url = slug ? SITE_URL + '/' + props.type + '/' + slug : null
  const label = props.type === 'articles' ? 'article'
    : props.type === 'destinations' ? 'destination'
    : props.type === 'safari-lodges' ? 'safari lodge'
    : props.type === 'ocean-islands/resorts' ? 'resort'
    : props.type === 'luxury-cruises/cruise-lines' ? 'cruise line'
    : 'experience'

  const containerStyle = {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    height: '100%',
    gap: '20px',
    fontFamily: 'sans-serif',
    background: '#F7F2EA',
    padding: '40px',
  }

  const titleStyle = {
    fontFamily: 'Georgia, serif',
    fontSize: '32px',
    color: '#0B1F3A',
    letterSpacing: '0.1em',
  }

  const linkStyle = {
    background: '#0B1F3A',
    color: '#C9A84C',
    padding: '14px 28px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.06em',
  }

  const codeStyle = {
    background: '#E8E0D0',
    padding: '8px 14px',
    borderRadius: '4px',
    fontSize: '13px',
    color: '#2C2420',
    wordBreak: 'break-all' as const,
    textAlign: 'center' as const,
  }

  if (url) {
    return React.createElement(
      'div', { style: containerStyle },
      React.createElement('div', { style: titleStyle }, 'O & S'),
      React.createElement('p', { style: { color: '#6B5E50', fontSize: '14px', textAlign: 'center' } },
        'This ' + label + ' is live at:'
      ),
      React.createElement('code', { style: codeStyle }, url),
      React.createElement('a', {
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
        style: linkStyle,
      }, 'View on Ocean and Safari'),
      React.createElement('p', { style: { color: '#9C8E7A', fontSize: '12px', textAlign: 'center' } },
        'Opens in a new tab. Changes may take up to 30 seconds to appear.'
      )
    )
  }

  return React.createElement(
    'div', { style: containerStyle },
    React.createElement('div', { style: titleStyle }, 'O & S'),
    React.createElement('p', {
      style: { color: '#9C8E7A', fontSize: '14px', textAlign: 'center', lineHeight: 1.7, maxWidth: '300px' }
    }, 'Generate a slug and publish this ' + label + ' to view it on the website.')
  )
}

export function ViewArticleOnSite(props: { document: any }) {
  return ViewOnSite({ document: props.document, type: 'articles' })
}

export function ViewExperienceOnSite(props: { document: any }) {
  return ViewOnSite({ document: props.document, type: 'experiences' })
}
export function ViewDestinationOnSite(props: { document: any }) {
  return ViewOnSite({ document: props.document, type: 'destinations' })
}
export function ViewLodgeOnSite(props: { document: any }) {
  return ViewOnSite({ document: props.document, type: 'safari-lodges' })
}
export function ViewResortOnSite(props: { document: any }) {
  return ViewOnSite({ document: props.document, type: 'ocean-islands/resorts' })
}
export function ViewCruiseLineOnSite(props: { document: any }) {
  return ViewOnSite({ document: props.document, type: 'luxury-cruises/cruise-lines' })
}