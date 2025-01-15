// import React from 'react'
// import { Link } from 'react-router-dom'
// import SignUpInnputField from './SignUpInnputField'
// 
// const SignUp = () => {
//   return (
//     <div className="login-container1">
//       <h2 className="form-title1">SignUp Community <span className="highlight">HUB</span></h2>
// 
//       <form action="#" className="login-form">
//         <SignUpInnputField type="email" placeholder="Email" icon="mail"/>
//         <SignUpInnputField type="userid" placeholder="Username" icon="person"/>
//         <SignUpInnputField type="password" placeholder=" Password" icon="visibility"/>
//         <SignUpInnputField type="password" placeholder="Confirm Password" icon="visibility"/>
//         <button className="login-button">Signup</button>
//       </form>
//       <p className="sigunup-text">
//         Already have an account?<Link to="/"> Role</Link>
//       </p>
//     </div>
// 
//   )
// }
// 
// export default SignUp


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpInputField from './SignUpInnputField';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must end with @gmail.com';
    }

    // Password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', { email, username, password });
      // Perform signup logic here
    }
  };

  return (
    <div className="login-container1">
      <h2 className="form-title1">
        SignUp Community <span className="highlight">HUB</span>
      </h2>

      <form onSubmit={handleSubmit} className="login-form">
        <SignUpInputField
          type="email"
          placeholder="Email"
          icon="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <SignUpInputField
          type="text"
          placeholder="Username"
          icon="person"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <SignUpInputField
          type="password"
          placeholder="Password"
          icon="visibility"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          minLength={6}
        />
        <SignUpInputField
          type="password"
          placeholder="Confirm Password"
          icon="visibility"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
        <button className="login-button">Signup</button>
      </form>
      <p className="signup-text">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
