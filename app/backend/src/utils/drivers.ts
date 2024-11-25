import { Driver } from '../types/drivers'

export const DRIVERS: Driver[] = [
  {
    id: 1,
    name: 'Homer Simpson',
    description:
      'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
    vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
    review: {
      rating: 2,
      comment:
        'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio.',
    },
    rate_per_km: 2.5,
    min_km: 1,
  },
  {
    id: 2,
    name: 'Dominic Toretto',
    description:
      'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa.',
    vehicle: 'Dodge Charger R/T 1970 modificado',
    review: {
      rating: 4,
      comment:
        'Ei, aqui é o Dom. Vou te levar com segurança e rapidez ao seu destino.',
    },
    rate_per_km: 5.0,
    min_km: 5,
  },
  {
    id: 3,
    name: 'James Bond',
    description:
      'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico.',
    vehicle: 'Aston Martin DB5 clássico',
    review: {
      rating: 5,
      comment: 'Boa noite, sou James Bond. Aproveite o passeio com classe.',
    },
    rate_per_km: 10.0,
    min_km: 10,
  },
]
