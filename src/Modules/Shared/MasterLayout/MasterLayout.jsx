import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideMenu from '../SideMenu/SideMenu.jsx'; // Correct casing


export default function MasterLayout() {

  
  return <div className="d-flex ">
 
 <SideMenu/>
 
<div className="w-100 d-flex flex-column  vh-100 overflow-y-auto">
<Navbar />
 <div className="">
 <Outlet/>
 </div>
</div>
  </div>;
}


