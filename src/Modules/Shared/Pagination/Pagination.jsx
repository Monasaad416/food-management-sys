import PropTypes from "prop-types";

 function Pagination({
  loading,
  currentPage,
  getAllItems,
  setCurrentPage,
  numOfPagesArray,
  items
}) {
  return (
    <div>
      {" "}
      {!loading && Array.isArray(items) && items.length > 0 ? (
        <div className="d-flex justify-content-center align-items-center my-5">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage == 1 ? "disabled" : ""}`}
                onClick={() => {
                  if (currentPage == 1) {
                    return;
                  } else {
                    getAllItems(5, currentPage - 1 ,null,null,null);
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              {numOfPagesArray.map((pageNum) => (
                <li
                  className={`page-item ${
                    currentPage == pageNum ? "active" : ""
                  }`}
                  key={`page-${pageNum}`}

                  onClick={() => {
                    getAllItems(5, pageNum,null,null,null);
                    setCurrentPage(pageNum);
                  }}
                >
                  <a className="page-link" href="#">
                    {pageNum}
                  </a>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === numOfPagesArray.length ? "disabled" : ""
                }`}
                onClick={() => {
                  if (currentPage < numOfPagesArray.length) {
                    getAllItems(5, currentPage+1 ,null,null,null);
                    setCurrentPage(currentPage+1);
                  } else {
                    return;
                  }
                }}
              >
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

// Add prop types validation
Pagination.propTypes = {
  loading: PropTypes.func.isRequired,
  currentPage: PropTypes.func.isRequired,
  getAllItems: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  numOfPagesArray: PropTypes.func.isRequired,
  items: PropTypes.func.isRequired,
};
export default Pagination;

