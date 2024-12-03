import React from "react";
import AdminHeader from "./header/AdminHeader";
// import AdminFooter from "./footer/AdminFooter";
import AdminSideBar from "./sidebar/AdminSideBar";

const AdminMasterLayout = ({ child }) => {
  return (
    // <div className="wrapper">
    //   <AdminHeader />
    //   <AdminSideBar />
    //   {child}
    //   <AdminFooter />
    // </div>
    <div class="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">
      <AdminHeader />
      <div class="app-main">
        <AdminSideBar />
        <div class="app-main__outer">
          {child}
          {/* <AdminFooter /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminMasterLayout;
