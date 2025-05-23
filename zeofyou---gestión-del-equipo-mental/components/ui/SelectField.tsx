
import React from 'react';

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Array<{ value: string | number; label: string } | string>;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, id, options, className = '', ...props }) => {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      <label htmlFor={selectId} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <select
        id={selectId}
        className={`bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
        {...props}
      >
        {options.map((option, index) => {
          if (typeof option === 'string') {
            return <option key={index} value={option}>{option}</option>;
          }
          return <option key={option.value} value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
};

export default SelectField;
