// Types for the Beachcomber Booking API.
// Reference: Beachcomber Booking API — Direct Integration Guide (20 Apr 2026)

export interface BeachcomberImage {
  orderIndex: number
  dimensions: string
  imageURL: string
}

export interface BeachcomberPackage {
  orderIndex: number
  objectRefName?: string // present on /getQuote roomOptions[].packages, absent on /getRates
  packagePriceZARFrom: number
  pricePerPersonZARFrom: number
  packageDesc: string
}

export interface BeachcomberInclusion {
  inclusion: string
}

export interface BeachcomberExclusion {
  exclusion: string
}

export interface BeachcomberTerm {
  tCItem: string
}

export interface BeachcomberPlusFactor {
  plusFactor: string
}

// ---------------------------------------------------------------------------
// /getRates
// ---------------------------------------------------------------------------

export interface RateItem {
  identity: string
  bcReference: string
  bookingFromDate: string
  bookingToDate: string
  travelFromDate: string
  travelToDate: string
  country: string
  includeAir: boolean
  carrierCode?: string
  departFrom?: string
  hotelName: string
  hotelDescription: string
  hotelImages: BeachcomberImage[]
  hotelInfoAddress: string
  hotelGalleryAddress: string
  includeTransfers: boolean
  transferType?: string
  accomProductName: string
  accomProdDescription: string
  checkInDate: string
  checkOutDate: string
  importantNotes?: string
  roomAllocation: string
  roomStatus: string
  totalPax: string
  numberOfNights: string
  productImages: BeachcomberImage[]
  accSpecial1?: string
  packages: BeachcomberPackage[]
  packageInclusions: BeachcomberInclusion[]
  packageExclusions: BeachcomberExclusion[]
  termsAndConditions: BeachcomberTerm[]
  beachcomberPlusFactors: BeachcomberPlusFactor[]
}

export interface GetRatesResponse {
  lastRatesUpdate: string
  beachcomberRates: RateItem[]
}

export interface GetLastRatesUpdateResponse {
  lastRatesUpdate: string
}

// ---------------------------------------------------------------------------
// /getToken (kept here for the later booking-flow phase)
// ---------------------------------------------------------------------------

export interface GetTokenResponse {
  userToken: string
  expires: string
}

// ---------------------------------------------------------------------------
// Generic error shape the API may return alongside a 2xx or non-2xx status
// ---------------------------------------------------------------------------

export interface BeachcomberErrorBody {
  errorMsg?: string
  message?: string
}
