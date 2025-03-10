import Header from "../../Shared/Header/Header";
import recipiesHeader from "../../../assets/imgs/recipies-header.png";
import { useEffect, useState } from "react";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import { privateAxiosInstance } from "../../../services/api/apiInstance";
import { CATEGORIES_URLS } from "../../../services/api/apiConfig";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import { useForm } from "react-hook-form";

export default function CategoriesList() {
  //add category start
    const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
    } = useForm();

    const addCategory = async (data) => {
      try {
        await privateAxiosInstance.post(CATEGORIES_URLS.CREATE_CATEGORY, data);

        toast.success("New category created successfully", {
          theme: "colored",
        });

        getAllCategories();
        handleCloseAdd();
      } catch (error) {
        toast.error(error.message, {
          theme: "colored",
        });
      }
    };
  //add category end
  const [categories, setCategories] = useState([]);

  const [showDelete, setShowDelete] = useState(false); //delete modal
  const [showAdd, setShowAdd] = useState(false); //add modal
  const [categoryId, setCategoryId] = useState(0);

  const handleShowDelete = (id) => {
    setShowDelete(true); // Open delete modal
    setCategoryId(id);
  };

  const handleCloseDelete = () => {
    setShowDelete(false); // Close delete modal
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });
  };

  const handleShowAdd = () => {
    setShowAdd(true); // Open add modal
  };

  const handleCloseAdd = () => {
    setShowAdd(false); // Close add modal
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });
  };
  const deleteCategory = async () => {
    try {
      const response = await privateAxiosInstance.delete(
        `${CATEGORIES_URLS.DELETE_CATEGORY(categoryId)}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (response.status === 200) {
        toast.success("Category deleted successfully", {
          theme: "colored",
        });

        handleCloseDelete();
        getAllCategories();
      } else {
        console.error("Expected an array but got:", response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllCategories = async () => {
    try {
      const response = await privateAxiosInstance.get(
        CATEGORIES_URLS.CATEGORIES
      );
      console.log(response.data.data);
      setCategories(response?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);



  

  return (
    <>
      <Header
        strong="Categories"
        title="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgSrc={recipiesHeader}
        width={170}
      />
      <div className="d-flex justify-content-between mx-4 my-5">
        <div className="details">
          <h3>Categories Table Details</h3>
          <span className="text-muted">You can check all details</span>
        </div>
        <div>
          <button
            className="btn btn-custom fw-bold"
            data-bs-toggle="modal"
            data-bs-target="#addModal"
            onClick={() => handleShowAdd()}
          >
            Add New Category
          </button>
        </div>
      </div>
      <div className="mx-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(categories) ? (
              categories.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td>
                    <div className="dropdown">
                      <i
                        className="fa-solid fa-ellipsis"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li className="dropdown-item">
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            onClick={() => handleShowDelete(category.id)}
                            className="d-flex align-items-center text-decoration-none action-anchor"
                          >
                            <i className="fa fa-edit d-inline action-icon me-1"></i>
                            <span> Edit</span>
                          </a>
                        </li>

                        <li className="dropdown-item">
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            onClick={() => handleShowDelete(category.id)}
                            className="d-flex align-items-center text-decoration-none action-anchor"
                          >
                            <i className="fa fa-trash d-inline action-icon me-1"></i>
                            <span> Delete</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <NoData />
              </div>
            )}
          </tbody>
        </table>
      </div>
      {/* start delete modal */}
      <DeleteConfirmation
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        deleteFunction={deleteCategory}
        deletedItem={"Category"}
      />
      {/* End delete modal */}

      {/* start add modal */}
      <form onSubmit={handleSubmit(addCategory)} className="px-5">
        <div
          className={`modal ${showAdd == true ? "show fade" : ""}`}
          id="addModal"
          tabIndex={-1}
          style={{ display: showAdd == true ? "block" : "none" }}
          aria-hidden={!showAdd}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="add-title fw-bold start">Add Category</h5>
                <button
                  type="button"
                  className="custom-btn-close ms-4"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseAdd}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="modal-body">
                <span className="add-text">
                  {/* category */}
                  <div className="input-group my-3">
                    <input
                      {...register("name", {
                        required: "category name is required",
                      })}
                      type="text"
                      className="form-control"
                      placeholder="category name"
                      aria-label="category name"
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  {errors.name && (
                    <p className="text-danger pb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn custom-add-modal-btn fw-bold my-3"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* End add modal */}
    </>
  );
}
