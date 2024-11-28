import { Link } from 'react-router-dom';
import Estimated from '../../components/Estimated';
import GoogleMaps from '../../components/GoogleMaps';

const Maps: React.FC = () => {
  return (
    <section className="flex max-h-[calc(100vh-4rem)] w-full flex-col items-center justify-start gap-2 p-5">
      <div className="fixed left-2 top-16 flex text-blue-900 underline">
        <Link to="/">voltar</Link>
      </div>
      <h1 className="text-3xl font-bold text-blue-600">
        Mapa e Resumo da Viagem
      </h1>
      <p>
        Aqui você poderá visualizar o mapa da rota e verificar o resumo da
        viagem, incluindo a distância, duração estimada, e as opções de
        motoristas disponíveis.
      </p>
      <div className="grid w-full sm:h-screen lg:w-11/12 lg:grid-cols-2 lg:p-5">
        <GoogleMaps />
        <Estimated />
      </div>
    </section>
  );
};

export default Maps;
