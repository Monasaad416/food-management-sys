import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import getCategories from "../../../Utilities/GetCategories.js";
import { privateAxiosInstance } from '../../../services/api/apiInstance.js';
import { RECIPES_URLS } from '../../../services/api/apiConfig.js';
import getAllTags from '../../../Utilities/GetTags.js';
import FillRecipe from "../../Shared/FillRecipe/FillRecipe";



export default function RecipeData() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
 const [loading, setLoading] = useState(true); 
 const [numOfPagesArray, setNumOfPagesArray] = useState([]);
  const pageSize=10000000;
  const pageNumber=1;


    const params = useParams();
    const recipeId = params.recipeId;
    console.log(recipeId);

    
    
    const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      setValue,
    } = useForm();

    const navigate = useNavigate(); 

    useEffect(() => {
      getAllTags(setTags, setLoading);

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
    }, [pageSize, pageNumber, setLoading, recipeId, setValue]);



    
    useEffect(() => {
      if (recipeId) {
        try {
          const getRecipeById = async () => {
            const response = await privateAxiosInstance.get(
              RECIPES_URLS.GET_RECIPE(recipeId)
            );
            setValue("name", response?.data?.name);
            setValue("tagId", response?.data?.tag?.id);
            setValue("categoriesIds", String(response?.data?.category[0]?.id));
            setValue("description", response?.data?.description);
            setValue("price", response?.data?.price);
            setValue("imagePath", response?.data?.imagePath);
          };

          getRecipeById();
        } catch (err) {
          console.log(err);
        }
      }
    }, [recipeId, setValue]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        // formData.append("name" ,response?.data?.name);
        for (let key in data) {
          if (key === "recipeImage") {
          //console.log(key, data?.[key]?.[0]);
            formData.append(key, data?.[key]?.[0]);
          } else {
            formData.append(key, data[key]);
          }
        }
      try {
        if (recipeId != null || recipeId != undefined) {
          const response = await privateAxiosInstance.put(
            RECIPES_URLS.UPDATE_RECIPE(recipeId),
            data
          );
          navigate("/dashboard/recipes");

          toast.success('Category Updated Successfully');
        } else {
          const response = await privateAxiosInstance.post(
            RECIPES_URLS.CREATE_RECIPE,
            data
          );
          navigate("/dashboard/recipes");

          toast.success(response?.data?.message);
        }


   
      } catch (error) {
          toast.error( error.message);
      }
    }; 

    return (
      <div className="container-fluid">
        <FillRecipe />
        <div className="row mx-4 my-4">
          <span className="add-item">Add New Item</span>
        </div>

        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit(onSubmit)} className="px-5">
              {/* name */}
              <div className="input-group my-3">
                <input
                  {...register("name", {
                    required: "name is required",
                  })}
                  type="text"
                  className="form-control"
                  placeholder="Recipe name"
                  aria-label="name"
                />{" "}
                <span className="text-danger ms-3">*</span>
              </div>
              {errors.name && (
                <p className="text-danger pb-2">{errors.name.message}</p>
              )}
              {/* tags */}
              <div className="input-group my-3">
                <select
                  {...register("tagId", {
                    required: "tag is required",
                  })}
                  className="form-select"
                >
                  <option value="">tag</option>
                  {tags?.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
                <span className="text-danger ms-3">*</span>
              </div>
              {errors.tagId && (
                <p className="text-danger pb-2">{errors.tagId.message}</p>
              )}

              {/* categories */}
              <div className="input-group my-3">
                <select
                  {...register("categoriesIds", {
                    required: "category is required",
                  })}
                  className="form-select"
                  // onChange={getCategoryIdValue}
                >
                  <option value="">category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <span className="text-danger ms-3">*</span>
              </div>
              {errors.categoriesIds && (
                <p className="text-danger pb-2">
                  {errors.categoriesIds.message}
                </p>
              )}

              {/* price */}
              <div className="input-group">
                <input
                  {...register("price", {
                    required: "price is required",
                  })}
                  type="text"
                  className="form-control"
                  placeholder="0.00 EGP"
                  aria-label="price"
                />
                <span className="text-danger ms-3">*</span>
              </div>
              {errors.price && (
                <p className="text-danger pb-2">{errors.price.message}</p>
              )}

              {/* description */}
              <div className="input-group mt-3">
                <textarea
                  {...register("description")}
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  aria-label="description"
                ></textarea>
              </div>
              {errors.description && (
                <p className="text-danger pb-2">{errors.description.message}</p>
              )}

              {/* image */}
              <div className="input-group my-3">
                <input
                  {...register("recipeImage")}
                  type="file"
                  className="form-control"
                  placeholder="drag drop"
                  aria-label="image"
                />
              </div>
              {errors.recipeImage && (
                <p className="text-danger pb-2">{errors.recipeImage.message}</p>
              )}

              <div className="text-end">
                <Link
                  to="/dashboard"
                  type="button"
                  disabled={isSubmitting}
                  className="btn text-success btn-outline-success text-success my-5 px-3"
                >
                  Close{" "}
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn text-white custom-button my-5 mx-4 fs-5 px-2"
                >
                  {isSubmitting ? (
                    <BeatLoader
                      color={"white"}
                      loading={true}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
