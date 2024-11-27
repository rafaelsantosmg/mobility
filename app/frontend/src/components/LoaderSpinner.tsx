import LoaderIcon from '../assets/spinners-clock.svg?react';

const LoaderSpinner = () => {
  return (
    <div className="flex h-1/4 items-center justify-center">
      <LoaderIcon className="h-14 w-14 text-blue-500" />
    </div>
  );
};

export default LoaderSpinner;
