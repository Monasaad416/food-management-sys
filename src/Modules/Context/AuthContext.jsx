import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./Context.jsx";

// Define the shape of the decoded token

// Create the context with a default value
function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  // Memoized getUserToken
  const getUserToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUserToken = jwtDecode(token);
        setUserData(decodedUserToken);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserData(null); // Clear user data on error
      }
    } else {
      setUserData(null); // Clear user data if no token exists
    }
  }, []); // Stable reference with no dependencies

  useEffect(() => {
    if (getUserToken) {
      getUserToken();
    }
  }, [getUserToken]);


  return (
    <AuthContext.Provider value={{ getUserToken, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

// // function AuthContextProvider({ children }) {
//   const [userData, setUserData] = useState(null);

//   const fetchUserData = async (data) => {
//     try {
//       const response = await publicAxiosInstance.post(USER_URLS.LOGIN, data);
//       setUserData(response.data);
//     } catch (error) {
//       console.error("Failed to fetch user data:", error);
//       setUserData(null);
//     }
//   };

//   const handleLogin = (newToken) => {
//     localStorage.setItem("token", newToken);
//     privateAxiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`; // Update Axios
//     fetchUserData(); // Fetch updated user data immediately
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Clear token
//     setUserData(null); // Clear user data
//     privateAxiosInstance.defaults.headers.Authorization = ""; // Reset Axios headers
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (token) {
//       fetchUserData(); // Fetch data on app load if token exists
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userData, handleLogin, handleLogout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// Add prop types validation
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider };
