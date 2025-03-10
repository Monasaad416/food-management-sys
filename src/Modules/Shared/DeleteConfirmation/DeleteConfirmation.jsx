import PropTypes from "prop-types";
import modalImg from "../../../assets/imgs/modalImg.png";
 function DeleteConfirmation({ showDelete, handleCloseDelete ,deleteFunction,deletedItem}) {
  return (
    <div
      className={`modal ${showDelete == true ? "show fade" : ""}`}
      id="deleteModal"
      tabIndex={-1}
      style={{ display: showDelete == true ? "block" : "none" }}
      aria-hidden={!showDelete}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header ms-auto">
            <button
              type="button"
              className="custom-btn-close ms-4"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseDelete}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="modal-body text-center">
            <img
              src={modalImg}
              width={165}
              height={200}
              alt="delete category"
            />
            <br />
            <h5 className="delete-title my-4 fw-bold">Delete this item?</h5>
            <span className="delete-text">
              Are you sure you want to delete this item? If so, click `Delete`.
            </span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn custom-close-modal-btn fw-bold my-3"
              onClick={() => deleteFunction()}
            >
              Delete {deletedItem}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// Add prop types validation
DeleteConfirmation.propTypes = {
  showDelete: PropTypes.func.isRequired,
  handleCloseDelete: PropTypes.func.isRequired,
  deleteFunction: PropTypes.func.isRequired,
  deletedItem: PropTypes.func.isRequired,
};
export default DeleteConfirmation;
