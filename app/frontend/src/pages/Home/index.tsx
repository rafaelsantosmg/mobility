import React from 'react';
import DrivingForm from '../../components/DrivingForm';

const Home: React.FC = () => {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-start bg-gray-100 p-5">
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
        <DrivingForm />
      </div>
    </section>
  );
};

export default Home;
