import Header from "../Shared/Header/Header";
import dashboardHeader from "../../assets/imgs/dashboard-header.png"
import FillRecipe from "../Shared/FillRecipe/FillRecipe";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { BeatLoader } from "react-spinners";

function Dashboard({loginData}) {
    const authContext = useContext(AuthContext);
    // Check if authContext is null
    if (!authContext) {
      return (
        <div>
          <BeatLoader color={"#009247"} loading={true} size={15} />
        </div>
      ); //  handle the null case
    }
  return (
    <>
      <Header
        strong="Welcome"
        title={authContext?.userData?.userName}
        description="This is a welcoming screen for the entry of the application , you can now see the option"
        imgSrc={dashboardHeader}
        width="300"
      />

      <FillRecipe loginData={loginData} />
    </>
  );
}

// Add prop types validation
Dashboard.propTypes = {
  loginData: PropTypes.func.isRequired,
};
export default Dashboard;

