import React, { createContext, ReactNode, useEffect, useState } from 'react';
import {
  DestinationRequest,
  EstimatedRide,
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
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [estimatedRide, setEstimatedRide] = useState<EstimatedRide>();
  const [originRequest, setOriginRequest] = useState<OriginRequest>();
  const [destinationRequest, setDestinationRequest] =
    useState<DestinationRequest>();

  useEffect(() => {
    const savedPrice = localStorage.getItem('estimatedRide');
    if (savedPrice) {
      setEstimatedRide(JSON.parse(savedPrice));
    }
  }, []);

  useEffect(() => {
    if (estimatedRide) {
      localStorage.setItem('estimatedRide', JSON.stringify(estimatedRide));
    }
  }, [estimatedRide]);

  return (
    <AppContext.Provider
      value={{
        estimatedRide,
        setEstimatedRide,
        originRequest,
        setOriginRequest,
        destinationRequest,
        setDestinationRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
