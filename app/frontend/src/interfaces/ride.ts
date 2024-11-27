export interface DriverTravelRide {
  name: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

export interface ConfirmRidePayload {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: string | number;
    name: string;
  };
  value: number;
}
