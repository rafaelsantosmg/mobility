import googleMapsClient from '../config/googleClient'
import ServiceError from '../types/errors'
import { calculateDrivers } from '../utils/calculateDrivers'

export const calculateRideEstimate = async (
  origin: string,
  destination: string
) => {
  try {
    const response = await googleMapsClient.directions({
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    })

    const routeData = response.data
    if (!routeData.routes || routeData.routes.length === 0) {
      throw new Error('Rota não encontrada.')
    }

    const route = routeData.routes[0]
    const distanceMeters = route.legs[0].distance.value
    const distanceKm = distanceMeters / 1000
    const duration = route.legs[0].duration.text
    const startLocation = route.legs[0].start_location
    const endLocation = route.legs[0].end_location

    const drivers = await calculateDrivers(distanceKm)

    return {
      origin: { latitude: startLocation.lat, longitude: startLocation.lng },
      destination: { latitude: endLocation.lat, longitude: endLocation.lng },
      distance: parseFloat(distanceKm.toFixed(2)),
      duration,
      options: drivers,
      routeResponse: routeData,
    }
  } catch (error) {
    throw new ServiceError(
      'INVALID_DATA',
      'Erro ao calcular a rota. Verifique os dados fornecidos.'
    )
  }
}
