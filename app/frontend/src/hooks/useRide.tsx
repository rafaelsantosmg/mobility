import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { EstimatedResponse } from '../interfaces/googleClient';
import { ConfirmRidePayload } from '../interfaces/ride';
import api from '../services';
import { useAppContext } from './useAppContext';

type UseRideReturn = {
  origin: string;
  destination: string;
  onOriginChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDestinationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEstimateRide: () => Promise<void>;
  onConfirmRide: (payload: ConfirmRidePayload) => Promise<void>;
};

const useRide = (): UseRideReturn => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const { setEstimatedRide, setOriginRequest, setDestinationRequest } =
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
      setEstimatedRide({
        origin: data.estimatedRide.origin,
        destination: data.estimatedRide.destination,
        distance: data.estimatedRide.distance,
        duration: data.estimatedRide.duration,
        options: data.estimatedRide.options,
        routeResponse: data.estimatedRide.routeResponse,
      });
      setOriginRequest({
        lat: data.estimatedRide.origin.latitude,
        lng: data.estimatedRide.origin.longitude,
      });
      setDestinationRequest({
        lat: data.estimatedRide.destination.latitude,
        lng: data.estimatedRide.destination.longitude,
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

  const onConfirmRide = async (payload: ConfirmRidePayload) => {
    try {
      const request = payload;
      await api.post('/ride/confirm', request);
      toast.success('Sua viagem foi confirmada com sucesso!');
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
    onConfirmRide,
  };
};

export default useRide;
