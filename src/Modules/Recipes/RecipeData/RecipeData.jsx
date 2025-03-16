import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import getCategories from "../../../Utilities/GetCategories.js";
import getAllTags from "../../../Utilities/GetTags.js";

export default function RecipeData() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

    // useEffect(() => {
    //   getCategories({
    //     setLoading,
    //     setCategories,
    //     setNumOfPagesArray,
    //     fetchAll: true,
    //   });

    //   getAllTags(setTags, true);
    // }, []);

  const params = useParams();
    const {
      register,
      formState: { errors,isSubmitting },
      handleSubmit,
    } = useForm();

    const navigate = useNavigate(); 

    const onSubmit = async (data) => {
      try {
        const response = await publicAxiosInstance.post(USER_URLS.LOGIN, data);

        localStorage.setItem("token", response.data.token);
        loginData;
        navigate("/dashboard");
        toast.success("Successfully logged in", {
          theme: "colored",
        });
      } catch (error) {
          toast.error( error.message, {
            theme: "colored",
          });
      }
    }; 
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-between fill-recipe py-3 mx-2">
          <div className="col-md-10 my-4 px-3">
            <div className="d-flex justify-content-start lign-items-center ms-5">
              <div>
                <p className="h4">
                  Fill the <h4 className="d-inline fill-tilte">Recipe</h4> !
                </p>
                <p className="fill-text">
                  you can now fill the meals easily using the table and form ,
                  click here and sill it with the table !
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-2 my-auto">
            <Link
              to="/dashboard/recipes"
              className="btn all-recipes text-start"
            >
              <i className="fa-solid fa-arrow-left mx-2 text-white"></i> All
              Recipes
            </Link>
          </div>
        </div>
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
                />
              </div>
              {errors.name && (
                <p className="text-danger pb-2">{errors.name.message}</p>
              )}

              <div className="input-group my-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="">tag</option>
                  {tags?.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.name && (
                <p className="text-danger pb-2">{errors.name.message}</p>
              )}
              <div className="input-group my-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  // onChange={getCategoryIdValue}
                >
                  <option value="">category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn w-100 text-white custom-button my-5 fw-bold"
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
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}
