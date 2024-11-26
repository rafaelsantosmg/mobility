import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const calculateDrivers = async (distance: number) => {
  const drivers = await prisma.driver.findMany({
    include: { review: true },
  })

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
}
