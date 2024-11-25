export type Review = {
  rating: number
  comment: string
}

export interface Driver {
  id: number
  name: string
  description: string
  vehicle: string
  review: Review
  rate_per_km: number
  min_km: number
}
