import { TDrivers } from './drivers'

export type TRideReview = {
  id: number
  comment: string
  cutomerId: number
  driverId: number
  rating: number
  createdAt: string
}

export type TRideOption = {
  id: number
  name: string
  description: string
  value: number
  vehicle: string
}

export type TRideOptions = Array<TRideOption>

export type TRideLatLng = {
  latitude: number
  longitude: number
}

export type TRideEstimateResponse = {
  origin: TRideLatLng
  destination: TRideLatLng
  distance: number
  duration: string
  options: TDrivers
  routeResponse: any
}

export type TRideData = {
  distanceMeters: number
  distanceKm: number
  duration: string
  startLocation: {
    lat: number
    lng: number
  }
  options: TDrivers
  endLocation: {
    lat: number
    lng: number
  }
  routeReponse?: any
}
