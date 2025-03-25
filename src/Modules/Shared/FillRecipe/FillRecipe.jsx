
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Context";



function FillRecipe() {

  const authContext = useContext(AuthContext);
  const { getUserToken, userData } = authContext || {};

  useEffect(() => {
    if (getUserToken) {
      getUserToken();
    }
  }, [getUserToken]);


  return (
    <div className="row fill-recipe py-3 mx-2 my-2">
      <div className="col-md-10 my-4 px-3">
        <div className="d-flex justify-content-start lign-items-center ms-5">
          <div>
            <div className="h4 px-md-4">
              {userData?.userGroup == "SystemUser" ? "Show" : "Fill"} the{" "}
              <h4 className="d-inline fill-tilte">Recipe</h4> !
            </div>
            <p className="fill-text px-md-4">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-2 my-auto px-md-4">
        <Link to="/dashboard/recipes" className="btn all-recipes text-start px-3">
          <i className="fa-solid fa-arrow-left text-white"></i> All Recipes
        </Link>
      </div>
    </div>
  );
}

export default FillRecipe;


