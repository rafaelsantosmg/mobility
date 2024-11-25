import { Driver } from '../types/drivers'
import { DRIVERS } from './drivers'

export const calculateDrivers = (distance: any) => {
  return DRIVERS.map((driver: Driver) => ({
    id: driver.id,
    name: driver.name,
    description: driver.description,
    vehicle: driver.vehicle,
    review: driver.review,
    value: parseFloat((distance * driver.rate_per_km).toFixed(2)),
  })).sort((a, b) => a.value - b.value)
}
