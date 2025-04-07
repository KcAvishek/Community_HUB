// import { create } from 'zustand';
// 
// const useAuthStore = create((set) => {
//   // Get auth data from localStorage 
//   const token = localStorage.getItem('authToken');
//   const role = token ? 'some role from localStorage' : null; // Replace with actual role from localStorage
//   const community = token ? 'some community from localStorage' : null; // Replace with actual community from localStorage
// 
//   return {
//     token,
//     role,
//     community,
//     setAuthData: ({ token, role, community }) => set({ token, role, community }),
//     clearAuthData: () => set({ token: null, role: null, community: null }),
//   };
// });
// 
// export default useAuthStore;
// 


import { create } from 'zustand';

const useAuthStore = create((set) => {
  const token = localStorage.getItem('authToken');
  const role = token ? 'some role from localStorage' : null;
  const community = token ? JSON.parse(localStorage.getItem('communityData')) : null;
  const communityName = token ? localStorage.getItem('communityName') : null; // Store the community name entered by the user

  return {
    token,
    role,
    community,
    communityName, // Add communityName here
    setAuthData: ({ token, role, community, communityName }) => {
      // Store data in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('communityData', JSON.stringify(community));
      localStorage.setItem('communityName', communityName); // Store community name in localStorage
      set({ token, role, community, communityName }); // Update Zustand state
    },
    clearAuthData: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('communityData');
      localStorage.removeItem('communityName'); // Clear community name from localStorage
      set({ token: null, role: null, community: null, communityName: null });
    },
  };
});

export default useAuthStore;

