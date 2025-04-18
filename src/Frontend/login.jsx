import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { LoginInputField } from './LoginInputField';
import axios from 'axios';
import { toast } from "sonner";
import useAuthStore from './Store/authStore';

const Login = () => {
  const location = useLocation();
  const { selectedRole } = location.state || { selectedRole: '' };
  const roleDisplay = selectedRole === 'non-member' ? 'Non-Member' : selectedRole;

  const [communityName, setCommunityName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const setAuthData = useAuthStore((state) => state.setAuthData);

  useEffect(() => {
    setCommunityName('');
  }, [selectedRole]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Username and password are required');
      return;
    }

    if (selectedRole !== 'non-member' && !communityName.trim() && selectedRole !== 'admin') {
      toast.error('Community name is required');
      return;
    }

    const loginData = {
      username,
      password,
      role: selectedRole,
    };

    if (selectedRole !== 'non-member' && selectedRole !== 'admin') {
      loginData.community_name = communityName.trim();
    }

    console.log('Login Data:', loginData);

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', loginData);

      console.log('Login response:', response.data);

      if (response.data.token) {
        setAuthData({
          token: response.data.token,
          role: response.data.role,
          user: response.data.user_id,
          community: response.data.community,
          communityName: communityName.trim(),
          email: response.data.email,
          username: response.data.username,
        });

        toast.success(response.data.message);

        // ✅ Role-based redirection
        if (selectedRole.toLowerCase() === 'admin') {
          navigate('/admin/Admin');
        } else if (selectedRole.toLowerCase() === 'leader') {
          navigate('/dashboard/main');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">
        Community <span className="highlight">HUB</span>
      </h2>
      <form onSubmit={handleLogin} className="login-form">
        {selectedRole !== 'non-member' && selectedRole !== 'admin' && (
          <LoginInputField
            type="text"
            placeholder="Community_Name"
            icon="local_library"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            id="community_name"
            name="community_name"
          />
        )}
        <LoginInputField
          type="text"
          placeholder="Username"
          icon="person"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          name="username"
        />
        <LoginInputField
          type="password"
          placeholder="Password"
          icon=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
        />
        <button className="login-button" type="submit">Login</button>
      </form>
      <p className="sigunup-text">
        Wanna go back? <Link to="/">Role</Link>
      </p>
    </div>
  );
};

export default Login;
