import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {

  return (

    <>

      <Navbar />

      <div className="container-fluid">

        <div className="row">

          <div className="col-md-2 p-0">

            <Sidebar />

          </div>

          <div className="col-md-10 bg-light min-vh-100 p-4">

            <Outlet />

          </div>

        </div>

      </div>

    </>

  );

}

export default Layout;