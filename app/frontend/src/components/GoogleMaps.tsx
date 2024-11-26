import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../hooks/useAppContext';

const isMobile = window.innerWidth <= 768;

const containerStyle = {
  width: '100%',
  height: isMobile ? '500px' : '100%',
};

const GoogleMaps: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const { originRequest, destinationRequest } = useAppContext();
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    } else {
      toast.error('Geolocalização não é suportada pelo navegador.');
    }
  }, []);

  useEffect(() => {
    if (originRequest && destinationRequest) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originRequest,
          destination: destinationRequest,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirectionsResponse(result);
          } else {
            toast.error(
              'Erro ao calcular a rota. Verifique os dados fornecidos.'
            );
          }
        }
      );
    }
  }, [originRequest, destinationRequest]);

  if (loadError) return <div>Erro ao carregar o mapa</div>;
  if (!isLoaded) return <div>Carregando...</div>;

  return (
    <div className="flex w-full flex-col">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation || { lat: 0, lng: 0 }}
        zoom={currentLocation ? 15 : 2}
      >
        {/* Marcador na localização atual */}
        {!directionsResponse && currentLocation && (
          <Marker position={currentLocation} />
        )}
        {/* Renderizador das rotas */}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;
