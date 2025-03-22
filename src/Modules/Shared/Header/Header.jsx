import PropTypes from 'prop-types';

 function Header({strong,title,description,imgSrc,width}) {
  return (
    <>
      <div className="row header py-4 rounded-4 mx-1">
        <div className="col-md-8 d-flex justify-content-center align-items-center text-white">
          <div className="caption pl-3 px-5">
            <h3 className="fw-bold fw-bold fs-2 d-inline mx-1">{strong}</h3>
            <h6 className="d-inline fw-bold fs-4">{title}</h6>
            <p>{description}</p>
          </div>
        </div>
        <div className="col-md-4">
          <img src={imgSrc} alt="img" width={width} />
        </div>
      </div>
    </>
  );
}


// Add prop types validation
Header.propTypes = {
  strong: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
  description: PropTypes.func.isRequired,
  imgSrc: PropTypes.func.isRequired,
  width: PropTypes.func.isRequired,
};
export default Header;
