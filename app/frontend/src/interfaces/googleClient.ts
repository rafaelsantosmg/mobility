interface Review {
  rating: number;
  comment: string;
}

export interface DriverOption {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface GeocodedWaypoint {
  geocoder_status: string;
  place_id: string;
  types: string[];
}

interface Step {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  end_location: LatLng;
  html_instructions: string;
  polyline: {
    points: string;
  };
  start_location: LatLng;
  travel_mode: string;
}

interface Leg {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  end_address: string;
  end_location: LatLng;
  start_address: string;
  start_location: LatLng;
  steps: Step[];
  traffic_speed_entry: any[];
  via_waypoint: any[];
}

interface Route {
  bounds: {
    northeast: LatLng;
    southwest: LatLng;
  };
  copyrights: string;
  legs: Leg[];
  overview_polyline: {
    points: string;
  };
  summary: string;
  warnings: string[];
  waypoint_order: number[];
}

interface RouteResponse {
  geocoded_waypoints: GeocodedWaypoint[];
  routes: Route[];
  status: string;
}

export interface EstimatedResponse {
  data: {
    estimatedRide: {
      origin: Location;
      destination: Location;
      distance: number;
      duration: string;
      options: DriverOption[];
      routeResponse: RouteResponse;
    };
  };
}

export interface OriginRequest {
  lat: number;
  lng: number;
}

export interface DestinationRequest {
  lat: number;
  lng: number;
}

export interface EstimatedRide {
  origin: Location;
  destination: Location;
  distance: number;
  duration: string;
  options: DriverOption[];
  routeResponse?: RouteResponse;
}
