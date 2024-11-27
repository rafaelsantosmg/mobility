import { DriverOption } from '../interfaces/googleClient';
import convertCurrencyPtBr from '../utils/convertCurrencyPtBr';

type TTravel = {
  destination: string | undefined;
  distance: number | undefined;
  driver: DriverOption | null | undefined;
  duration: string | undefined;
  origin: string | undefined;
};

interface ModalConfirmProps {
  isOpen: boolean;
  travel: TTravel;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  onClose,
  onSubmit,
  travel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 rounded-lg bg-white p-6 shadow-lg xl:w-9/12 2xl:w-2/5">
        <button
          className="absolute right-2 top-2 h-8 w-8 rounded-full text-xl text-gray-700 hover:bg-gray-500 hover:text-white hover:ring-4 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={onClose}
        >
          X
        </button>
        <p className="mb-4 text-2xl font-bold text-blue-600">
          Deseja confirmar a viagem?
        </p>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-gray-900">Origem:</p>
            <p className="text-gray-700">{travel.origin}</p>
          </div>

          <div>
            <p className="text-gray-900">Destino:</p>
            <p className="text-gray-700">{travel.destination}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-900">Motorista:</p>
            <p className="text-gray-700">{travel.driver?.name}</p>
          </div>

          <div>
            <p className="text-gray-900">Valor:</p>
            <p className="text-gray-700">
              {convertCurrencyPtBr(travel.driver?.value)}
            </p>
          </div>

          <div>
            <p className="text-gray-900">Distância:</p>
            <p className="text-gray-700">{travel.distance} Km</p>
          </div>

          <div>
            <p className="text-gray-900">Duração:</p>
            <p className="text-gray-700">{travel.duration?.slice(0, 3)} min</p>
          </div>

          <div>
            <p className="text-gray-900">Avaliação:</p>
            <p className="text-gray-700">
              {Array.from({ length: 5 }, (_, index) =>
                index < (travel.driver?.review.rating ?? 0) ? '⭐' : '☆'
              ).join('')}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-20">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => {
              onClose();
              onSubmit();
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
