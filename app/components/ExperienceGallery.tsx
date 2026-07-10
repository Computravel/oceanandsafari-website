"use client";

import { useState } from "react";

interface GalleryImage {
  asset?: { url?: string; _ref?: string };
  alt?: string;
  caption?: string;
}

interface Props {
  gallery: GalleryImage[];
}

function getImageUrl(image: GalleryImage): string | null {
  const url = image.asset?.url;
  if (url) return url;
  const ref = image.asset?._ref || '';
  if (ref) {
    return `https://cdn.sanity.io/images/ibvmvzmo/production/${ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`;
  }
  return null;
}

export default function ExperienceGallery({ gallery }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  const images = gallery.map(img => ({ ...img, url: getImageUrl(img) })).filter(img => img.url);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : null);
  const next = () => setLightboxIndex(i => i !== null ? (i + 1) % images.length : null);

  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <h2 style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "32px",
          color: "var(--charcoal)",
          marginBottom: "20px",
        }}>Gallery</h2>
        <div className="gallery-grid">
          {images.map((image, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                paddingBottom: "66%",
                overflow: "hidden",
                borderRadius: "6px",
                background: "var(--abyss)",
                cursor: "pointer",
              }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={image.url!}
                alt={image.alt || ""}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"}
                onMouseLeave={e => (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"}
              />
              {image.caption && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(11,31,58,0.8), transparent)",
                  padding: "20px 12px 10px",
                  fontFamily: "var(--font-jost), sans-serif",
                  fontSize: "12px",
                  color: "rgba(247,242,234,0.9)",
                  fontStyle: "italic",
                }}>{image.caption}</div>
              )}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(11,31,58,0)",
                transition: "background 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(11,31,58,0.2)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(11,31,58,0)"}
              >
                <span style={{
                  color: "white",
                  fontSize: "24px",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
                }}>⊕</span>
              </div>
            </div>
          ))}
        </div>
        <p style={{
          fontFamily: "var(--font-jost), sans-serif",
          fontSize: "12px",
          color: "var(--muted)",
          marginTop: "10px",
          textAlign: "center",
          fontStyle: "italic",
        }}>Click any image to view full size · Swipe to explore on mobile</p>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(11,31,58,0.95)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              fontSize: "28px",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1001,
            }}
          >✕</button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              style={{
                position: "absolute",
                left: "24px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                fontSize: "24px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1001,
              }}
            >←</button>
          )}

          {/* Image */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img
              src={images[lightboxIndex].url!}
              alt={images[lightboxIndex].alt || ""}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "6px",
              }}
            />
            {images[lightboxIndex].caption && (
              <p style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontSize: "14px",
                color: "rgba(247,242,234,0.7)",
                textAlign: "center",
                fontStyle: "italic",
              }}>{images[lightboxIndex].caption}</p>
            )}
            <p style={{
              fontFamily: "var(--font-jost), sans-serif",
              fontSize: "12px",
              color: "rgba(247,242,234,0.4)",
            }}>{lightboxIndex + 1} / {images.length}</p>
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              style={{
                position: "absolute",
                right: "24px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                fontSize: "24px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1001,
              }}
            >→</button>
          )}
        </div>
      )}
    </>
  );
}