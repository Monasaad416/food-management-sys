import logo from "../../../assets/imgs/logo3.png"
import notFound from "../../../assets/imgs/404-notfound.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-fluid notfound-page position-relative">
      <div className="row">
        <div className="col my-5 mx-5 ">
          <img src={logo} alt="logo" width={300} />
        </div>
        <div className="row">
          <div className="col-md-4 mx-5">
            <div className="d-flex justify-content-center align-items-center mt-5">
              <div>
                <p className="title">Oops.</p>
                <p className="sub-title">Page not found.</p>
                <span>
                  This Page doesn’t exist or was removed! We suggest you back to
                  home
                </span>
                <Link
                  to="/dashboard"
                  className="btn custom-add-modal-btn fw-bold px-5 py-3 my-5"
                >
                  <i className="fa-solid fa-arrow-left mx-1 text-white"></i>
                  Back To Home
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="overlay text-end">
              <img src={notFound} alt="notfound" width={600} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
