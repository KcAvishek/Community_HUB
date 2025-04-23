// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'sonner';
// 
// const AdminCommunitySection = () => {
//   const [communities, setCommunities] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [selectedCommunity, setSelectedCommunity] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [selectedCommunityForUpdate, setSelectedCommunityForUpdate] = useState(null);
//   const [formData, setFormData] = useState({ name: '', description: '', leader_id: '' });
//   const [allUsers, setAllUsers] = useState([]);
// 
//   useEffect(() => {
//     fetchCommunities();
//     fetchAllUsers();
//   }, []);
// 
//   useEffect(() => {
//     if (selectedCommunity) {
//       fetchCommunityMembers(selectedCommunity);
//     } else {
//       setMembers([]);
//     }
//   }, [selectedCommunity]);
// 
//   const fetchCommunities = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:4000/api/a1/getcommunity');
//       if (response.data && Array.isArray(response.data.communities)) {
//         setCommunities(response.data.communities);
//         setError(null);
//         if (response.data.communities.length > 0) {
//           setSelectedCommunity(response.data.communities[0].name);
//         }
//       } else {
//         toast.error('Unexpected response format');
//       }
//     } catch (err) {
//       toast.error('Failed to fetch communities');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
// 
//   const fetchCommunityMembers = async (communityName) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`/api/auth/members/${encodeURIComponent(communityName)}`);
//       setMembers(response.data);
//     } catch (err) {
//       toast.error('Failed to fetch community members');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
// 
//   const fetchAllUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/auth/all-users');
//       setAllUsers(response.data);
//     } catch (err) {
//       toast.error('Failed to fetch users');
//       console.error(err);
//     }
//   };
// 
//   const handleAddCommunity = async () => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/a1/createcommunity', formData);
//       setCommunities([...communities, response.data.community]);
//       setShowAddModal(false);
//       setFormData({ name: '', description: '', leader_id: '' });
//       toast.success('Community created successfully!');
//     } catch (err) {
//       toast.error('Failed to create community');
//       console.error(err);
//     }
//   };
// 
//   const handleUpdateCommunity = async () => {
//     try {
//       const response = await axios.put(`http://localhost:4000/api/a1/updatecommunity/${selectedCommunityForUpdate._id}`, formData);
//       setCommunities(
//         communities.map((c) =>
//           c._id === selectedCommunityForUpdate._id ? response.data.community : c
//         )
//       );
//       setShowUpdateModal(false);
//       setFormData({ name: '', description: '', leader_id: '' });
//       setSelectedCommunityForUpdate(null);
//       toast.success('Community updated successfully!');
//     } catch (err) {
//       toast.error('Failed to update community');
//       console.error(err);
//     }
//   };
// 
//   const handleDeleteCommunity = async (id) => {
//     try {
//       await axios.delete(`http://localhost:4000/api/a1/deletecommunityid/${id}`);
//       setCommunities(communities.filter((c) => c._id !== id));
//       if (selectedCommunity === communities.find((c) => c._id === id)?.name) {
//         setSelectedCommunity('');
//         setMembers([]);
//       }
//       toast.success('Community deleted successfully!');
//     } catch (err) {
//       toast.error('Failed to delete community');
//       console.error(err);
//     }
//   };
// 
//   const openUpdateModal = (community) => {
//     setSelectedCommunityForUpdate(community);
//     setFormData({ name: community.name, description: community.description || '', leader_id: community.leader_id || '' });
//     setShowUpdateModal(true);
//   };
// 
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
// 
//   return (
//     <div className="community-dashboard">
//       <h1 className="dashboard-title">Community Dashboard</h1>
// 
//       {loading && <p className="loading-text">Loading...</p>}
//       {error && <p className="error-text">{error}</p>}
// 
//       <div className="table-section">
//         <div className="table-header">
//           <h2 className="table-title">Communities</h2>
//           <button onClick={() => {
//             setFormData({ name: '', description: '', leader_id: '' });
//             setShowAddModal(true);
//           }} className="add-button">
//             Add Community
//           </button>
//         </div>
//         <div className="table-container">
//           <table className="community-table">
//             <thead>
//               <tr>
//                 <th className="table-head">Name</th>
//                 <th className="table-head">Description</th>
//                 <th className="table-head">Leader</th>
//                 <th className="table-head text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {communities.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="table-empty">No communities found</td>
//                 </tr>
//               ) : (
//                 communities.map((community) => (
//                   <tr key={community._id} className="table-row">
//                     <td className="table-cell">{community.name}</td>
//                     <td className="table-cell">{community.description}</td>
//                     <td className="table-cell">{community.leader_id}</td>
//                     <td className="table-cell text-right">
//                       <button onClick={() => openUpdateModal(community)} className="update-button">Update</button>
//                       <button onClick={() => handleDeleteCommunity(community._id)} className="delete-button">Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
// 
//       {/* USER TABLE */}
//       <div className="table-section mt-10">
//         <h2 className="table-title">Users</h2>
//         <div className="table-container">
//           <table className="community-table">
//             <thead>
//               <tr>
//                 <th className="table-head">Username</th>
//                 <th className="table-head">Email</th>
//                 <th className="table-head">Role</th>
//                 <th className="table-head">Community</th>
//                 <th className="table-head">User ID</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="table-empty">No users found</td>
//                 </tr>
//               ) : (
//                 allUsers.map((user) => (
//                   <tr key={user._id} className="table-row">
//                     <td className="table-cell">{user.username}</td>
//                     <td className="table-cell">{user.email}</td>
//                     <td className="table-cell">{user.role}</td>
//                     <td className="table-cell">{user.community_name || 'N/A'}</td>
//                     <td className="table-cell">{user._id}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
// 
//       {showAddModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3 className="modal-title">Add Community</h3>
//             <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Community Name" />
//             <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-textarea" placeholder="Description"></textarea>
//             <input type="text" name="leader_id" value={formData.leader_id} onChange={handleInputChange} className="form-input" placeholder="Leader ID" />
//             <div className="modal-actions">
//               <button onClick={() => setShowAddModal(false)} className="cancel-button">Cancel</button>
//               <button onClick={handleAddCommunity} className="submit-button" disabled={!formData.name}>Add</button>
//             </div>
//           </div>
//         </div>
//       )}
// 
//       {showUpdateModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3 className="modal-title">Update Community</h3>
//             <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Community Name" />
//             <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-textarea" placeholder="Description"></textarea>
//             <input type="text" name="leader_id" value={formData.leader_id} onChange={handleInputChange} className="form-input" placeholder="Leader ID" />
//             <div className="modal-actions">
//               <button onClick={() => setShowUpdateModal(false)} className="cancel-button">Cancel</button>
//               <button onClick={handleUpdateCommunity} className="submit-button" disabled={!formData.name}>Update</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// 
// export default AdminCommunitySection;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const AdminCommunitySection = () => {
  const [communities, setCommunities] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCommunityForUpdate, setSelectedCommunityForUpdate] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', leader_id: '' });
  const [allUsers, setAllUsers] = useState([]);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);
  const [userFormData, setUserFormData] = useState({ username: '', email: '', role: '', community_name: '', password: '' });

  useEffect(() => {
    fetchCommunities();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (selectedCommunity) {
      fetchCommunityMembers(selectedCommunity);
    } else {
      setMembers([]);
    }
  }, [selectedCommunity]);

  const fetchCommunities = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/a1/getcommunity');
      if (response.data && Array.isArray(response.data.communities)) {
        setCommunities(response.data.communities);
        setError(null);
        if (response.data.communities.length > 0) {
          setSelectedCommunity(response.data.communities[0].name);
        }
      } else {
        toast.error('Unexpected response format');
      }
    } catch (err) {
      toast.error('Failed to fetch communities');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityMembers = async (communityName) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/auth/members/${encodeURIComponent(communityName)}`);
      setMembers(response.data);
    } catch (err) {
      toast.error('Failed to fetch community members');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/all-users');
      setAllUsers(response.data);
    } catch (err) {
      toast.error('Failed to fetch users');
      console.error(err);
    }
  };

  const handleAddCommunity = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/a1/createcommunity', formData);
      setCommunities([...communities, response.data.community]);
      setShowAddModal(false);
      setFormData({ name: '', description: '', leader_id: '' });
      toast.success('Community created successfully!');
    } catch (err) {
      toast.error('Failed to create community');
      console.error(err);
    }
  };

  const handleUpdateCommunity = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/a1/updatecommunity/${selectedCommunityForUpdate._id}`, formData);
      setCommunities(
        communities.map((c) =>
          c._id === selectedCommunityForUpdate._id ? response.data.community : c
        )
      );
      setShowUpdateModal(false);
      setFormData({ name: '', description: '', leader_id: '' });
      setSelectedCommunityForUpdate(null);
      toast.success('Community updated successfully!');
    } catch (err) {
      toast.error('Failed to update community');
      console.error(err);
    }
  };

  const handleDeleteCommunity = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/a1/deletecommunityid/${id}`);
      setCommunities(communities.filter((c) => c._id !== id));
      if (selectedCommunity === communities.find((c) => c._id === id)?.name) {
        setSelectedCommunity('');
        setMembers([]);
      }
      toast.success('Community deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete community');
      console.error(err);
    }
  };

  const openUpdateModal = (community) => {
    setSelectedCommunityForUpdate(community);
    setFormData({ name: community.name, description: community.description || '', leader_id: community.leader_id || '' });
    setShowUpdateModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Functions for user update
  const openUpdateUserModal = (user) => {
    setSelectedUserForUpdate(user);
    setUserFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      community_name: user.community_name || '',
      password: '' // Password is initially empty; admin can set a new one
    });
    setShowUpdateUserModal(true);
  };

  const handleUserInputChange = (e) => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/update-user', {
        userId: selectedUserForUpdate._id,
        username: userFormData.username,
        email: userFormData.email,
        role: userFormData.role,
        community_name: userFormData.community_name,
        password: userFormData.password || undefined // Only send password if provided
      });

      if (response.data.success) {
        setAllUsers(
          allUsers.map((u) =>
            u._id === selectedUserForUpdate._id ? { ...u, ...response.data.user } : u
          )
        );
        setShowUpdateUserModal(false);
        setUserFormData({ username: '', email: '', role: '', community_name: '', password: '' });
        setSelectedUserForUpdate(null);
        toast.success('User updated successfully!');
      } else {
        toast.error('Failed to update user');
      }
    } catch (err) {
      toast.error('Failed to update user');
      console.error(err);
    }
  };

  return (
    <div className="community-dashboard">
      <h1 className="dashboard-title">Community Dashboard</h1>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="table-section">
        <div className="table-header">
          <h2 className="table-title">Communities</h2>
          <button onClick={() => {
            setFormData({ name: '', description: '', leader_id: '' });
            setShowAddModal(true);
          }} className="add-button">
            Add Community
          </button>
        </div>
        <div className="table-container">
          <table className="community-table">
            <thead>
              <tr>
                <th className="table-head">Name</th>
                <th className="table-head">Description</th>
                <th className="table-head">Leader</th>
                <th className="table-head text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {communities.length === 0 ? (
                <tr>
                  <td colSpan="4" className="table-empty">No communities found</td>
                </tr>
              ) : (
                communities.map((community) => (
                  <tr key={community._id} className="table-row">
                    <td className="table-cell">{community.name}</td>
                    <td className="table-cell">{community.description}</td>
                    <td className="table-cell">{community.leader_id}</td>
                    <td className="table-cell text-right">
                      <button onClick={() => openUpdateModal(community)} className="update-button">Update</button>
                      <button onClick={() => handleDeleteCommunity(community._id)} className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* USER TABLE */}
      <div className="table-section mt-10">
        <h2 className="table-title">Users</h2>
        <div className="table-container">
          <table className="community-table">
            <thead>
              <tr>
                <th className="table-head">Username</th>
                <th className="table-head">Email</th>
                <th className="table-head">Role</th>
                <th className="table-head">Community</th>
                <th className="table-head">User ID</th>
                <th className="table-head text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="table-empty">No users found</td>
                </tr>
              ) : (
                allUsers.map((user) => (
                  <tr key={user._id} className="table-row">
                    <td className="table-cell">{user.username}</td>
                    <td className="table-cell">{user.email}</td>
                    <td className="table-cell">{user.role}</td>
                    <td className="table-cell">{user.community_name || 'N/A'}</td>
                    <td className="table-cell">{user._id}</td>
                    <td className="table-cell text-right">
                      <button onClick={() => openUpdateUserModal(user)} className="update-button">Update</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add Community</h3>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Community Name" />
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-textarea" placeholder="Description"></textarea>
            <input type="text" name="leader_id" value={formData.leader_id} onChange={handleInputChange} className="form-input" placeholder="Leader ID" />
            <div className="modal-actions">
              <button onClick={() => setShowAddModal(false)} className="cancel-button">Cancel</button>
              <button onClick={handleAddCommunity} className="submit-button" disabled={!formData.name}>Add</button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Update Community</h3>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Community Name" />
            <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-textarea" placeholder="Description"></textarea>
            <input type="text" name="leader_id" value={formData.leader_id} onChange={handleInputChange} className="form-input" placeholder="Leader ID" />
            <div className="modal-actions">
              <button onClick={() => setShowUpdateModal(false)} className="cancel-button">Cancel</button>
              <button onClick={handleUpdateCommunity} className="submit-button" disabled={!formData.name}>Update</button>
            </div>
          </div>
        </div>
      )}

      {showUpdateUserModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Update User</h3>
            <input
              type="text"
              name="username"
              value={userFormData.username}
              onChange={handleUserInputChange}
              className="form-input"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={userFormData.email}
              onChange={handleUserInputChange}
              className="form-input"
              placeholder="Email"
            />
            <select
              name="role"
              value={userFormData.role}
              onChange={handleUserInputChange}
              className="form-input"
            >
              <option value="non-member">non-member</option>
              <option value="communityMember">communityMember</option>
              <option value="leader">leader</option>
              <option value="admin">admin</option>
            </select>
            <select
              name="community_name"
              value={userFormData.community_name}
              onChange={handleUserInputChange}
              className="form-input"
            >
              <option value="">None</option>
              {communities.map((community) => (
                <option key={community._id} value={community.name}>
                  {community.name}
                </option>
              ))}
            </select>
            <input
              type="password"
              name="password"
              value={userFormData.password}
              onChange={handleUserInputChange}
              className="form-input"
              placeholder="New Password (leave blank to keep unchanged)"
            />
            <div className="modal-actions">
              <button onClick={() => setShowUpdateUserModal(false)} className="cancel-button">Cancel</button>
              <button
                onClick={handleUpdateUser}
                className="submit-button"
                disabled={!userFormData.username || !userFormData.email}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCommunitySection;