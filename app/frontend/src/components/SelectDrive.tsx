import React from 'react';

type Driver = {
  id: number;
  name: string | undefined;
};

type SelectDriverProps = {
  drivers: Driver[];
  selectedDriverId: number | null;
  onDriverChange: (id: number | null) => void;
};

const SelectDriver: React.FC<SelectDriverProps> = ({
  drivers,
  selectedDriverId,
  onDriverChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onDriverChange(value ? parseInt(value, 10) : null);
  };

  return (
    <div className="flex w-full max-w-md flex-col">
      <label
        htmlFor="driver-select"
        className="mb-2 text-sm font-medium text-gray-700"
      >
        Filtre por motorista
      </label>
      <select
        id="driver-select"
        value={selectedDriverId !== null ? selectedDriverId.toString() : ''}
        onChange={handleChange}
        className="w-80 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Selecione um motorista --</option>
        {drivers?.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {driver.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDriver;
