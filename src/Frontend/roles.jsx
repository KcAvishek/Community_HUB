// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
// import RolesInputField from './RolesInputField';
// 
// const Roles = () => {
//   const [selectedRole, setSelectedRole] = useState('');
//   const [error, setError] = useState(''); 
//   const navigate = useNavigate();
// 
//   const handleRoleChange = (event) => {
//     const role = event.target.value;
//     setSelectedRole(role);
//     setError(''); 
//     console.log("Selected Role in Roles.jsx:", role);
//   };
// 
//   const roleOptions = [
//     { value: 'leader', label: 'Leader' },
//     { value: 'communityMember', label: 'Community Member' },
//     { value: 'nonMember', label: 'Non-Member' },
//   ];
// 
//   const handleDoneClick = () => {
//     if (!selectedRole) {
//       setError('Please select a role'); 
//       return;
//     }
//     console.log("Navigating with Role:", selectedRole);
//     navigate('/login', { state: { selectedRole } });
//   };
// 
//   return (
//     <div className="login-container">
//       <h2 className="form-title">
//         Community <span className="highlight">HUB</span>
//       </h2>
//       <form className="login-form">
//         <div className="input-wrapper">
//           <RolesInputField
//             id="role"
//             options={roleOptions}
//             value={selectedRole}
//             onChange={handleRoleChange}
//           />
//         </div>
//         {error && <p className="error-message">{error}</p>} 
//         <button
//           className="login-button"
//           type="button"
//           onClick={handleDoneClick}
//          
//         >
//           Done
//         </button>
//       </form>
//       <p className="sigunup-text">
//          Don&apos;t have an account? <Link to="/signup"> Register</Link>
//        </p>
//     </div>
//   );
// };
// 
// export default Roles;
// 
// 


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RolesInputField from './RolesInputField';

const Roles = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState(''); // State for validation error
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'leader', label: 'Leader' },
    { value: 'communityMember', label: 'Community Member' },
    { value: 'nonMember', label: 'Non-Member' },
  ];

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    setError(''); // Clear error when a role is selected
    console.log("Selected Role in Roles.jsx:", role);

    // Navigate immediately after a role is selected
    if (role) {
      navigate('/login', { state: { selectedRole: role } });
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">
        Community <span className="highlight">HUB</span>
      </h2>
      <form className="login-form">
        <div className="input-wrapper">
          <RolesInputField
            id="role"
            options={roleOptions}
            value={selectedRole}
            onChange={handleRoleChange} // Trigger navigation on change
          />
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p className="sigunup-text">
        Don&apos;t have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
};

export default Roles;
