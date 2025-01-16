// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { LoginInputField } from './LoginInputField';
// import axios from 'axios';
// import { toast, Toaster } from "sonner";
// 
// 
// const Login = () => {
//   const location = useLocation();
//   const { selectedRole } = location.state || { selectedRole: '' };
// 
//   console.log("Location State in Login.jsx:", location.state); 
//   console.log("Received Role in Login.jsx:", selectedRole); 
//   return (
//     <div className="login-container">
//       <h2 className="form-title">
//         Community <span className="highlight">HUB</span>
//       </h2>
//       <form action="#" className="login-form">
//         {/* Show Community Name input only if the role is not Non-Member */}
//         {selectedRole !== 'nonMember' && (
//           <LoginInputField type="text" placeholder="Community Name" icon="local_library"/>
//         )}
//         <LoginInputField type="text" placeholder="Username" icon="person"/>
//         <LoginInputField type="password" placeholder="Password" icon=""/>
//         <button className="login-button" type="submit">Login</button>
//       </form>
//       <p className="sigunup-text">
//          Wana go back ?<Link to="/"> Role</Link>
//        </p>
//     </div>
//   );
// };
// export default Login;
// 


import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { LoginInputField } from './LoginInputField';
import axios from 'axios';
import { toast } from "sonner";

const Login = () => {
  const location = useLocation();
  const { selectedRole } = location.state || { selectedRole: '' };
  const roleDisplay = selectedRole === 'non-member' ? 'Non-Member' : selectedRole;


  const [communityName, setCommunityName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      toast.error('Username and password are required');
      return;
    }

    const loginData = {
      username,
      password,
      role: selectedRole,
    };

    if (selectedRole !== 'non-member') {
      loginData.community_name = communityName;  // Sending community name if role is not nonMember
    }

    console.log('Login Data:', loginData);  // Log the data to check if it's correct

    try {
      // Send login request to the backend API
      const response = await axios.post('http://localhost:4000/api/auth/login', loginData);
      
      if (response.data.token) {
        // Store the token in localStorage or sessionStorage (optional)
        localStorage.setItem('authToken', response.data.token);

        // Show success message
        toast.success(response.data.message);

        // Redirect to the Dashboard page on successful login
        navigate('/dashboard');  // Redirect to Dashboard page
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">
        Community <span className="highlight">HUB</span>
      </h2>
      <form onSubmit={handleLogin} className="login-form">
        {selectedRole !== 'non-member' && (
          <LoginInputField
            type="text"
            placeholder="Community_Name"
            icon="local_library"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}  // Ensure state is updated
            id="community_name"   // Add ID for accessibility and form handling
            name="community_name" // Add Name for form submission
          />
        )}
        <LoginInputField
          type="text"
          placeholder="Username"
          icon="person"
          value={username}
          onChange={(e) => setUsername(e.target.value)}  // Ensure state is updated
          id="username"         // Add ID for accessibility and form handling
          name="username"       // Add Name for form submission
        />
        <LoginInputField
          type="password"
          placeholder="Password"
          icon=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Ensure state is updated
          id="password"         // Add ID for accessibility and form handling
          name="password"       // Add Name for form submission
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