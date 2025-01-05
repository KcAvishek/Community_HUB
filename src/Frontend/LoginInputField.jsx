import React, { useState } from 'react';

export const LoginInputField = ({ type, placeholder, icon }) => {
  const [showPassword, setShowPassword] = useState(false); 

  return (
    <div className="input-wrapper">
      <input  type={type === 'password' && showPassword ? 'text' : type} 
        placeholder={placeholder} 
        className="input-field" 
        required 
      />
      <i className="material-symbols-rounded">{icon}</i>

      {/* Show visibility toggle only for password input */}
      {type === 'password' && (
        <i 
          className="material-symbols-rounded eye-icon" 
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: 'pointer' }}
        >
          {showPassword ? 'visibility' : 'visibility_off'}
        </i>
      )}
    </div>
  );
};




