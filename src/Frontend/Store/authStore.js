import { create } from 'zustand';

const safeParse = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (!item || item === "undefined") return null;
    const parsed = JSON.parse(item);
    // If parsed result is a string (e.g., user ID), wrap it in an object
    return typeof parsed === 'string' ? { _id: parsed } : parsed;
  } catch (err) {
    console.error(`Error parsing ${key}:`, err);
    return null;
  }
};


const useAuthStore = create((set) => {
  const token = localStorage.getItem('authToken');
  const role = token ? localStorage.getItem('userRole') : null;
  const userData = token ? safeParse('userData') : null;
  const user = userData ? (typeof userData === 'string' ? { _id: userData } : userData) : null;
  const community = token ? safeParse('communityData') : null;
  const communityName = token ? localStorage.getItem('communityName') : null;
  const email = token ? localStorage.getItem('userEmail') : null;
  const username = token ? localStorage.getItem('userName') : null;

  
  console.log("Initial token:", token);
  console.log("Initial role:", role);
  console.log("Initial user data:", user);
  console.log("Initial community data:", community);
  console.log("Initial community name:", communityName);
  console.log("Initial email:", email);
  console.log("Initial username:", username);

  return {
    token,
    role,
    user,
    community,
    communityName,
    email,
    username,

    setAuthData: ({ token, role, user, community, communityName, email, username }) => {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      // Ensure user is stored as an object with _id
      const userData = typeof user === 'string' ? { _id: user } : user;
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('communityData', JSON.stringify(community));
      localStorage.setItem('communityName', communityName);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', username);

      console.log("Auth data set in Zustand and localStorage:");
      console.log("New token:", token);
      console.log("New role:", role);
      console.log("New user data:", userData);
      console.log("New community data:", community);
      console.log("New community name:", communityName);
      console.log("New email:", email);
      console.log("New username:", username);

      set({ token, role, user: userData, community, communityName, email, username });
    },

    clearAuthData: () => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
      localStorage.removeItem('communityData');
      localStorage.removeItem('communityName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');

      console.log("Auth data cleared from Zustand and localStorage");

      set({
        token: null,
        role: null,
        user: null,
        community: null,
        communityName: null,
        email: null,
        username: null,
      });
    },
  };
});

export default useAuthStore;
