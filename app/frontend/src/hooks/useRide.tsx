import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { EstimatedResponse } from '../interfaces/googleClient';
import api from '../services';
import { useAppContext } from './useAppContext';

type UseRideReturn = {
  origin: string;
  destination: string;
  onOriginChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDestinationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEstimateRide: () => Promise<void>;
};

const useRide = (): UseRideReturn => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const { setEstimatedPrice, setOriginRequest, setDestinationRequest } =
    useAppContext();

  const onOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(event.target.value);
  };

  const onDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const onEstimateRide = async () => {
    try {
      const request = { origin, destination, customer_id: '1' };
      const { data }: EstimatedResponse = await api.post(
        '/ride/estimate',
        request
      );
      setEstimatedPrice({
        origin: data.estimatedPrice.origin,
        destination: data.estimatedPrice.destination,
        distance: data.estimatedPrice.distance,
        duration: data.estimatedPrice.duration,
        options: data.estimatedPrice.options,
      });
      setOriginRequest({
        lat: data.estimatedPrice.origin.latitude,
        lng: data.estimatedPrice.origin.longitude,
      });
      setDestinationRequest({
        lat: data.estimatedPrice.destination.latitude,
        lng: data.estimatedPrice.destination.longitude,
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') {
          toast.error(
            'Erro de conexão. Verifique sua rede ou se o servidor está ativo.'
          );
        } else if (error.response) {
          toast.error(error.response.data.error_description);
        } else {
          toast.error('Erro inesperado. Tente novamente.');
        }
      } else {
        console.error('Erro não reconhecido:', error);
      }
    }
  };

  return {
    origin,
    destination,
    onOriginChange,
    onDestinationChange,
    onEstimateRide,
  };
};

export default useRide;
