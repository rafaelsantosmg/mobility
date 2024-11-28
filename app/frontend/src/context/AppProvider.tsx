import React, { createContext, ReactNode, useEffect, useState } from 'react';
import {
  DestinationRequest,
  EstimatedRide,
  HistoryRide,
  OriginRequest,
} from '../interfaces/googleClient';

export interface AppContextType {
  estimatedRide: EstimatedRide | undefined;
  setEstimatedRide: React.Dispatch<
    React.SetStateAction<EstimatedRide | undefined>
  >;
  originRequest: OriginRequest | undefined;
  setOriginRequest: React.Dispatch<
    React.SetStateAction<OriginRequest | undefined>
  >;
  destinationRequest: DestinationRequest | undefined;
  setDestinationRequest: React.Dispatch<
    React.SetStateAction<DestinationRequest | undefined>
  >;
  customerId: string | null;
  setCustomerId: React.Dispatch<React.SetStateAction<string | null>>;
  historyRide: HistoryRide[] | undefined;
  setHistoryRide: React.Dispatch<
    React.SetStateAction<HistoryRide[] | undefined>
  >;
  historyRideDriver: HistoryRide[] | undefined;
  setHistoryRideDriver: React.Dispatch<HistoryRide[] | undefined>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [estimatedRide, setEstimatedRide] = useState<EstimatedRide>();
  const [originRequest, setOriginRequest] = useState<OriginRequest>();
  const [historyRide, setHistoryRide] = useState<HistoryRide[]>();
  const [historyRideDriver, setHistoryRideDriver] = useState<HistoryRide[]>();
  const [destinationRequest, setDestinationRequest] =
    useState<DestinationRequest>();

  useEffect(() => {
    const savedPrice = localStorage.getItem('estimatedRide');
    const saveCustomerId = localStorage.getItem('customerId');
    if (savedPrice) {
      setEstimatedRide(JSON.parse(savedPrice));
    }
    if (saveCustomerId) {
      setCustomerId(saveCustomerId);
    }
  }, []);

  useEffect(() => {
    if (estimatedRide) {
      localStorage.setItem('estimatedRide', JSON.stringify(estimatedRide));
    }
  }, [estimatedRide]);

  useEffect(() => {
    if (customerId) {
      localStorage.setItem('customerId', customerId);
    }
  }, [customerId]);

  return (
    <AppContext.Provider
      value={{
        estimatedRide,
        setEstimatedRide,
        originRequest,
        setOriginRequest,
        destinationRequest,
        setDestinationRequest,
        customerId,
        setCustomerId,
        historyRide,
        setHistoryRide,
        historyRideDriver,
        setHistoryRideDriver,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
