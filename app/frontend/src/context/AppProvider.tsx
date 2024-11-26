import React, { createContext, ReactNode, useEffect, useState } from 'react';
import {
  DestinationRequest,
  EstimatedPrice,
  OriginRequest,
} from '../interfaces/googleClient';

export interface AppContextType {
  estimatedPrice: EstimatedPrice | undefined;
  setEstimatedPrice: React.Dispatch<
    React.SetStateAction<EstimatedPrice | undefined>
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
  const [estimatedPrice, setEstimatedPrice] = useState<EstimatedPrice>();
  const [originRequest, setOriginRequest] = useState<OriginRequest>();
  const [destinationRequest, setDestinationRequest] =
    useState<DestinationRequest>();

  useEffect(() => {
    const savedPrice = localStorage.getItem('estimatedPrice');
    if (savedPrice) {
      setEstimatedPrice(JSON.parse(savedPrice));
    }
  }, []);

  useEffect(() => {
    if (estimatedPrice) {
      localStorage.setItem('estimatedPrice', JSON.stringify(estimatedPrice));
    }
  }, [estimatedPrice]);

  return (
    <AppContext.Provider
      value={{
        estimatedPrice,
        setEstimatedPrice,
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
