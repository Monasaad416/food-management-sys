
import avatar from "../../../assets/imgs/avatar.png"
import { useContext, useEffect  } from "react";
import { AuthContext } from "../../Context/Context";


function Navbar() {

  const authContext = useContext(AuthContext); 
  const { userData, getUserToken } = authContext || {}

  useEffect(() => {
    if (authContext) {
      getUserToken(); // Call only if authContext exists
    }
  }, [authContext,getUserToken]); 
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3 m-4">
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <img src={avatar} alt="avatar" />
                <p className="mx-2 d-inline">{userData?.userName}</p>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
