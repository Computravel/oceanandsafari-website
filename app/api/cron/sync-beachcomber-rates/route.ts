import { NextResponse } from 'next/server'
import { syncBeachcomberRates } from '@/app/lib/beachcomber/sync'

// Vercel Cron hits this route with `Authorization: Bearer ${CRON_SECRET}`
// automatically when CRON_SECRET is set as an env var and referenced in
// vercel.json.
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await syncBeachcomberRates()
    return NextResponse.json({ success: true, ...result })
  } catch (err) {
    console.error('Beachcomber rates sync failed:', err)
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    )
  }
}
