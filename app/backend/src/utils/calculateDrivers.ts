import { Driver } from "../types/drivers";
import { DRIVERS } from "./drivers";

export const calculateDrivers = (distance: any) => {
  return DRIVERS.filter((driver: Driver) => distance >= driver.minKm)
    .map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: driver.review,
      value: parseFloat((distance * driver.ratePerKm).toFixed(2)),
    }))
    .sort((a, b) => a.value - b.value);
};
