import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

import PropTypes from 'prop-types'
import SideMenu from '../SideMenu/SideMenu.jsx'; // Correct casing


 function MasterLayout() {
  return (
    <div className="d-flex">
      <div className="">
        <SideMenu />
      </div>
      <div className="w-100">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
 // Add prop types validation
MasterLayout.propTypes = {
  loginData: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}


export default MasterLayout;
