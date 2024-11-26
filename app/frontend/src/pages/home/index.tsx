import React from 'react';
import Estimated from '../../components/Estimated';
import GoogleMaps from '../../components/GoogleMaps';
import useRide from '../../hooks/useRide';

const Home: React.FC = () => {
  const { onOriginChange, onDestinationChange, onEstimateRide } = useRide();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-gray-100 p-5">
      <div className="mt-5 flex flex-col lg:w-3/4">
        <h1 className="mb-2 text-xl font-bold text-blue-600 lg:text-4xl">
          Bem-vindo à Mobility
        </h1>
        <p className="text-sm text-gray-700">
          O Mobility é a solução ideal para o transporte particular, oferecendo
          praticidade e eficiência ao seu alcance. Com uma interface simples e
          funcional, nossa plataforma foi desenvolvida para proporcionar uma
          experiência de transporte tranquila e ágil, conectando você aos
          melhores serviços de mobilidade. Nesta plataforma, você poderá acessar
          facilmente informações sobre rotas, estimativas de tempo e integração
          com o Google Maps, tudo para otimizar seu trajeto. Seja para viagens
          curtas ou longas distâncias, o <strong>Mobility</strong> está aqui
          para tornar o seu deslocamento mais eficiente e seguro. Explore e
          aproveite o melhor da mobilidade!
        </p>
      </div>

      <div className="mt-5 flex flex-col lg:w-3/4">
        <p className="text-sm text-gray-700">
          Para iniciar informe o endereço de <strong>Origem</strong> e de{' '}
          <strong>Destino</strong> depois clique em <strong>Calcular</strong>
        </p>
      </div>

      <div className="mt-10 flex w-full flex-col gap-10 lg:w-3/4">
        <div className="flex flex-col lg:justify-between">
          <div className="mb-3 lg:w-3/4">
            <label
              htmlFor="medium-input"
              className="mb-1 block text-sm font-medium text-blue-600"
            >
              Endereço de Origem
            </label>
            <input
              type="text"
              id="medium-input"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-200 dark:text-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={onOriginChange}
            />
          </div>

          <div className="mb-3 lg:w-3/4">
            <label
              htmlFor="medium-input"
              className="mb-1 block text-sm font-medium text-blue-600"
            >
              Endereço de Destino
            </label>
            <input
              type="text"
              id="medium-input"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-200 dark:text-gray-600 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={onDestinationChange}
            />
          </div>
          <button
            className="mt-5 h-12 w-40 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={onEstimateRide}
          >
            Calcular
          </button>
        </div>
      </div>

      <div className="mt-5 grid sm:h-screen lg:w-full lg:grid-cols-2 lg:p-5">
        <GoogleMaps />
        <Estimated />
      </div>
    </div>
  );
};

export default Home;
