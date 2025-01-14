import React, { useState } from 'react';

const SignUpInputField = ({ type, placeholder, icon, value, onChange, error, minLength, confirmPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    onChange(e); 
  };

  return (
    <div className="input-wrapper">
      <input
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={handleChange}
        required
        minLength={minLength}
      />
      <i className="material-symbols-rounded">{icon}</i>

      {type === 'password' && (
        <i
          className="material-symbols-rounded eye-icon"
          onClick={() => setShowPassword(!showPassword)}
          style={{ cursor: 'pointer' }}
        >
          {showPassword ? 'visibility' : 'visibility_off'}
        </i>
      )}

      {/* Display error message if there's an error */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignUpInputField;
