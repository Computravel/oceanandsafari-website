import { NextResponse } from 'next/server';
import { getSearchIndex } from '@/sanity/lib/queries';

// Matches the ISR cadence every other page/query in this codebase already
// uses (see `options` in sanity/lib/queries.ts) — search results can lag
// live content by up to ~10s, same staleness every other page tolerates.
export const revalidate = 10;

export async function GET() {
  const items = await getSearchIndex();
  return NextResponse.json(items);
}
