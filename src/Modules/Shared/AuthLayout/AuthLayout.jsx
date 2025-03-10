import { Outlet } from 'react-router-dom'
import logo3 from "../../../assets/imgs/logo3.png";

export default function AuthLayout() {
  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row justify-content-center align-items-center vh-100 ">
            <div className="bg-white w-50 rounded-3 px-5 py-5 mx-5">
              <div className="logo text-center">
                <img src={logo3} alt="logo" width="300" />
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
