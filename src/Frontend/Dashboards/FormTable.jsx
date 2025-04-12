// import React from 'react'
// 
// const FormTable = () => {
// 
//   return (
//         <div className="box form-section">
//           <h2>Form Management</h2>
//           <div className="form-management-container">
//             <div className="form-table-wrapper">
//               <table className="user-table">
//                 <thead>
//                   <tr>
//                     <th>
//                       <input type="checkbox" />
//                     </th>
//                     <th className="user-name-column">USER NAME</th>
//                     <th className="status-column">STATUS</th>
//                     <th className="email-column">EMAIL</th>
//                     <th className="feedback-column">FEEDBACK</th>
//                     <th className="actions-column"></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <input type="checkbox" />
//                     </td>
//                     <td className="user-name-cell">
//                       <div className="user-avatar">A</div>
//                       <span>Abhishek K.C.</span>
//                     </td>
//                     <td>
//                       <span className="status-badge status-accepted">
//                         Accepted
//                       </span>
//                     </td>
//                     <td>abhi@Gmail.com</td>
//                     <td>Great service!</td>
//                     <td>
//                       <div className="action-menu">
//                         <button className="action-button">...</button>
//                         <div className="status-dropdown">
//                           <button className="status-option status-accepted">
//                             Accepted
//                           </button>
//                           <button className="status-option status-pending">
//                             Pending
//                           </button>
//                           <button className="status-option status-rejected">
//                             Rejected
//                           </button>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <input type="checkbox" />
//                     </td>
//                     <td className="user-name-cell">
//                       <div className="user-avatar">R</div>
//                       <span>Rahul Rana</span>
//                     </td>
//                     <td>
//                       <span className="status-badge status-pending">
//                         Pending
//                       </span>
//                     </td>
//                     <td>rana@Gmail.com</td>
//                     <td>Waiting for more info</td>
//                     <td>
//                       <div className="action-menu">
//                         <button className="action-button">...</button>
//                         <div className="status-dropdown">
//                           <button className="status-option status-accepted">
//                             Accepted
//                           </button>
//                           <button className="status-option status-pending">
//                             Pending
//                           </button>
//                           <button className="status-option status-rejected">
//                             Rejected
//                           </button>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <input type="checkbox" />
//                     </td>
//                     <td className="user-name-cell">
//                       <div className="user-avatar">N</div>
//                       <span>Niraj thapa</span>
//                     </td>
//                     <td>
//                       <span className="status-badge status-rejected">
//                         Rejected
//                       </span>
//                     </td>
//                     <td>thapa1@Gmail.com</td>
//                     <td>Not eligible</td>
//                     <td>
//                       <div className="action-menu">
//                         <button className="action-button">...</button>
//                         <div className="status-dropdown">
//                           <button className="status-option status-accepted">
//                             Accepted
//                           </button>
//                           <button className="status-option status-pending">
//                             Pending
//                           </button>
//                           <button className="status-option status-rejected">
//                             Rejected
//                           </button>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <input type="checkbox" />
//                     </td>
//                     <td className="user-name-cell">
//                       <div className="user-avatar">A</div>
//                       <span>Anp gurung</span>
//                     </td>
//                     <td>
//                       <span className="status-badge status-accepted">
//                         Accepted
//                       </span>
//                     </td>
//                     <td>anupe@Gmail.com</td>
//                     <td>Perfect fit</td>
//                     <td>
//                       <div className="action-menu">
//                         <button className="action-button">...</button>
//                         <div className="status-dropdown">
//                           <button className="status-option status-accepted">
//                             Accepted
//                           </button>
//                           <button className="status-option status-pending">
//                             Pending
//                           </button>
//                           <button className="status-option status-rejected">
//                             Rejected
//                           </button>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <input type="checkbox" />
//                     </td>
//                     <td className="user-name-cell">
//                       <div className="user-avatar">K</div>
//                       <span>Kenab K.C.</span>
//                     </td>
//                     <td>
//                       <span className="status-badge status-accepted">
//                         Accepted
//                       </span>
//                     </td>
//                     <td>Kenab@Gmail.com</td>
//                     <td>Excellent candidate</td>
//                     <td>
//                       <div className="action-menu">
//                         <button className="action-button">...</button>
//                         <div className="status-dropdown">
//                           <button className="status-option status-accepted">
//                             Accepted
//                           </button>
//                           <button className="status-option status-pending">
//                             Pending
//                           </button>
//                           <button className="status-option status-rejected">
//                             Rejected
//                           </button>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
// export default FormTable





import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import useAuthStore from "../Store/authStore";

const FormTable = () => {
  const [applications, setApplications] = useState([]);
  const { token, communityName } = useAuthStore(); // Get leader's communityName

  // Fetch applications on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/a4/applications", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setApplications(response.data.applications);
        console.log("Fetched applications:", response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to fetch applications");
      }
    };
    fetchApplications();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/a4/applications/${applicationId}`,
        { status: newStatus },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  // Get avatar initial
  const getAvatarInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : "?";
  };

  // Capitalize status for display
  const capitalizeStatus = (status) => {
    return status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending";
  };

  return (
    <div className="box form-section">
      <h2>Form Management</h2>
      <div className="form-management-container">
        <div className="form-table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th className="user-name-column">USER NAME</th>
                <th className="status-column">STATUS</th>
                <th className="email-column">EMAIL</th>
                <th className="feedback-column">FEEDBACK</th>
                <th className="actions-column"></th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app._id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="user-name-cell">
                      <div className="user-avatar">{getAvatarInitial(app.username)}</div>
                      <span>{app.username}</span>
                    </td>
                    <td>
                      <span className={`status-badge status-${app.status}`}>
                        {capitalizeStatus(app.status)}
                      </span>
                    </td>
                    <td>{app.email}</td>
                    <td>{app.feedback}</td>
                    <td>
                      <div className="action-menu">
                        <button className="action-button">...</button>
                        <div className="status-dropdown">
                          <button
                            className="status-option status-accepted"
                            onClick={() => handleStatusUpdate(app._id, "accepted")}
                          >
                            Accepted
                          </button>
                          <button
                            className="status-option status-pending"
                            onClick={() => handleStatusUpdate(app._id, "pending")}
                          >
                            Pending
                          </button>
                          <button
                            className="status-option status-rejected"
                            onClick={() => handleStatusUpdate(app._id, "rejected")}
                          >
                            Rejected
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No applications found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormTable;