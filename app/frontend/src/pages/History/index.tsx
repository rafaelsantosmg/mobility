import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LoaderSpinner from '../../components/LoaderSpinner';
import SelectDriver from '../../components/SelectDrive';
import { useAppContext } from '../../hooks/useAppContext';
import useRide from '../../hooks/useRide';
import convertCurrencyPtBr from '../../utils/convertCurrencyPtBr';
import { formatDuration } from '../../utils/formatDuration';

const History: React.FC = () => {
  const { onHistoryRide, onHistoryRideDriverId, loading } = useRide();
  const { historyRide, historyRideDriver } = useAppContext();
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedDriverId) {
      onHistoryRide();
    }
  }, [selectedDriverId]);

  useEffect(() => {
    if (selectedDriverId) {
      onHistoryRideDriverId(selectedDriverId);
    }
  }, [selectedDriverId]);

  const filteredHistoryRide = useMemo(() => {
    if (!selectedDriverId) {
      return historyRide;
    }

    return historyRideDriver;
  }, [historyRide, historyRideDriver]);

  const drivers = useMemo(() => {
    const uniqueDrivers = Array.from(
      new Set(historyRide?.map((ride) => ride.driver.id))
    ).map((id) => ({
      id,
      name: historyRide?.find((ride) => ride.driver.id === id)?.driver.name,
    }));

    return uniqueDrivers;
  }, [historyRide]);

  return (
    <section className="flex max-h-[calc(100vh-4rem)] w-full flex-col items-center justify-start gap-2 p-5">
      <div className="fixed left-2 top-16 flex text-blue-900 underline">
        <Link to="/maps">voltar</Link>
      </div>
      <div className="flex w-full flex-col items-center justify-start">
        <h1 className="text-3xl font-bold text-blue-600">
          Histórico de Viagens
        </h1>
        <p>
          Aqui você poderá ver os detalhes de suas viagens realizadas
          anteriormente. Clique em um item da lista para ver mais detalhes.
        </p>
      </div>

      <div className="flex w-full p-5 lg:w-4/5">
        <SelectDriver
          drivers={drivers}
          selectedDriverId={selectedDriverId}
          onDriverChange={(value) => setSelectedDriverId(value)}
        />
      </div>

      {loading ? (
        <LoaderSpinner />
      ) : filteredHistoryRide && filteredHistoryRide?.length === 0 ? (
        <p className="text-xl font-bold text-gray-700">
          Você não possui histórico de viagens realizadas.
        </p>
      ) : (
        <div className="flex h-screen w-full flex-col gap-5 overflow-auto p-5 lg:w-4/5">
          {filteredHistoryRide?.map((history) => (
            <div
              key={history.id}
              className="flex flex-col items-start justify-center gap-1 rounded-md border border-gray-300 p-4"
            >
              <p className="text-left text-lg font-semibold text-blue-600">
                {history.driver.name}
              </p>
              <p className="text-left text-gray-700">{history.origin}</p>
              <p className="text-left text-gray-700">{history.destination}</p>
              <p className="text-left text-gray-700">
                <strong>Data:</strong>{' '}
                {new Date(history.createdAt).toLocaleDateString()}
              </p>
              <p className="text-left text-gray-700">
                <strong>Distancia:</strong> {history.distance.toFixed(2)} Km
              </p>
              <p className="text-left text-gray-700">
                <strong>Duração:</strong> {formatDuration(history.duration)}
              </p>
              <p className="text-left text-gray-700">
                <strong>Valor:</strong> {convertCurrencyPtBr(history.value)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default History;
