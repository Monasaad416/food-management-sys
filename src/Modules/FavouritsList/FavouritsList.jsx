import { useContext, useEffect, useState } from "react";
import { FAVS_URLS } from "../../services/api/apiConfig";
import { IMAGE_URL, privateAxiosInstance } from "../../services/api/apiInstance";
import getCategories from "../../Utilities/GetCategories";
import getAllTags from "../../Utilities/GetTags";
import Header from "../Shared/Header/Header";
import recipiesHeader from "../../assets/imgs/recipies-header.png";
import { AuthContext } from "../Context/Context";
import { BeatLoader } from "react-spinners";
import NoData from "../Shared/NoData/NoData";
import DeleteConfirmation from "../Shared/DeleteConfirmation/DeleteConfirmation";
import Pagination from "../Shared/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import noImage from "../../assets/imgs/modalImg.png";
import { toast } from "react-toastify";


export default function FavouritsList() {
    const [favRecipes, setFavRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    //delete modal
    const [showDelete, setShowDelete] = useState(false);
    const [favRecipeId, setFavRecipeId] = useState(0);
    const [numOfPagesArray, setNumOfPagesArray] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [name, setName] = useState('');
    const [tagId, setTagId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const pageSize= 10000000000; // high page size to get all categories in one select 
    const pageNumber = 1;  

    const navigate = useNavigate();


    const handleShowDelete = (id) => {
      setShowDelete(true); // Open modal
      setFavRecipeId(id);
    };
  
    const handleCloseDelete = () => {
      setShowDelete(false); // Close modal
      document.body.classList.remove("modal-open");
      document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
        backdrop.remove();
      });
    };


    const removeFavRecipe = async (data) => {
      try {
        const response = await privateAxiosInstance.delete(
          `${FAVS_URLS.DELETE_FAV_RECIPE(favRecipeId)}`,
          {
            favRecipeId: data?.id, 
          },
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        console.log(response);
        handleCloseDelete();
        navigate("/dashboard/favourits");
        toast.success("Recipe removed from favourite successfully");
        getAllFavRecipes();
      } catch (error) {
        console.error("Failed to add to favorites:", error);
      }
    };

    const getAllFavRecipes = async (pageSize, pageNumber, name ,tagId, categoryId) => {
      try {
        setLoading(true);
        const response = await privateAxiosInstance.get(FAVS_URLS.FAV_RECIPES, {
          params: {
            pageSize: pageSize,
            pageNumber: pageNumber,
            name:name,
            tagId: tagId,
            categoryId: categoryId,
          },
        });
        console.log(response.data.data[5]);
        setFavRecipes(response?.data?.data);
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

    useEffect(() => {
      getAllFavRecipes(6, 1);
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


    const getNameValue = (e) => {
      const nameValue = e.target.value.toLowerCase();
      console.log(nameValue);
      setName(nameValue);
      getAllFavRecipes(5, 1, nameValue, tagId, categoryId);
    };

    const getTagIdValue = (e) => {
      setTagId(e.target.value);
      getAllFavRecipes(5, 1, name, e.target.value, categoryId);
    };

    const getCategoryIdValue = (e) => {
      setCategoryId(e.target.value);
      getAllFavRecipes(5, 1, name, tagId, e.target.value);
    }; 


        
  const authContext = useContext(AuthContext);
  const { userData, getUserToken } = authContext || {};

  useEffect(() => {
    if (authContext) {
      getUserToken(); // Call only if authContext exists
    }
  }, [authContext, getUserToken]); 

    return (
      <div>
        <Header
          strong="Favourite"
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
          <div className="col-md-8 my-2">
            {/* <i className="fa-solid fa-magnifying-glass"></i> */}
            <input
              type="text"
              className="form-control"
              placeholder="recipe name..."
              onChange={getNameValue}
            />
          </div>
          <div className="col-md-2 my-2">
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
          <div className="col-md-2 my-2">
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
          ) : Array.isArray(favRecipes) && favRecipes.length > 0 ? (
            <div className="container">
              <div className="row">
                {favRecipes.map((recipe) => (
                  <div className="col-md-4 my-3" key={recipe?.id}>
                    <div className="card text-center py-2">
                      <i
                        className="fa fa-2x fa-heart text-end me-3 my-4"
                        onClick={() => {
                          handleShowDelete(recipe?.id);
                        }}
                      ></i>
                      <img
                        src={
                          recipe?.recipe?.imagePath
                            ? `${IMAGE_URL}/${recipe?.recipe?.imagePath}`
                            : noImage
                        }
                        className="card-img-top"
                        alt={recipe?.recipe?.name}
             
                      />
                      <div className="card-body">
                        <h5 className="card-title my-3">{recipe?.recipe?.name}</h5>
                        <p className="card-text">
                          {recipe?.recipe?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
          deleteFunction={removeFavRecipe}
          deletedItem={"Favourite"}
        />
        {/* End delete modal */}

        {/* start pagination */}
        <Pagination
          loading={loading}
          currentPage={currentPage}
          getAllItems={getAllFavRecipes}
          setCurrentPage={setCurrentPage}
          numOfPagesArray={numOfPagesArray}
          items={favRecipes}
        />
        {/* End pagination */}
      </div>
    );
}
