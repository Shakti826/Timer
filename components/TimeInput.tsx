
import React from 'react';

interface TimeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  disabled: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange, label, disabled }) => {
  return (
    <div className="flex flex-col items-center">
      <input
        type="number"
        min="0"
        max="99"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-20 h-20 bg-gray-800 text-white text-4xl text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
      />
      <label className="mt-2 text-sm text-gray-400 uppercase tracking-wider">{label}</label>
    </div>
  );
};

export default TimeInput;
