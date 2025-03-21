import PropTypes from "prop-types";
import { Link } from "react-router-dom";


function FillRecipe({loginData}) {
  return (
    <div className="row fill-recipe py-3 mx-2 my-2">
      <div className="col-md-10 my-4 px-3">
        <div className="d-flex justify-content-start lign-items-center ms-5">
          <div>
            <div className="h4">
              {loginData?.userGroup == "SystemUser" ? "Show" : "Fill"} the{" "}
              <h4 className="d-inline fill-tilte">Recipe</h4> !
            </div>
            <p className="fill-text">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-2 my-auto mx-5">
        <Link to="/dashboard/recipes" className="btn all-recipes text-start">
          <i className="fa-solid fa-arrow-left mx-2 text-white"></i> All Recipes
        </Link>
      </div>
    </div>
  );
}

// Add prop types validation
// Add prop types validation
FillRecipe.propTypes = {
  loginData: PropTypes.shape({
    userGroup: PropTypes.string.isRequired, // Validate the userGroup property
  }).isRequired,
}
export default FillRecipe;


