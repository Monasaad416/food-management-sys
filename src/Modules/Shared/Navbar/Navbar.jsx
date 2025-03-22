
import avatar from "../../../assets/imgs/avatar.png"
import { useContext  } from "react";
import { AuthContext } from "../../Context/Context";
import { BeatLoader } from "react-spinners";

function Navbar() {

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return (
      <div>
        <BeatLoader color={"#009247"} loading={true} size={15} />
      </div>
    ); 
  }
  const { userData } = authContext;
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3 m-4">
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <img src={avatar} alt="avatar" />
                {userData?.userName}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
