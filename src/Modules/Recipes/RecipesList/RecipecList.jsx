import Header from "../../Shared/Header/Header";
import recipiesHeader from "../../../assets/imgs/recipies-header.png";
import { useEffect, useState } from "react";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import noImage from "../../../assets/imgs/no-img.png";
import { IMAGE_URL, privateAxiosInstance } from "../../../services/api/apiInstance";
import { RECIPES_URLS } from "../../../services/api/apiConfig";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import { BeatLoader } from "react-spinners";

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [loading,setLoading] = useState(true);
  //delete modal
  const [showDelete, setShowDelete] = useState(false);
  const [recipeId, setRecipeId] = useState(0);

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

 const deleteRecipe = async () => {
    try {
      const response = await privateAxiosInstance.delete(
        `${RECIPES_URLS.DELETE_RECIPE(recipeId)}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (response.status === 200) {
        toast.success("Recipe deleted successfully", {
          theme: "colored",
        });

        handleCloseDelete();
        getAllRecipes();
      } else {
        console.error("Expected an array but got:", response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllRecipes = async () => {
    try {
      setLoading(true); 
      const response = await privateAxiosInstance.get(RECIPES_URLS.RECIPES);
      console.log(response.data.data);
      setRecipes(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
        setLoading(false); 
    }
  };

  useEffect(() => {
    getAllRecipes();
  }, []);



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
      <div>
        <button
          className="btn btn-custom fw-bold"
          data-bs-toggle="modal"
          data-bs-target="#catFormModal"

        >
          Add New Recipe
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
      ) : Array.isArray(recipes) && recipes.length > 0 ? (
        <table className="table">
          <thead>
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
                        : { noImage }
                    }
                    width={100}
                  />
                </td>
                <td>{recipe?.price}</td>
                <td>{recipe?.creationDate}</td>
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
                          onClick={() => handleShowDelete(recipe?.id)}
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
                          onClick={() => handleShowDelete(recipe?.id)}
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
  </div>
);
}
