import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../Sidebar/Sidebar'
import PropTypes from 'prop-types'

 function MasterLayout({loginData,logout}) {
  return (
    <div className="d-flex">
      <div className="">
        <SideBar loginData={loginData} logout={logout} />
      </div>
      <div className="w-100">
        <Navbar loginData={loginData} />
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
