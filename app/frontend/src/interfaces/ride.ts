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
  origin: string | undefined;
  destination: string | undefined;
  distance: number | undefined;
  duration: number | undefined;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export interface EstimateRidePayload {
  origin: string;
  destination: string;
  customerId: string;
}
