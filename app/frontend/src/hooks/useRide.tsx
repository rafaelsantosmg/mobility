import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { EstimatedResponse } from '../interfaces/googleClient';
import api from '../services';

type UseRideReturn = {
  origin: string;
  destination: string;
  estimatedPrice: number | null;
  onOriginChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDestinationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEstimateRide: () => Promise<void>;
};

const useRide = (): UseRideReturn => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const onOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(event.target.value);
  };

  const onDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const onEstimateRide = async () => {
    try {
      const request = { origin, destination, customer_id: '1' };
      const { data } = await api.post('/ride/estimate', request);
      const response: EstimatedResponse = data;
      console.log(response.estimatedPrice);
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
    const estimated = 100; // Exemplo de estimativa
    setEstimatedPrice(estimated);
  };

  return {
    origin,
    destination,
    estimatedPrice,
    onOriginChange,
    onDestinationChange,
    onEstimateRide,
  };
};

export default useRide;
