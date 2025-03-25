import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/Context";

function ProtectedRoute({ children }) {
  


  const authContext = useContext(AuthContext);
  const { getUserToken, userData } = authContext || {};

  useEffect(() => {
    if (getUserToken) {
      getUserToken();
    }
  }, [getUserToken]);
 
  if (localStorage.getItem("token") || userData) return children;
  else return <Navigate to="/login" />;
}

// Add prop types validation
ProtectedRoute.propTypes = {
  loginData: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default ProtectedRoute;
