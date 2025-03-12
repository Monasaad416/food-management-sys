import Header from "../../Shared/Header/Header";
import recipiesHeader from "../../../assets/imgs/recipies-header.png";
import { useCallback, useEffect, useState } from "react";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import { privateAxiosInstance } from "../../../services/api/apiInstance";
import { CATEGORIES_URLS } from "../../../services/api/apiConfig";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import CategoryData from "../CategoryData/CategoryData";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [showDelete, setShowDelete] = useState(false); //delete modal
  const [showCatForm, setShowCatForm] = useState(false); //add edit modal
  const [categoryId, setCategoryId] = useState(0);
  const [editedCategory, setEditedCategory] = useState(null);
  const [loading,setLoading] = useState(false);

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

  const handleShowCatForm = (id = null) => {
    setShowCatForm(true); // Open add modal
    if (id) setCategoryId(id);
  };

  const handleCloseCatForm = () => {
    setShowCatForm(false); // Close add edit modal
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });

    // setEditedCategory(null);
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
      setLoading(true);
      const response = await privateAxiosInstance.get(
        CATEGORIES_URLS.CATEGORIES
      );
      console.log(response.data.data);
      setCategories(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //fetch cat info if edit flag (categoryId !=null)
  const { setValue } = useForm();
  const fetchCategory = useCallback(async () => {
    if (categoryId) {
      try {

        const response = await privateAxiosInstance.get(
          CATEGORIES_URLS.GET_CATEGORY(categoryId)
        );
        console.log(response?.data);
        setEditedCategory(response?.data);
        setValue("name", response?.data?.name);// didnot work


      } catch (error) {
        console.error("Error fetching category data:", error);
        toast.error("Failed to fetch category data.", {
          theme: "colored",
        });
      }
    }
  }, [categoryId, setEditedCategory]); // Only changes when categoryId or setEditedCategory changes

  useEffect(() => {
    fetchCategory();
  }, [categoryId, setEditedCategory,fetchCategory]);


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
            data-bs-target="#catFormModal"
            onClick={() => handleShowCatForm()}
          >
            Add New Category
          </button>
        </div>
      </div>
      <div className="mx-4">
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "50vh" }}
              >
                {/* Example loader */}
                <BeatLoader color={"#009247"} loading={loading} size={15} />
              </div>
            ) : Array.isArray(categories) && categories.length > 0 ? (
                <table className="table table-striped">
                  <thead className="bg-secondary">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {categories.map((category) => (

                          <tr key={category.id}>
                            <td scope="row">{category.id}</td>
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
                                      data-bs-target="#catFormModal"
                                      onClick={() => handleShowCatForm(category.id)}
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
                              ))}
                  </tbody>
                </table>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <NoData />
              </div>
            )}

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
      <CategoryData
        categoryId={categoryId}
        showCatForm={showCatForm}
        getAllCategories={getAllCategories}
        handleCloseCatForm={handleCloseCatForm}
        editedCategory={editedCategory}
      />
      {/* End add modal */}
    </>
  );
}
