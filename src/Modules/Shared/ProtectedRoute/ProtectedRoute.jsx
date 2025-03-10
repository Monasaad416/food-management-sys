import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';



function ProtectedRoute({loginData, children}) {

    if(localStorage.getItem('token') || loginData) return children;
    else return <Navigate to="/login" />;
}

 // Add prop types validation
ProtectedRoute.propTypes = {
  loginData: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
}


export default ProtectedRoute;

