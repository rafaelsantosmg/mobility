import LoaderSpinner from './LoaderSpinner';

interface ModalConfirmProps {
  isOpen: boolean;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex h-96 w-96 flex-col items-center justify-center gap-5 rounded-lg bg-white p-6 shadow-lg">
        <p className="text-2xl text-gray-800">Aguarde...</p>
        <LoaderSpinner />
      </div>
    </div>
  );
};

export default ModalConfirm;
