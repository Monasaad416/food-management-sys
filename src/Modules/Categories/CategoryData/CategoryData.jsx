import { useForm } from "react-hook-form";
import { privateAxiosInstance } from "../../../services/api/apiInstance";
import { CATEGORIES_URLS } from "../../../services/api/apiConfig";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect } from "react";

function CategoryData({showCatForm,getAllCategories,handleCloseCatForm,categoryId,setEditedCategory}) {
  //add category start
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue

  } = useForm();

  const addCategory = async (data) => {
    try {
      await privateAxiosInstance.post(CATEGORIES_URLS.CREATE_CATEGORY, data);

      toast.success("New category created successfully");

      getAllCategories();
      handleCloseCatForm();
    } catch (error) {
      toast.error(error.message);
    }
  };
  //add category end

  //edit category start

    //fetch cat info if edit flag (categoryId !=null)

    const fetchCategory = useCallback(async () => {
      if (categoryId) {
        try {
  
          const response = await privateAxiosInstance.get(
            CATEGORIES_URLS.GET_CATEGORY(categoryId)
          );
          // console.log(response?.data);
          setEditedCategory(response?.data);
          setValue("name", response?.data?.name);
  
  
        } catch (error) {
          console.error("Error fetching category data:", error);
          toast.error("Failed to fetch category data.", {
            theme: "colored",
          });
        }
      } else {
        setValue("name"," ");
      }
    }, [categoryId, setEditedCategory,setValue]); // Only changes when categoryId or setEditedCategory changes
  
    useEffect(() => {
      fetchCategory();
    }, [fetchCategory]);

  const updateCategory = async (data) => {
    try {
      await privateAxiosInstance.put(CATEGORIES_URLS.UPDATE_CATEGORY(categoryId), data);

      toast.success("Category updated successfully");

      getAllCategories();
      setEditedCategory(null);
      handleCloseCatForm();
    } catch (error) {
      toast.error(error.message);
    }
  };
;
  //edit category end
  return (
    <form onSubmit={categoryId ? handleSubmit(updateCategory) : handleSubmit(addCategory)} className="px-5">
      <div
        className={`modal ${showCatForm == true ? "show fade" : ""}`}
        id="catFormModal"
        tabIndex={-1}
        style={{ display: showCatForm == true ? "block" : "none" }}
        aria-hidden={!showCatForm}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="add-title fw-bold start">
                {categoryId ? "Edit" : "Add"} Category
              </h5>
              <button
                type="button"
                className="custom-btn-close ms-4"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseCatForm}
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
                {isSubmitting ? (
                  <BeatLoader
                    color={"white"}
                    loading={true}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : categoryId ? (
                  "Edit"
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}


// Add prop types validation
CategoryData.propTypes = {
  getAllCategories: PropTypes.func.isRequired,
  handleCloseCatForm: PropTypes.func.isRequired,
  showCatForm: PropTypes.func.isRequired,
  categoryId: PropTypes.func.isRequired,
  editedCategory: PropTypes.func.isRequired,
  setEditedCategory: PropTypes.func.isRequired,
};
export default CategoryData;