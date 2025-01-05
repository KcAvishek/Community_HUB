import React from 'react';

const RolesInputField = ({ id, options, value, onChange }) => {
  return (
    <div className="select-wrapper">
      <select id={id}  value={value} onChange={onChange} className="select-field">
        <option value="" disabled> Select a Role </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default RolesInputField;

