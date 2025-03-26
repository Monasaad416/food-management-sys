import Header from "../Shared/Header/Header";
import dashboardHeader from "../../assets/imgs/dashboard-header.png"
import FillRecipe from "../Shared/FillRecipe/FillRecipe";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/Context";


function Dashboard() {

  const authContext = useContext(AuthContext);
  const { getUserToken, userData } = authContext || {};

  useEffect(() => {
    if (getUserToken) {
      getUserToken();
    }
  }, [getUserToken]);

  return (
    <>
      <Header
        strong="Welcome " 
        title={userData?.userName}
        description="This is a welcoming screen for the entry of the application , you can now see the option"
        imgSrc={dashboardHeader}
        width="180"
      />

      <FillRecipe  />
    </>
  );
}


export default Dashboard;

