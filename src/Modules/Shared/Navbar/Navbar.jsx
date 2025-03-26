
import avatar from "../../../assets/imgs/avatar.png"
import { useContext, useEffect  } from "react";
import { AuthContext } from "../../Context/Context";


function Navbar() {
  const authContext = useContext(AuthContext);
  const { getUserToken,userData } = authContext || {};

  useEffect(() => {
    if (getUserToken) {
      getUserToken(); 
    }
  }, [getUserToken]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3 m-3">
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
