'use client'

// Floating WhatsApp click-to-chat button.
//
// This uses WhatsApp's simple "click to chat" link (wa.me) — no Meta
// Business API, no app review, no webhook setup required. It just opens
// a pre-filled chat with your WhatsApp Business number in the WhatsApp
// app (mobile) or WhatsApp Web (desktop). This is the right tool for "let
// visitors message us" — the full WhatsApp Business Platform API is only
// needed if you later want automated replies, message templates, or
// programmatic sending, which is a much bigger integration.
const WHATSAPP_NUMBER = '27611482277' // +27 61 148 2277
const DEFAULT_MESSAGE =
  "Hi Ocean & Safari, I'd like to find out more about a luxury travel experience."

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        background: '#25D366', // WhatsApp's own green — kept deliberately
        // rather than swapped for brand teal, since instant visual
        // recognition of the WhatsApp icon/color matters more here than
        // brand consistency. Happy to swap to var(--teal) if you'd
        // rather prioritize brand cohesion over recognizability.
        boxShadow: '0 4px 16px rgba(11,31,58,0.25)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="whatsapp-float-button"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="white"
        aria-hidden="true"
      >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.06c-.24.68-1.4 1.33-1.93 1.4-.49.07-1.11.1-1.79-.11a16.5 16.5 0 0 1-1.6-.6c-2.82-1.22-4.66-4.06-4.8-4.25-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.98-2.35.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.64 2.04 1.13 1.01 2.08 1.32 2.37 1.47.29.15.46.13.63-.08.17-.21.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
      </svg>
    </a>
  )
}
