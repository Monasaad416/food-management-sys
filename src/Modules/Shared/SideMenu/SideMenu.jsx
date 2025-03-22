import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import sidearLogo from "../../../assets/imgs/sidebar-logo.png";
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../Context/Context.jsx';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

function SideMenu() {
  const navigate = useNavigate();
  // collapse sidebar start
  const [isCollapsed, setIsCollapsed] = useState(false);
  //toggle mobile menu start
  // const [isToggled, setIsToggled] = useState(false);

  const [width,setWidth] = useState(0)
  // const [displayMenuBtn, setDisplayMenuBtn] = useState(0);
  // const [breakPoint, setBreakPoint] = useState(false);
  function getScreenSize(){
    setWidth(window.innerWidth);
  }

  useEffect(()=>{
    window.addEventListener("resize", getScreenSize);
    if(width < 400 ){
      setIsCollapsed(true)
      // setDisplayMenuBtn("")
      // setBreakPoint(true)
    } else{
      setIsCollapsed(false)
      // setDisplayMenuBtn("display");
      // setBreakPoint(false);
    }

  },[width])


  const authContext = useContext(AuthContext);
  // Check if authContext is null
  if (!authContext) {
    return (
      <div>
        <BeatLoader color={"#009247"} loading={true} size={15} />
      </div>
    ); //  handle the null case
  }
  const { userData } = authContext;

  const changePassword = () => {
    navigate("/change-password");
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  // collapse sidebar end

  //toggle mobile menu end

  const logout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
      toast.success("Logout Successfully!");
      // setTimeout(() =>{

      // }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Logout Failed!", {
        theme: "colored",
      });
    }
  };

  return (
    <div className="sidebar-container vh-100">
      {/* <button className="btn d-md-none">
        <i
          className="fa-solid fa-bars"
          onClick={() => setIsToggled(!isToggled)}
        ></i>
      </button> */}
      <Sidebar

        transitionDuration={800}

        collapsed={isCollapsed}
  
      >
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

              {userData?.userGroup != "SystemUser" ? (
                <MenuItem component={<Link to="/dashboard/users" />}>
                  <i className="fa-solid fa-user-group mx-2"></i>Users{" "}
                </MenuItem>
              ) : (
                ""
              )}

              {userData?.userGroup != "SystemUser" ? (
                <MenuItem component={<Link to="/dashboard/categories" />}>
                  {" "}
                  <i className="fa-solid fa-calendar-days mx-2"></i> Categories
                </MenuItem>
              ) : (
                ""
              )}

              <MenuItem component={<Link to="/dashboard/recipes" />}>
                {" "}
                <i className="fa-solid fa-list mx-2"></i> Recipes List
              </MenuItem>

              {userData?.userGroup == "SystemUser" ? (
                <MenuItem component={<Link to="/dashboard/favourits" />}>
                  {" "}
                  <i className="fa-solid fa-heart mx-2"></i> Favourits
                </MenuItem>
              ) : (
                ""
              )}
            </div>
            <div>
              <MenuItem onClick={changePassword} className="mt-5">
                {" "}
                <i className="fa-solid fa-lock mx-2"></i> Change Password
              </MenuItem>

              <MenuItem
                onClick={() => {
                  console.log("Navigating to /dashboard");
                  logout();
                  navigate("/login");
                }}
              >
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

// Add prop types validation
SideMenu.propTypes = {
  authContext: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};
export default SideMenu;

