import { Fragment } from 'react/jsx-runtime';
import { useAppContext } from '../hooks/useAppContext';
import useRide from '../hooks/useRide';
import { DriverOption } from '../interfaces/googleClient';
import { ConfirmRidePayload } from '../interfaces/ride';
import convertCurrencyPtBr from '../utils/convertCurrencyPtBr';
import { formatDuration } from '../utils/formatDuration';
import LoaderSpinner from './LoaderSpinner';

const Estimated: React.FC = () => {
  const { estimatedRide, customerId } = useAppContext();
  const { onConfirmRide, loading } = useRide();

  const handleSubmit = (driver: DriverOption) => {
    const payload: ConfirmRidePayload = {
      customer_id: customerId ? customerId : '1',
      distance: estimatedRide?.distance,
      duration: estimatedRide?.duration,
      origin: estimatedRide?.routeResponse?.routes[0].legs[0].start_address,
      destination: estimatedRide?.routeResponse?.routes[0].legs[0].end_address,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value,
    };
    onConfirmRide(payload);
  };

  return !estimatedRide || loading ? (
    <LoaderSpinner />
  ) : (
    <Fragment>
      <div className="mt-10 flex w-full flex-col gap-3 lg:mt-0 lg:pl-5">
        <p className="text-xl font-bold text-gray-700">
          Distancia: {estimatedRide.distance.toFixed(2)} Km
        </p>
        <p className="text-xl font-bold text-gray-700">
          Duração estimada: {formatDuration(estimatedRide.duration)}
        </p>
        <div className="flex h-screen flex-col gap-3 overflow-auto lg:h-[65vh]">
          <p className="text-sm font-semibold">
            * Selecione um motorista para confirmar a viagem.
          </p>
          {estimatedRide.options.length > 0 ? (
            estimatedRide.options.map((option: DriverOption) => (
              <div
                key={option.id}
                className="flex flex-col items-start justify-center gap-1 rounded-md border border-gray-300 p-2"
              >
                <p className="text-left text-lg font-semibold text-blue-600">
                  {option.name}
                </p>
                <p className="text-left text-gray-700">{option.description}</p>
                <p className="text-left text-gray-700">
                  <strong>Veículo: </strong>
                  {option.vehicle}
                </p>
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
                <div className="flex w-full flex-row items-center justify-between">
                  <p className="text-left text-gray-700">
                    <strong>Valor:</strong> {convertCurrencyPtBr(option.value)}
                  </p>
                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => handleSubmit(option)}
                  >
                    Escolher
                  </button>
                </div>
              </div>
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
      </div>
    </Fragment>
  );
};

export default Estimated;
