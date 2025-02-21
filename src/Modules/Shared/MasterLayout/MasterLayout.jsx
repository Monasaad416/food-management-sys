import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../Sidebar/Sidebar'

export default function MasterLayout() {
  return (
    <div className='container-fluid'>
    <div className="row w-100">
        <div className="col-3 bg-info"><SideBar/></div>
        <div className="col-9 bg-danger">
            <Navbar/>
            <Header/>
            <Outlet/>
        </div>
    </div>
    </div>
  )
}
