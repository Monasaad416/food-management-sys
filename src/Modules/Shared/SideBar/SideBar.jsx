import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import sidearLogo from "../../../assets/imgs/sidebar-logo.png";
import { useState } from 'react';

export default function SideBar() {
  let navigate = useNavigate();
  let logout= () => {
    localStorage.removeItem('token');
    navigate('/login');
  } 

  let changePassword = () =>{
    navigate('/change-password');
  }
  let [isCollapsed, setItCollapsed] = useState(false);

  let toggleCollapse = () => {
    setItCollapsed(!isCollapsed);
  };

  
  return (
    <div className="sidebar-container vh-100">
      <Sidebar className="" collapsed={isCollapsed}>
        <Menu>
          <div className="d-flex flex-column justify-content-around align-items-around">
            <div>
              <MenuItem
                component={<Link to="/dashboard" className="mt-5 mb-4" />}
                icon={<img src={sidearLogo} className="sidebar-logo" />}
                onClick={toggleCollapse}
                className="logo-link"
              ></MenuItem>
              <MenuItem component={<Link to="/dashboard" />}>
                <i className="fa fa-home mx-2"></i>Home{" "}
              </MenuItem>
              <MenuItem component={<Link to="/dashboard/users" />}>
                <i className="fa-solid fa-user-group mx-2"></i>Users{" "}
              </MenuItem>

              <MenuItem component={<Link to="/dashboard/categories" />}>
                {" "}
                <i className="fa-solid fa-calendar-days mx-2"></i> Categories
              </MenuItem>

              <MenuItem component={<Link to="/dashboard/recipes" />}>
                {" "}
                <i className="fa-solid fa-list mx-2"></i> Recipes List
              </MenuItem>
            </div>
            <div>
              <MenuItem onClick={changePassword} className='mt-5'>
                {" "}
                <i className="fa-solid fa-lock mx-2"></i> Change Password
              </MenuItem>
    
              <MenuItem onClick={logout}>
                {" "}
                <i className="fa-solid fa-right-from-bracket mx-2"></i> Logout
              </MenuItem>
            </div>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
}
