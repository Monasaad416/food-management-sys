import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AuthContext } from "./Context.jsx";

// Define the shape of the decoded token


// Create the context with a default value
function AuthContextProvider({ children }) {
    const [userData, setUserData] = useState(null);

    const getUserToken = () => {
        const encodedUserToken = localStorage.getItem("token");
        if (encodedUserToken) {
            try {
       
                const decodedUserToken = jwtDecode(encodedUserToken);
                console.log(decodedUserToken);
                setUserData(decodedUserToken);
            } catch (error) {
                console.error("Invalid token:", error);
                setUserData(null); // Clear user data on error
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUserToken();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ getUserToken, userData }}>
            {children}
        </AuthContext.Provider>
    );
}


 // Add prop types validation
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export  {AuthContextProvider};

