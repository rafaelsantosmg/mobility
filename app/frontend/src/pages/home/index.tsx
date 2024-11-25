import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 w-full">
      <div className='flex flex-col w-1/2'>

      <h1 className="text-4xl font-bold text-blue-600 mb-4">Bem-vindo à Mobility</h1>
      <p className="text-lg text-gray-700 mb-4">
      Bem-vindo ao Mobility!

      O Mobility é a solução ideal para o transporte particular, oferecendo praticidade e eficiência ao seu alcance. Com uma interface simples e funcional, nossa plataforma foi desenvolvida para proporcionar uma experiência de transporte tranquila e ágil, conectando você aos melhores serviços de mobilidade.

      Nesta plataforma, você poderá acessar facilmente informações sobre rotas, estimativas de tempo e integração com o Google Maps, tudo para otimizar seu trajeto. Seja para viagens curtas ou longas distâncias, o <strong>Mobility</strong> está aqui para tornar o seu deslocamento mais eficiente e seguro.

      Explore e aproveite o melhor da mobilidade!
      </p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Comece agora.
      </button>
      </div>
    </div>
  );
};

export default Home;
