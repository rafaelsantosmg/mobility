import { useAppContext } from '../hooks/useAppContext';

const Header: React.FC = () => {
  const { customerId } = useAppContext();
  return (
    <div className="flex h-16 w-full flex-row justify-between bg-blue-500 p-4">
      <button className="flex flex-row gap-5">
        <h1 className="text-2xl font-semibold text-white">Mobility</h1>
      </button>

      <div className="flex items-center gap-10">
        {customerId && (
          <button className="flex flex-row gap-5 text-white">
            <p>Usuário Id: {customerId}</p>
          </button>
        )}
        <h1 className="text-white">Data: {new Date().toLocaleDateString()}</h1>
      </div>
    </div>
  );
};

export default Header;
