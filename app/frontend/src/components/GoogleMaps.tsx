import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../hooks/useAppContext';

const isMobile = window.innerWidth <= 768;

const containerStyle = {
  width: '100%',
  height: isMobile ? '500px' : '95%',
};

const GoogleMaps: React.FC = () => {
  const { originRequest, destinationRequest } = useAppContext();

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

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

  return (
    <div className="flex w-full flex-col">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: -23.533773, lng: -46.62529 }} // latitude and longitude of São Paulo
        zoom={15}
      >
        {/* Renderizador das rotas */}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMaps;
