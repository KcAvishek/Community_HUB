import React, { useState } from 'react';

const SignUpInputField = ({ type, placeholder, icon, value, onChange, error, minLength }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={showPassword && type === 'password' ? 'text' : type}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
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
