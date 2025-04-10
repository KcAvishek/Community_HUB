// import { create } from 'zustand';
// 
// const useAuthStore = create((set) => {
//   const token = localStorage.getItem('authToken');
//   const role = token ? 'some role from localStorage' : null;
//   const community = token ? JSON.parse(localStorage.getItem('communityData')) : null;
//   const communityName = token ? localStorage.getItem('communityName') : null; // Store the community name entered by the user
// 
//   return {
//     token,
//     role,
//     community,
//     communityName, // Add communityName here
//     setAuthData: ({ token, role, community, communityName }) => {
//       // Store data in localStorage
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('communityData', JSON.stringify(community));
//       localStorage.setItem('communityName', communityName); // Store community name in localStorage
//       set({ token, role, community, communityName }); // Update Zustand state
//     },
//     clearAuthData: () => {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('communityData');
//       localStorage.removeItem('communityName'); // Clear community name from localStorage
//       set({ token: null, role: null, community: null, communityName: null });
//     },
//   };
// });
// 
// export default useAuthStore;
// 





// 
// import { create } from 'zustand';
// 
// const safeParse = (key) => {
//   try {
//     const item = localStorage.getItem(key);
//     return item && item !== "undefined" ? JSON.parse(item) : null;
//   } catch (err) {
//     console.error(`Error parsing ${key}:`, err);
//     return null;
//   }
// };
// 
// const useAuthStore = create((set) => {
//   const token = localStorage.getItem('authToken');
//   const role = token ? localStorage.getItem('userRole') : null;
//   const user = token ? safeParse('userData') : null;
//   const community = token ? safeParse('communityData') : null;
//   const communityName = token ? localStorage.getItem('communityName') : null;
// 
//   return {
//     token,
//     role,
//     user,
//     community,
//     communityName,
// 
//     setAuthData: ({ token, role, user, community, communityName }) => {
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('userData', JSON.stringify(user));
//       localStorage.setItem('communityData', JSON.stringify(community));
//       localStorage.setItem('communityName', communityName);
// 
//       set({ token, role, user, community, communityName });
//     },
// 
//     clearAuthData: () => {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('userData');
//       localStorage.removeItem('communityData');
//       localStorage.removeItem('communityName');
// 
//       set({
//         token: null,
//         role: null,
//         user: null,
//         community: null,
//         communityName: null,
//       });
//     },
//   };
// });
// 
// export default useAuthStore;










// import { create } from 'zustand';
// 
// const safeParse = (key) => {
//   try {
//     const item = localStorage.getItem(key);
//     return item && item !== "undefined" ? JSON.parse(item) : null;
//   } catch (err) {
//     console.error(`Error parsing ${key}:`, err);
//     return null;
//   }
// };
// 
// const useAuthStore = create((set) => {
//   const token = localStorage.getItem('authToken');
//   const role = token ? localStorage.getItem('userRole') : null;
//   const user = token ? safeParse('userData') : null;
//   const community = token ? safeParse('communityData') : null;
//   const communityName = token ? localStorage.getItem('communityName') : null;
// 
//   // Debugging: log the initial auth data when the store is created
//   console.log("Initial token:", token);
//   console.log("Initial role:", role);
//   console.log("Initial user data:", user);
//   console.log("Initial community data:", community);
//   console.log("Initial community name:", communityName);
// 
//   return {
//     token,
//     role,
//     user,
//     community,
//     communityName,
// 
//     setAuthData: ({ token, role, user, community, communityName }) => {
//       // Store authentication data in localStorage
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('userData', JSON.stringify(user));
//       localStorage.setItem('communityData', JSON.stringify(community));
//       localStorage.setItem('communityName', communityName);
// 
//       // Debugging: log the auth data being set in Zustand
//       console.log("Auth data set in Zustand and localStorage:");
//       console.log("New token:", token);
//       console.log("New role:", role);
//       console.log("New user data:", user);
//       console.log("New community data:", community);
//       console.log("New community name:", communityName);
// 
//       set({ token, role, user, community, communityName });
//     },
// 
//     clearAuthData: () => {
//       // Clear authentication data from localStorage
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('userData');
//       localStorage.removeItem('communityData');
//       localStorage.removeItem('communityName');
// 
//       // Debugging: log the auth data being cleared
//       console.log("Auth data cleared from Zustand and localStorage");
// 
//       set({
//         token: null,
//         role: null,
//         user: null,
//         community: null,
//         communityName: null,
//       });
//     },
//   };
// });
// 
// export default useAuthStore;






// 
// 
// import { create } from 'zustand';
// 
// // Utility function to safely parse data from localStorage
// const safeParse = (key) => {
//   try {
//     const item = localStorage.getItem(key);
//     return item && item !== "undefined" ? JSON.parse(item) : null;
//   } catch (err) {
//     console.error(`Error parsing ${key}:`, err);
//     return null;
//   }
// };
// 
// // Create the Zustand store
// const useAuthStore = create((set) => {
//   const token = localStorage.getItem('authToken');
//   const role = token ? localStorage.getItem('userRole') : null;
//   const user = token ? safeParse('userData') : null;  // user stores the _id of the logged-in user
//   const community = token ? safeParse('communityData') : null;
//   const communityName = token ? localStorage.getItem('communityName') : null;
// 
//   // Debugging: log the initial auth data when the store is created
//   console.log("Initial token:", token);
//   console.log("Initial role:", role);
//   console.log("Initial user data:", user);
//   console.log("Initial community data:", community);
//   console.log("Initial community name:", communityName);
// 
//   return {
//     token,
//     role,
//     user,  // This stores the _id of the user
//     community,
//     communityName,
// 
//     // Action to set authentication data
//     setAuthData: ({ token, role, user, community, communityName }) => {
//       // Store authentication data in localStorage
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('userData', JSON.stringify(user));  // Store _id of user
//       localStorage.setItem('communityData', JSON.stringify(community));
//       localStorage.setItem('communityName', communityName);
// 
//       // Debugging: log the auth data being set in Zustand
//       console.log("Auth data set in Zustand and localStorage:");
//       console.log("New token:", token);
//       console.log("New role:", role);
//       console.log("New user data (user _id):", user);
//       console.log("New community data:", community);
//       console.log("New community name:", communityName);
// 
//       // Update Zustand store state
//       set({ token, role, user, community, communityName });
//     },
// 
//     // Action to clear authentication data
//     clearAuthData: () => {
//       // Clear authentication data from localStorage
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('userData');
//       localStorage.removeItem('communityData');
//       localStorage.removeItem('communityName');
// 
//       // Debugging: log the auth data being cleared
//       console.log("Auth data cleared from Zustand and localStorage");
// 
//       // Reset Zustand store state
//       set({
//         token: null,
//         role: null,
//         user: null,  // Reset user data (_id)
//         community: null,
//         communityName: null,
//       });
//     },
//   };
// });
// 
// export default useAuthStore;





import { create } from 'zustand';

const safeParse = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item && item !== "undefined" ? JSON.parse(item) : null;
  } catch (err) {
    console.error(`Error parsing ${key}:`, err);
    return null;
  }
};

const useAuthStore = create((set) => {
  const token = localStorage.getItem('authToken');
  const role = token ? localStorage.getItem('userRole') : null;
  // Ensure user is an object with _id
  const user = token ? safeParse('userData') : null; // This should be an object like { _id: "..." }
  const community = token ? safeParse('communityData') : null;
  const communityName = token ? localStorage.getItem('communityName') : null;

  console.log("Initial token:", token);
  console.log("Initial role:", role);
  console.log("Initial user data:", user);
  console.log("Initial community data:", community);
  console.log("Initial community name:", communityName);

  return {
    token,
    role,
    user, // This should be an object
    community,
    communityName,

    setAuthData: ({ token, role, user, community, communityName }) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      // Ensure user is stored as an object
      localStorage.setItem('userData', JSON.stringify(user)); // user should be an object here
      localStorage.setItem('communityData', JSON.stringify(community));
      localStorage.setItem('communityName', communityName);

      console.log("Auth data set in Zustand and localStorage:");
      console.log("New token:", token);
      console.log("New role:", role);
      console.log("New user data:", user);
      console.log("New community data:", community);
      console.log("New community name:", communityName);

      set({ token, role, user, community, communityName });
    },

    clearAuthData: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
      localStorage.removeItem('communityData');
      localStorage.removeItem('communityName');

      console.log("Auth data cleared from Zustand and localStorage");

      set({
        token: null,
        role: null,
        user: null,
        community: null,
        communityName: null,
      });
    },
  };
});

export default useAuthStore;