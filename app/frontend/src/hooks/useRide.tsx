import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EstimatedResponse } from '../interfaces/googleClient';
import { ConfirmRidePayload, EstimateRidePayload } from '../interfaces/ride';
import api from '../services';
import { useAppContext } from './useAppContext';

type UseRideReturn = {
  onEstimateRide: (payload: EstimateRidePayload) => Promise<void>;
  onConfirmRide: (payload: ConfirmRidePayload) => Promise<void>;
  onHistoryRide: () => Promise<void>;
  onHistoryRideDriverId: (id: number) => Promise<void>;
  loading: boolean;
};

const useRide = (): UseRideReturn => {
  const {
    setEstimatedRide,
    setOriginRequest,
    setDestinationRequest,
    customerId,
    setHistoryRide,
    setHistoryRideDriver,
  } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onEstimateRide = useCallback(async (payload: EstimateRidePayload) => {
    try {
      setLoading(true);
      const request = {
        origin: payload.origin,
        destination: payload.destination,
        customer_id: payload.customerId,
      };
      const { data }: EstimatedResponse = await api.post(
        '/ride/estimate',
        request
      );
      setEstimatedRide({
        origin: data.origin,
        destination: data.destination,
        distance: data.distance,
        duration: data.duration,
        options: data.options,
        routeResponse: data.routeResponse,
      });
      setOriginRequest({
        lat: data.origin.latitude,
        lng: data.origin.longitude,
      });
      setDestinationRequest({
        lat: data.destination.latitude,
        lng: data.destination.longitude,
      });
      navigate(`/maps`);
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
    } finally {
      setLoading(false);
    }
  }, []);

  const onConfirmRide = useCallback(async (payload: ConfirmRidePayload) => {
    try {
      setLoading(true);
      const request = payload;
      await api.patch('/ride/confirm', request);
      toast.success('Sua viagem foi confirmada com sucesso!');
      navigate('/history');
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
    } finally {
      setLoading(false);
    }
  }, []);

  const onHistoryRide = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/ride/${customerId}`);
      setHistoryRide(data);
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
    } finally {
      setLoading(false);
    }
  }, []);

  const onHistoryRideDriverId = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/ride/${customerId}?driver_id=${id}`);
      setHistoryRideDriver(data);
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
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    onEstimateRide,
    onConfirmRide,
    onHistoryRide,
    onHistoryRideDriverId,
    loading,
  };
};

export default useRide;
