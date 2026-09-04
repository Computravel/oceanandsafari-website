import 'server-only'
import type { BeachcomberErrorBody } from './types'

const BASE_URL = 'https://api.beachcomberonline.co.za'

export class BeachcomberApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'BeachcomberApiError'
    this.status = status
  }
}

interface BeachcomberFetchOptions {
  /**
   * Only used for /getToken, where agent credentials are sent as
   * `Authorization: Basic <base64(username:password)>`.
   */
  authHeader?: string
}

/**
 * Server-only wrapper around the Beachcomber JSON-over-HTTPS API.
 *
 * Implements the error model described in the integration guide:
 *  1. Non-2xx HTTP status -> treat as error, try to read errorMsg/message.
 *  2. 2xx with a non-empty `errorMsg` in the body -> also treat as error.
 *  3. Network/transport errors -> wrapped as BeachcomberApiError.
 *
 * NEVER import this file from a Client Component — it reads
 * process.env.BEACHCOMBER_API_KEY directly and the `server-only` import
 * above will throw a build error if it's accidentally bundled client-side.
 */
export async function beachcomberFetch<T>(
  path: string,
  body: Record<string, unknown> = {},
  options: BeachcomberFetchOptions = {}
): Promise<T> {
  const apiKey = process.env.BEACHCOMBER_API_KEY
  if (!apiKey) {
    throw new BeachcomberApiError('BEACHCOMBER_API_KEY is not configured in this environment')
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    BeachcomberKey: apiKey,
  }
  if (options.authHeader) {
    headers.Authorization = options.authHeader
  }

  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      // Booking-flow calls (quote, passengers, booking) must never be cached.
      // The /getRates route wraps this with its own Next.js revalidate logic.
      cache: 'no-store',
    })
  } catch (err) {
    throw new BeachcomberApiError(
      `Network error calling Beachcomber ${path}: ${(err as Error).message}`
    )
  }

  let json: unknown = null
  try {
    json = await response.json()
  } catch {
    // No body, or non-JSON body — leave json as null.
  }

  if (!response.ok) {
    const errorBody = json as BeachcomberErrorBody | null
    const message =
      errorBody?.errorMsg || errorBody?.message || `Beachcomber ${path} failed (${response.status})`
    throw new BeachcomberApiError(message, response.status)
  }

  const errorBody = json as BeachcomberErrorBody | null
  if (errorBody?.errorMsg && errorBody.errorMsg.trim() !== '') {
    throw new BeachcomberApiError(errorBody.errorMsg, response.status)
  }

  return json as T
}

export { BASE_URL }
