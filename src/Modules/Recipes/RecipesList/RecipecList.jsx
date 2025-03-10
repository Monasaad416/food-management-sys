import Header from "../../Shared/Header/Header";
import recipiesHeader from "../../../assets/imgs/recipies-header.png";
import { useEffect, useState } from "react";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import modalImg from "../../../assets/imgs/modalImg.png";
import noImage from "../../../assets/imgs/no-img.png";
import { privateAxiosInstance } from "../../../services/api/apiInstance";
import { RECIPES_URLS } from "../../../services/api/apiConfig";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
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

  const deleteRecipe = async (recipeId) => {
    try {
      console.log(recipeId);
      const response = await privateAxiosInstance.delete(
        `${RECIPES_URLS.DELETE_RECIPE(recipeId)}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (response.status === 200) {
        toast.success("Recipe deleted successfully");

        setRecipes((prevrecipes) =>
          prevrecipes.filter((recipe) => recipe.id !== recipeId)
        );

        handleCloseDelete();
        getAllRecipes(); // Refetch recipes after successful deletion
      } else {
        console.error("Expected an array but got:", response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllRecipes = async () => {
    try {
      const response = await privateAxiosInstance.get(RECIPES_URLS.RECIPES);
      console.log(response.data.data);
      setRecipes(response?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <>
      <Header
        strong="recipes"
        title="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgSrc={recipiesHeader}
        width={170}
      />
      <div className="d-flex justify-content-between mx-4 my-5">
        <div className="details">
          <h3>recipes Table Details</h3>
          <span className="text-muted">You can check all details</span>
        </div>
        <div>
          <div className="btn btn-custom fw-bold">Add New Recipe</div>
        </div>
      </div>
      <div className="mx-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(recipes) ? (
              recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td>
                    <img
                      src={
                        recipe.imagePath
                          ? `IMAGE_URL/${recipe.imagePath}`
                          : { noImage }
                      }
                      width={100}
                    />
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.creationDate}</td>
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
                        <li>
                          <i
                            className="fa fa-trash text-danger dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            onClick={() => handleShowDelete(recipe.id)}
                            title="delete recipe"
                          ></i>
                        </li>
                        <li>
                          <i
                            className="fas fa-edit text-warning dropdown-item"
                            title="edit recipe"
                          ></i>
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
        deleteFunction={deleteRecipe}
        deletedItem={"Recipe"}
      />
      {/* End delete modal */}
    </>
  );
}
