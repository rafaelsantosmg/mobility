import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CUSTOMERS = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Jane Doe',
  },
  {
    id: 3,
    name: 'Joseph Doe',
  },
]

const DRIVERS = [
  {
    id: 1,
    name: 'Homer Simpson',
    description:
      'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio.',
    vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
    ratePerKm: 2.5,
    minKm: 1,
  },
  {
    id: 2,
    name: 'Dominic Toretto',
    description:
      'Ei, aqui é o Dom. Vou te levar com segurança e rapidez ao seu destino.',
    vehicle: 'Dodge Charger R/T 1970 modificado',
    ratePerKm: 5.0,
    minKm: 5,
  },
  {
    id: 3,
    name: 'James Bond',
    description: 'Boa noite, sou James Bond. Aproveite o passeio com classe.',
    vehicle: 'Aston Martin DB5 clássico',
    ratePerKm: 10.0,
    minKm: 10,
  },
]

const REVIEWS = [
  {
    rating: 2,
    comment:
      'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
    customerId: 1,
    driverId: 1,
  },
  {
    rating: 4,
    comment:
      'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa.',
    customerId: 2,
    driverId: 2,
  },
  {
    rating: 5,
    comment:
      'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico.',
    customerId: 3,
    driverId: 3,
  },
]

async function customer() {
  try {
    await Promise.all(
      CUSTOMERS.map(async (customer) => {
        return await prisma.customer.create({
          data: customer,
        })
      })
    )
  } catch (error) {
    console.error('Error while seeding customers:', error)
  }
}

async function driver() {
  try {
    await Promise.all(
      DRIVERS.map(async (driver) => {
        return await prisma.driver.create({
          data: driver,
        })
      })
    )
  } catch (error) {
    console.error('Error while seeding customers:', error)
  }
}

async function review() {
  try {
    await Promise.all(
      REVIEWS.map(async (review) => {
        return await prisma.review.create({
          data: review,
        })
      })
    )
  } catch (error) {
    console.error('Error while seeding reviews:', error)
  }
}

async function main() {
  await customer()
  await driver()
  await review()
}

main()
