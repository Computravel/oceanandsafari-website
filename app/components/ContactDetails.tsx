// Single source of truth for Ocean & Safari's public contact details, used
// by both the site-wide footer (dark theme) and the About page (light
// theme). Update values here once rather than in every place they're shown.
export const CONTACT = {
  phone: "+27 21 762 0511",
  phoneHref: "tel:+27217620511",
  whatsapp: "+27 61 148 2277",
  whatsappHref: "https://wa.me/27611482277",
  email: "info@computravel.co.za",
  addressLines: [
    "59 Waterloo Road",
    "Cnr. Waterloo Road & Wolfe Street",
    "Wynberg, Cape Town, 7800",
    "South Africa",
  ],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("59 Waterloo Road, Wynberg, Cape Town, 7800, South Africa"),
  facebook: "https://www.facebook.com/Computravel",
  instagram: "https://www.instagram.com/computravel/",
  linkedin: "https://www.linkedin.com/company/computravel-sa/",
};

function PhoneIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

function PinIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function WhatsAppIcon({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.06c-.24.68-1.4 1.33-1.93 1.4-.49.07-1.11.1-1.79-.11a16.5 16.5 0 0 1-1.6-.6c-2.82-1.22-4.66-4.06-4.8-4.25-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.98-2.35.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.64 2.04 1.13 1.01 2.08 1.32 2.37 1.47.29.15.46.13.63-.08.17-.21.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.93.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
    </svg>
  );
}

function FacebookIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

function InstagramIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

interface Props {
  /** 'dark' for the footer's abyss background, 'light' for pages on a pale background. */
  theme?: "dark" | "light";
}

export default function ContactDetails({ theme = "dark" }: Props) {
  const textColor = theme === "dark" ? "rgba(247,242,234,0.55)" : "var(--muted)";

  const rowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "var(--font-jost), sans-serif",
    fontSize: "16px",
    color: textColor,
    textDecoration: "none",
    letterSpacing: "0.04em",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <a href={CONTACT.phoneHref} style={rowStyle}>
        <PhoneIcon size={14} color={textColor} />
        {CONTACT.phone}
      </a>
      <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" style={rowStyle}>
        <WhatsAppIcon size={14} color={textColor} />
        {CONTACT.whatsapp}
      </a>
      <a href={`mailto:${CONTACT.email}`} style={rowStyle}>
        <MailIcon size={14} color={textColor} />
        {CONTACT.email}
      </a>
      <a href={CONTACT.mapsHref} target="_blank" rel="noopener noreferrer" style={{ ...rowStyle, alignItems: "flex-start", lineHeight: 1.6 }}>
        <span style={{ marginTop: "3px", flexShrink: 0 }}>
          <PinIcon size={14} color={textColor} />
        </span>
        <span>
          {CONTACT.addressLines.map((line, i) => (
            <span key={line}>
              {line}
              {i < CONTACT.addressLines.length - 1 && <br />}
            </span>
          ))}
        </span>
      </a>
      <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
        <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Ocean & Safari on Facebook" style={{ color: textColor }}>
          <FacebookIcon size={18} color={textColor} />
        </a>
        <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Ocean & Safari on Instagram" style={{ color: textColor }}>
          <InstagramIcon size={18} color={textColor} />
        </a>
        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Ocean & Safari on LinkedIn" style={{ color: textColor }}>
          <LinkedInIcon size={18} color={textColor} />
        </a>
      </div>
    </div>
  );
}
