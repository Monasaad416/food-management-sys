import PropTypes from "prop-types";

function Navbar({loginData}) {
  console.log(loginData);
  return (
    
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
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
