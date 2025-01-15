import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpInputField from './SignUpInnputField';
import axios from 'axios';
import { toast, Toaster } from "sonner";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        email,
        username,
        password,
        role: 'non-member', 
      };

      console.log('Form submitted:', userData);

      // Show loading state while making the API request
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:4000/api/auth/signUp', userData);

        if (response.status === 200) {
          toast.success('Sign up successful!'); // Alert on success
          console.log('User registered successfully:', response.data);


          // Clear the form fields after successful signup
          setEmail('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');

          // You can redirect to the login page or clear form here if needed
        } else {
          toast.error('Sign up failed: ' + response.data.message); // Alert on failure
          console.error('Error during registration:', response.data.message);
        }
      } 
      catch (error) {
        toast.error( error.message);
        console.error('Error during signup:', error.response ? error.response.data : error.message);
      } 
      finally {
        setLoading(false); // Hide loading state after the request
      }
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
        <button className="login-button" disabled={loading}>
          {loading ? 'Signing Up...' : 'Signup'}
        </button>
      </form>
      <p className="sigunup-text">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;



