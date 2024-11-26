import { PrismaClient } from '@prisma/client'

import { default as createServiceError } from '../Errors/errors'
import googleMapsClient from '../config/googleClient'
import { TDrivers, TDriversPrisma } from '../types/drivers'
import { TRideData, TRideEstimateResponse } from '../types/rides'

const prisma = new PrismaClient()

const rideFindAll = async (): Promise<TDriversPrisma> => {
  try {
    const drivers = await prisma.driver.findMany({
      include: {
        review: {
          select: {
            rating: true,
            comment: true,
          },
        },
      },
    })

    return drivers.map((driver) => ({
      ...driver,
      review: {
        rating: driver.review[0].rating,
        comment: driver.review[0].comment,
      },
    }))
  } catch (error) {
    throw createServiceError('DRIVER_NOT_FOUND', 'Motoristas não encontrado')
  }
}

const calculateDrivers = async (distance: number): Promise<TDrivers | []> => {
  try {
    const drivers: TDriversPrisma = await rideFindAll()

    return drivers
      .filter((driver) => distance >= driver.minKm)
      .map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: parseFloat((distance * driver.ratePerKm).toFixed(2)),
      }))
      .sort((a, b) => a.value - b.value)
  } catch {
    throw createServiceError('DRIVER_NOT_FOUND', 'Motoristas não encontrado')
  }
}

const formatResponseRideEstimate = (rideData: TRideData): TRideEstimateResponse => {
  return {
    origin: {
      latitude: rideData.startLocation.lat,
      longitude: rideData.startLocation.lng,
    },
    destination: {
      latitude: rideData.endLocation.lat,
      longitude: rideData.endLocation.lng,
    },
    distance: parseFloat(rideData.distanceKm.toFixed(2)),
    duration: rideData.duration,
    options: rideData.options,
    routeResponse: rideData.routeReponse,
  }
}

export const calculateRideEstimate = async (
  origin: string,
  destination: string
): Promise<TRideEstimateResponse> => {
  try {
    const { data } = await googleMapsClient.directions({
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_MAPS_API_KEY!,
      },
    })

    const route = data.routes[0]
    const distanceKm = route.legs[0].distance.value / 1000

    const drivers = await calculateDrivers(distanceKm)

    const rideData: TRideData = {
      distanceMeters: route.legs[0].distance.value,
      distanceKm,
      duration: route.legs[0].duration.text,
      startLocation: route.legs[0].start_location,
      options: drivers,
      endLocation: route.legs[0].end_location,
      routeReponse: data,
    }

    const formatedResponseRide: TRideEstimateResponse =
      formatResponseRideEstimate(rideData)

    return formatedResponseRide
  } catch (error) {
    throw createServiceError(
      'INVALID_ROUTE',
      'Erro ao calcular a rota. Verifique os dados fornecidos.'
    )
  }
}
