import React from 'react'

export function linkMark({ value, children }: any) {
  const href = value && value.href
  if (!href) return React.createElement(React.Fragment, null, children)
  return React.createElement('a', {
    href,
    target: '_blank',
    rel: 'noopener noreferrer',
    style: { color: 'var(--teal)', textDecoration: 'underline' },
  }, children)
}

export const portableTextComponents = {
  block: {
    normal: ({children}: any) => React.createElement('p', { style: { marginBottom: "16px", lineHeight: 1.85 } }, children),
    h2: ({children}: any) => React.createElement('h2', { style: { fontFamily: "var(--font-cormorant), serif", fontSize: "28px", color: "var(--charcoal)", fontWeight: 400, marginTop: "36px", marginBottom: "14px" } }, children),
    h3: ({children}: any) => React.createElement('h3', { style: { fontFamily: "var(--font-cormorant), serif", fontSize: "22px", color: "var(--charcoal)", fontWeight: 400, marginTop: "28px", marginBottom: "10px" } }, children),
  },
  list: {
    bullet: ({children}: any) => React.createElement('ul', { style: { paddingLeft: "0", margin: "8px 0", listStyle: "none" } }, children),
    number: ({children}: any) => React.createElement('ol', { style: { paddingLeft: "20px", margin: "8px 0" } }, children),
  },
  listItem: {
    bullet: ({children}: any) => React.createElement('li', { style: { marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "12px", lineHeight: 1.75 } },
      React.createElement('span', { style: { color: "var(--teal)", flexShrink: 0, marginTop: "4px" } }, '◆'),
      React.createElement('span', null, children)
    ),
    number: ({children}: any) => React.createElement('li', { style: { marginBottom: "10px", lineHeight: 1.75 } }, children),
  },
  marks: {
    strong: ({children}: any) => React.createElement('strong', { style: { fontWeight: 600, color: "var(--abyss)" } }, children),
    em: ({children}: any) => React.createElement('em', { style: { fontStyle: "italic" } }, children),
    link: linkMark,
  },
}