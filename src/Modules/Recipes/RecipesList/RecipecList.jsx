import Header from "../../Shared/Header/Header";
import recipiesHeader from "../../../assets/imgs/recipies-header.png";
import { useContext, useEffect, useState } from "react";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import noImage from "../../../assets/imgs/modalImg.png";
import {
  IMAGE_URL,
  privateAxiosInstance,
} from "../../../services/api/apiInstance";
import { FAVS_URLS, RECIPES_URLS } from "../../../services/api/apiConfig";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import { BeatLoader } from "react-spinners";
import Pagination from "../../Shared/Pagination/Pagination";
import getCategories from "../../../Utilities/GetCategories.js";
import getAllTags from "../../../Utilities/GetTags.js";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Context.jsx";
import { useForm } from "react-hook-form";

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  //delete modal
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const [numOfPagesArray, setNumOfPagesArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [tagId, setTagId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const pageSize = 10000000000; // high page size to get all categories in one select
  const pageNumber = 1;

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  const handleShowDelete = (id) => {
    setShowDelete(true); // Open modal
    setRecipeId(id);
  };

  const handleCloseDelete = () => {
    setShowDelete(false); // Close modal
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });
  };

  const handleShowDetails = (id) => {
    setShowDetails(true); // Open modal
    setRecipeId(id);
    getRecipeById(id);
  };

  const handleCloseDetails = () => {
    setShowDetails(false); // Close modal
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });
  };

  const deleteRecipe = async () => {
    try {
      const response = await privateAxiosInstance.delete(
        `${RECIPES_URLS.DELETE_RECIPE(recipeId)}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (response.status === 200) {
        toast.success("Recipe deleted successfully");

        handleCloseDelete();
        getAllRecipes(5, 1);
      } else {
        console.error("Expected an array but got:", response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToFavs = async (data) => {
    try {
      const response = await privateAxiosInstance.post(
        `${FAVS_URLS.CREATE_FAV_RECIPE}`,
        {
          recipeId: data?.recipeId, // Send recipeId from form data
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      console.log(response);
      handleCloseDetails();
      navigate("/dashboard/favourits");
      toast.success("Recipe added to favourite successfully");
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  const getAllRecipes = async (
    pageSize,
    pageNumber,
    name,
    tagId,
    categoryId
  ) => {
    try {
      setLoading(true);
      const response = await privateAxiosInstance.get(RECIPES_URLS.RECIPES, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          name: name,
          tagId: tagId,
          categoryId: categoryId,
        },
      });
      // console.log(response.data.data);
      setRecipes(response?.data?.data);
      setNumOfPagesArray(
        Array(response?.data?.totalNumberOfPages)
          .fill()
          .map((_, index) => index + 1)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getRecipeById = async (id) => {
    console.log(id);
    const response = await privateAxiosInstance.get(
      RECIPES_URLS.GET_RECIPE(id)
    );

    console.log(response);

    setRecipe(response?.data);
    setValue("recipeId", response?.data?.id);
  };
  useEffect(() => {
    getAllRecipes(5, 1);
    setCurrentPage(1);
    getAllTags(setTags);
    const fetchAll = async () => {
      try {
        await getCategories({
          setLoading,
          setCategories,
          setNumOfPagesArray,
          pageSize: 10000000,
          pageNumber: 1,
        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAll();
  }, [pageSize, pageNumber]);

  const authContext = useContext(AuthContext);
  const { getUserToken, userData } = authContext || {}; 

  useEffect(() => {
    if (getUserToken) {
      getUserToken(); 
    }
  }, [getUserToken]);

  const getNameValue = (e) => {
    const nameValue = e.target.value.toLowerCase();
    console.log(nameValue);
    setName(nameValue);
    getAllRecipes(5, 1, nameValue, tagId, categoryId);
  };

  const getTagIdValue = (e) => {
    setTagId(e.target.value);
    getAllRecipes(5, 1, name, e.target.value, categoryId);
  };

  const getCategoryIdValue = (e) => {
    setCategoryId(e.target.value);
    getAllRecipes(5, 1, name, tagId, e.target.value);
  };

  // useEffect(() => {
  //   getAllRecipes(5, 1);
  //   setCurrentPage(1);
  //   getCategories({
  //     setLoading:true,
  //     setCategories,
  //     setNumOfPagesArray,
  //     fetchAll: true,
  //   });

  //       getAllTags();
  // }, []);

  return (
    <div>
      <Header
        strong="Recipes"
        title="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgSrc={recipiesHeader}
        width={170}
      />
      <div className="d-flex justify-content-between mx-4 my-5">
        <div className="details">
          <h3>Recipes Table Details</h3>
          <span className="text-muted">You can check all details</span>
        </div>
        {userData?.userGroup != "SystemUser" ? (
          <div>
            <Link
              to="/dashboard/recipes/create-recipe"
              className="btn btn-custom fw-bold"
            >
              Add New Recipe
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="row my-5 mx-4">
        <div className="col-8">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <input
            type="text"
            className="form-control"
            placeholder="search here..."
            onChange={getNameValue}
          />
        </div>
        <div className="col-2">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={getTagIdValue}
          >
            <option value="">tag</option>
            {tags?.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-2">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={getCategoryIdValue}
          >
            <option value="">category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
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
        ) : Array.isArray(recipes) && recipes.length > 0 ? (
          <div>
            <table className="table table-striped">
              <thead style={{ backgroundColor: "gray" }}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Creation Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td scope="row">{recipe?.id}</td>
                    <td>{recipe?.name}</td>
                    <td>
                      <img
                        src={
                          recipe?.imagePath
                            ? `${IMAGE_URL}/${recipe?.imagePath}`
                            : noImage
                        }
                        width={80}
                      />
                    </td>
                    <td>{recipe?.price}</td>
                    <td>
                      {recipe?.creationDate
                        ? new Date(recipe.creationDate)
                            .toISOString()
                            .split("T")[0]
                        : "N/A"}{" "}
                      {/* Default to 'N/A' if creationDate is null/undefined */}
                    </td>

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
                          {userData?.userGroup != "SystemUser" ? (
                            <div>
                              <li className="dropdown-item">
                                <Link
                                  to={`/dashboard/recipes/${recipe?.id}`}
                                  onClick={() => handleShowDelete(recipe?.id)}
                                  className="d-flex align-items-center text-decoration-none action-anchor"
                                >
                                  <i className="fa fa-edit d-inline action-icon me-1"></i>
                                  <span> Edit</span>
                                </Link>
                              </li>

                              <li className="dropdown-item">
                                <a
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteModal"
                                  onClick={() => handleShowDelete(recipe?.id)}
                                  className="d-flex align-items-center text-decoration-none action-anchor"
                                >
                                  <i className="fa fa-trash d-inline action-icon me-1"></i>
                                  <span> Delete</span>
                                </a>
                              </li>
                            </div>
                          ) : (
                            <div>
                              <li className="dropdown-item">
                                <a
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#showModal"
                                  onClick={() => handleShowDetails(recipe?.id)}
                                  className="d-flex align-items-center text-decoration-none action-anchor"
                                >
                                  <i className="fa fa-eye d-inline action-icon me-1"></i>
                                  <span> Show</span>
                                </a>
                              </li>
                            </div>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        deleteFunction={deleteRecipe}
        deletedItem={"Recipe"}
      />
      {/* End delete modal */}

      {/* start show details modal */}
      <form onSubmit={handleSubmit(addToFavs)} className="px-5">
        <div
          className={`modal ${showDetails == true ? "show fade" : ""}`}
          id="showModal"
          tabIndex={-1}
          style={{ display: showDetails == true ? "block" : "none" }}
          aria-hidden={!showDetails}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="delete-title my-4 fw-bold">Recipe Details</h5>
                <button
                  type="button"
                  className="custom-btn-close ms-4"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseDetails}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={
                    recipe?.imagePath
                      ? `${IMAGE_URL}/${recipe?.imagePath}`
                      : noImage
                  }
                  width={165}
                  height={200}
                  alt="recipe details"
                />

                <input
                  {...register("recipeId", {
                    required: "id is required",
                  })}
                  type="hidden"
                  className="form-control"
                  defaultValue={recipe?.id} // Pre-fill the recipe ID
                  readOnly
                />

                <br />
                <span className="delete-text">{recipe?.name}</span>
                <br />
                <span className="delete-text">{recipe?.description}</span>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn custom-close-modal-btn fw-bold my-3"
                  onClick={() => addToFavs()}
                >
                  Favourite
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* End show details modal */}

      {/* start pagination */}
      <Pagination
        loading={loading}
        currentPage={currentPage}
        getAllItems={getAllRecipes}
        setCurrentPage={setCurrentPage}
        numOfPagesArray={numOfPagesArray}
        items={recipes}
      />
      {/* End pagination */}
    </div>
  );
}
