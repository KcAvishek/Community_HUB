import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LoginInputField } from './LoginInputField';

const Login = () => {
  const location = useLocation();
  const { selectedRole } = location.state || { selectedRole: '' };

  console.log("Location State in Login.jsx:", location.state); 
  console.log("Received Role in Login.jsx:", selectedRole); 
  return (
    <div className="login-container">
      <h2 className="form-title">
        Community <span className="highlight">HUB</span>
      </h2>
      <form action="#" className="login-form">
        {/* Show Community Name input only if the role is not Non-Member */}
        {selectedRole !== 'nonMember' && (
          <LoginInputField type="text" placeholder="Community Name" icon="local_library"/>
        )}
        <LoginInputField type="text" placeholder="Username" icon="person"/>
        <LoginInputField type="password" placeholder="Password" icon=""/>
        <button className="login-button" type="submit">Login</button>
      </form>
      <p className="sigunup-text">
         Wana go back ?<Link to="/"> Role</Link>
       </p>
    </div>
  );
};
export default Login;





