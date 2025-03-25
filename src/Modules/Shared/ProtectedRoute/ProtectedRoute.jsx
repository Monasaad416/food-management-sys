import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/Context";

function ProtectedRoute({ children }) {
  

    const authContext = useContext(AuthContext); 
    const { userData, getUserToken } = authContext || {}
  
    useEffect(() => {
      if (authContext) {
        getUserToken(); // Call only if authContext exists
      }
    }, [authContext,getUserToken]);  
  if (localStorage.getItem("token") || userData) return children;
  else return <Navigate to="/login" />;
}

// Add prop types validation
ProtectedRoute.propTypes = {
  loginData: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default ProtectedRoute;
