import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Context';
import { BeatLoader } from 'react-spinners';



function ProtectedRoute({ children}) {

    const authContext = useContext(AuthContext);
    // Check if authContext is null
    if (!authContext) {
      return (
        <div>
          <BeatLoader color={"#a0a0a0"} loading={true} size={15} />
        </div>
      ); //  handle the null case
    }
    const { userData } = authContext;
    if (localStorage.getItem("token") || userData) return children;
    else return <Navigate to="/login" />;
}

 // Add prop types validation
ProtectedRoute.propTypes = {
  loginData: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
}


export default ProtectedRoute;

