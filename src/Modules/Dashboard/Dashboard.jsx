import Header from "../Shared/Header/Header";
import dashboardHeader from "../../assets/imgs/dashboard-header.png"

export default function Dashboard() {
  return (
    <div>
      <Header
        strong="Welcome"
        title="Upskilling !"
        description="This is a welcoming screen for the entry of the application , you can now see the option"
        imgSrc={dashboardHeader}
        width='300'
      />

      Dashboard
    </div>
  );
}
