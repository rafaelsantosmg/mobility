import { useMemo, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { useAppContext } from '../hooks/useAppContext';
import useRide from '../hooks/useRide';
import { DriverOption } from '../interfaces/googleClient';
import { ConfirmRidePayload } from '../interfaces/ride';
import convertCurrencyPtBr from '../utils/convertCurrencyPtBr';
import LoaderSpinner from './LoaderSpinner';
import ModalConfirm from './ModalConfirm';

const Estimated: React.FC = () => {
  const { estimatedRide } = useAppContext();
  const { onConfirmRide } = useRide();
  const [driver, setDriver] = useState<DriverOption | null>(null);

  const handleSelectDriver = (driver: DriverOption) => {
    setDriver(driver);
  };

  const travel = useMemo(() => {
    return {
      distance: estimatedRide?.distance,
      duration: estimatedRide?.duration,
      origin: estimatedRide?.routeResponse?.routes[0].legs[0].start_address,
      destination: estimatedRide?.routeResponse?.routes[0].legs[0].end_address,
      driver: driver,
    };
  }, [estimatedRide, driver]);

  const handleSubmit = () => {
    const payload: ConfirmRidePayload = {
      customer_id: '1',
      origin: travel.origin ?? '',
      destination: travel.destination ?? '',
      distance: travel.distance ?? 0,
      duration: travel.duration ?? '',
      driver: {
        id: travel.driver?.id ?? '',
        name: travel.driver?.name ?? '',
      },
      value: travel.driver?.value ?? 0,
    };
    onConfirmRide(payload);
  };

  return !estimatedRide ? (
    <LoaderSpinner />
  ) : (
    <Fragment>
      <div className="flex w-full flex-col gap-3 pl-5">
        <p className="text-xl font-bold text-gray-700">
          Distancia: {estimatedRide.distance} Km
        </p>
        <p className="text-xl font-bold text-gray-700">
          Duração estimada: {estimatedRide.duration.slice(0, 6)}
        </p>

        {estimatedRide.options.length > 0 ? (
          estimatedRide.options.map((option: DriverOption) => (
            <button
              type="button"
              key={option.id}
              className="flex flex-col items-start justify-center gap-1 rounded-md border border-gray-300 p-2 hover:bg-gray-300"
              onClick={() => handleSelectDriver(option)}
            >
              <p className="text-left text-lg font-semibold text-blue-600">
                {option.name}
              </p>
              <p className="text-left text-gray-700">{option.description}</p>
              <div className="flex flex-col items-start justify-center gap-1">
                <p className="text-left text-gray-700">
                  <strong>Avaliçao: </strong>
                  {Array.from({ length: 5 }, (_, index) =>
                    index < (option.review.rating ?? 0) ? '⭐' : '☆'
                  ).join('')}
                </p>

                <p className="text-left text-gray-700">
                  {option.review?.comment}
                </p>
              </div>
              <p className="text-left text-gray-700">
                <strong>Valor:</strong> {convertCurrencyPtBr(option.value)}
              </p>
            </button>
          ))
        ) : (
          <div className="mt-5 flex flex-col items-start justify-center gap-1">
            {' '}
            <p className="text-left text-2xl font-semibold text-blue-600">
              Não há motoristas disponíveis para esta rota.
            </p>
            <p className="text-left text-gray-700">
              Por favor, escolha outra rota.
            </p>
          </div>
        )}
      </div>

      <ModalConfirm
        isOpen={!!driver?.id}
        onClose={() => setDriver(null)}
        travel={travel}
        onSubmit={handleSubmit}
      />
    </Fragment>
  );
};

export default Estimated;
