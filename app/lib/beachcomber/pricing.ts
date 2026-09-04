interface PackageLike {
  pricePerPersonZARFrom: number
  packageDesc: string
}

/** Returns the lowest per-person "from" price across a special's packages, or null if none. */
export function getCheapestPackage<T extends PackageLike>(packages: T[] | undefined | null): T | null {
  if (!packages || packages.length === 0) return null
  return [...packages].sort((a, b) => a.pricePerPersonZARFrom - b.pricePerPersonZARFrom)[0]
}

export function formatZAR(amount: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(amount)
}
