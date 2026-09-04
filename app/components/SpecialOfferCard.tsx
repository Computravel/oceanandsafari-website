import { getCheapestPackage, formatZAR } from '@/app/lib/beachcomber/pricing'

interface CurrentSpecialPackage {
  orderIndex: number
  packagePriceZARFrom: number
  pricePerPersonZARFrom: number
  packageDesc: string
}

export interface CurrentSpecial {
  _id: string
  beachcomberIdentity: string
  title: string
  accSpecial1?: string
  travelFromDate: string
  travelToDate: string
  bookingToDate?: string
  numberOfNights: string
  totalPax: string
  includeAir: boolean
  includeTransfers: boolean
  roomStatus: string
  packages: CurrentSpecialPackage[]
  curatedImageUrl?: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
}

/**
 * Renders inline on Experience (and, later, Destination) pages — never as a
 * standalone "specials" surface. Drop this directly above the price header
 * in the existing sidebar box in app/experiences/[slug]/page.tsx.
 */
export default function SpecialOfferCard({ special }: { special: CurrentSpecial }) {
  const cheapest = getCheapestPackage(special.packages)

  return (
    <div
      style={{
        background: 'var(--abyss)',
        borderBottom: '2px solid var(--gold)',
        padding: '20px 24px',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-jost), sans-serif',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 600,
          background: 'var(--gold)',
          color: 'var(--abyss)',
          padding: '4px 10px',
          borderRadius: '2px',
          marginBottom: '12px',
        }}
      >
        {special.accSpecial1 || 'Current Special'}
      </div>

      {cheapest && (
        <>
          <div
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(247,242,234,0.55)',
              marginBottom: '4px',
            }}
          >
            Special price from
          </div>
          <div
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '34px',
              color: 'var(--gold)',
              lineHeight: 1,
              marginBottom: '4px',
            }}
          >
            {formatZAR(cheapest.pricePerPersonZARFrom)}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '13px',
              color: 'rgba(247,242,234,0.6)',
              marginBottom: '14px',
            }}
          >
            per person · {cheapest.packageDesc}
          </div>
        </>
      )}

      <div
        style={{
          fontFamily: 'var(--font-jost), sans-serif',
          fontSize: '14px',
          color: 'rgba(247,242,234,0.8)',
          lineHeight: 1.6,
        }}
      >
        Valid for travel {formatDate(special.travelFromDate)} – {formatDate(special.travelToDate)}
        {special.bookingToDate && (
          <>
            <br />
            Book by {formatDate(special.bookingToDate)}
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
        {special.includeAir && (
          <span
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '12px',
              color: 'var(--teal)',
              border: '1px solid var(--teal)',
              borderRadius: '2px',
              padding: '3px 8px',
            }}
          >
            Flights included
          </span>
        )}
        {special.includeTransfers && (
          <span
            style={{
              fontFamily: 'var(--font-jost), sans-serif',
              fontSize: '12px',
              color: 'var(--teal)',
              border: '1px solid var(--teal)',
              borderRadius: '2px',
              padding: '3px 8px',
            }}
          >
            Transfers included
          </span>
        )}
      </div>
    </div>
  )
}
