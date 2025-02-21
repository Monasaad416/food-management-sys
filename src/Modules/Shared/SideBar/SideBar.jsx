import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logo from "../../../assets/imgs/logo2.png";

export default function SideBar() {
  return (
    <div>
      <Sidebar className="vh-100 w-100 p-0 m-0">
        <Menu>
          <div className="d-flex flex-column justify-content-between align-items-between">
            <div>
              <MenuItem component={<Link to="/dashboard" style="margin:30px"/>}>
                <img src={logo} width={200}/>
              </MenuItem>
              <MenuItem component={<Link to="/dashboard" />}>
                <i className="fa fa-home mx-1"></i>Home{" "}
              </MenuItem>
              <MenuItem component={<Link to="/dashboard/users" />}>
                <i className="fa-solid fa-user-group"></i>Users{" "}
              </MenuItem>
              <MenuItem component={<Link to="/dashboard/categories" />}>
                {" "}
                <i className="fa-solid fa-calendar-days"></i> Categories
              </MenuItem>
            </div>
            <div>
              <MenuItem>
                {" "}
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </MenuItem>
            </div>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
}
