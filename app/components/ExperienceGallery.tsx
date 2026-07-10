"use client";

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
  if (!gallery || gallery.length === 0) return null;

  return (
    <div style={{ marginBottom: "48px" }}>
      <h2 style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "32px",
        color: "var(--charcoal)",
        marginBottom: "20px",
      }}>Gallery</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
      }}>
        {gallery.map((image, i) => {
          const imageUrl = getImageUrl(image);
          if (!imageUrl) return null;
          return (
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
              onClick={() => window.open(imageUrl, '_blank')}
            >
              <img
                src={imageUrl}
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
            </div>
          );
        })}
      </div>
      <p style={{
        fontFamily: "var(--font-jost), sans-serif",
        fontSize: "12px",
        color: "var(--muted)",
        marginTop: "10px",
        textAlign: "center",
        fontStyle: "italic",
      }}>Click any image to view full size</p>
    </div>
  );
}