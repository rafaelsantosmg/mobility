export type TReview = {
  rating: number
  comment: string
}

export type TReviews = Array<TReview>

export type TDriverPrisma = {
  id: number
  name: string
  description: string
  vehicle: string
  ratePerKm: number
  minKm: number
  review: TReview
}

export type TDriversPrisma = Array<TDriverPrisma>

export type TDriver = {
  id: number
  name: string
  description: string
  vehicle: string
  review: TReview
  ratePerKm?: number
  minKm?: number
  value?: number
}

export type TDrivers = Array<TDriver>
