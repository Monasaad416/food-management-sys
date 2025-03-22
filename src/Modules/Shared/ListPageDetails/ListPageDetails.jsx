import PropTypes from 'prop-types';
import React from 'react'

function ListPageDetails({title,subTitle,handleShow,item}) {
  return (
    <div className="d-flex justify-content-between flex-direction-sm-row flex-direction-column mx-md-4 my-5">
      <div className="details">
        <p>{title}</p>
        <span className="text-muted">{subTitle}</span>
      </div>
      <div>
        <button
          className="btn btn-custom px-md-5 px-3"
          data-bs-toggle="modal"
          data-bs-target="#catFormModal"
          onClick={() => handleShow()}
        >
          Add {item}
        </button>
      </div>
    </div>
  );
}


// Add prop types validation
ListPageDetails.propTypes = {
  title: PropTypes.func.isRequired,
  subTitle: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  item: PropTypes.func.isRequired,
};
export default ListPageDetails;

