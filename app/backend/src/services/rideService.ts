import { PrismaClient } from '@prisma/client'
import { Request } from 'express'

import createServiceError, { isServiceError } from '../Errors/errors'
import googleMapsClient from '../config/googleClient'
import { TDrivers, TDriversPrisma } from '../types/drivers'
import {
  TBodyRideEstimate,
  TBodyRideHistory,
  TRideData,
  TRideEstimateResponse,
} from '../types/rides'

const prisma = new PrismaClient()

function RideService() {
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
      throw createServiceError('DRIVER_NOT_FOUND', 'Motoristas não encontrado', 404)
    }
  }

  const findDriverId = async (driverId: string) => {
    try {
      const driver = await prisma.driver.findUnique({
        where: {
          id: parseInt(driverId, 10),
        },
      })

      return driver
    } catch (error) {
      return null
    }
  }

  const rideCreateHistory = async (body: TBodyRideHistory) => {
    const { customer_id, origin, destination, distance, duration, driver, value } = body

    const findDriver = await findDriverId(driver.id)

    if (!findDriver) {
      throw createServiceError('DRIVER_NOT_FOUND', 'Motorista não encontrado', 404)
    }

    if (distance < findDriver.minKm) {
      throw createServiceError(
        'INVALID_DISTANCE',
        'Quilometragem inválida para o motorista',
        406
      )
    }

    try {
      await prisma.ride.create({
        data: {
          customerId: parseInt(customer_id, 10),
          origin,
          destination,
          distance,
          duration,
          driverId: parseInt(driver.id, 10),
          value,
        },
      })

      return { success: true }
    } catch (error) {
      if (isServiceError(error)) {
        throw createServiceError(error.error_code, error.error_description, error.status)
      } else {
        throw createServiceError('RIDE_CREATE_ERROR', 'Erro ao confirmar viagem', 404)
      }
    }
  }

  const rideGetHistory = async (req: Request) => {
    try {
      const { customer_id } = req.params
      const { driver_id } = req.query

      if (driver_id) {
        const findDriver = await findDriverId(driver_id as string)
        if (!findDriver) {
          throw createServiceError('INVALID_DRIVER', 'Motorista invalido', 404)
        }
      }

      const query = {
        where: {
          customerId: parseInt(customer_id, 10),
          ...(driver_id && { driverId: parseInt(driver_id as string, 10) }),
        },
        include: {
          driver: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }

      const rides = await prisma.ride.findMany(query)

      if (rides.length === 0) {
        throw createServiceError('NO_RIDES_FOUND', 'Nenhum registro encontrado', 404)
      }

      return rides
    } catch (error) {
      if (isServiceError(error)) {
        throw createServiceError(error.error_code, error.error_description, error.status)
      }
    }
  }

  const calculateDrivers = async (distance: number): Promise<TDrivers | []> => {
    try {
      const drivers: TDriversPrisma = await rideFindAll()

      return drivers
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
      throw createServiceError('DRIVER_NOT_FOUND', 'Motoristas não encontrado', 404)
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
      distance: rideData.distanceKm,
      duration: rideData.duration,
      options: rideData.options,
      routeResponse: rideData.routeReponse,
    }
  }

  const rideEstimate = async (
    body: TBodyRideEstimate
  ): Promise<TRideEstimateResponse> => {
    const { origin, destination } = body

    if (origin === destination) {
      throw createServiceError(
        'INVALID_DATA',
        'A origem e destino não podem ser iguais.',
        400
      )
    }

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
        duration: route.legs[0].duration.value,
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
        'Erro ao calcular a rota. Verifique os dados fornecidos.',
        400
      )
    }
  }

  return {
    rideFindAll,
    rideCreateHistory,
    rideGetHistory,
    rideEstimate,
    calculateDrivers,
  }
}

export default RideService
