import { useAppContext } from '../hooks/useAppContext';
import { Option } from '../interfaces/googleClient';
import convertCurrencyPtBr from '../utils/convertCurrencyPtBr';

const Estimated: React.FC = () => {
  const { estimatedPrice } = useAppContext();

  return (
    estimatedPrice && (
      <div className="flex w-full flex-col gap-3 pl-5">
        <p className="text-xl font-bold text-gray-700">
          Distancia: {estimatedPrice.distance} Km
        </p>
        <p className="text-xl font-bold text-gray-700">
          Duração estimada: {estimatedPrice.duration.slice(0, 6)}
        </p>

        {estimatedPrice.options.map((option: Option) => (
          <button
            type="button"
            key={option.id}
            className="flex flex-col items-start justify-center gap-1 rounded-md border border-gray-300 p-2 hover:bg-gray-300"
          >
            <p className="text-left text-lg font-semibold text-blue-600">
              {option.name}
            </p>
            <p className="text-left text-gray-700">{option.description}</p>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-left text-gray-700">
                <strong>Avaliçao:</strong>
              </p>
              {option.review.map((rev) => (
                <p className="text-left text-gray-700">
                  {rev.rating}⭐ ({rev.comment})
                </p>
              ))}
            </div>
            <p className="text-left text-gray-700">
              <strong>Valor:</strong> {convertCurrencyPtBr(option.value)}
            </p>
          </button>
        ))}
      </div>
    )
  );
};

export default Estimated;
