import PropTypes from "prop-types";
import avatar from "../../../assets/imgs/avatar.png"
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";

function Navbar() {
 let { userData } = useContext(AuthContext); 
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3 m-4">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <img src={avatar} alt="avatar" />
                  {userData?.userName}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
// Add prop types validation
Navbar.propTypes = {
  loginData: PropTypes.func.isRequired
}
export default Navbar;
