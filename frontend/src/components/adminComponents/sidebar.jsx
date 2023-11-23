import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { logout } from "../../redux/slices/adminSlice/adminAuthSlice";
import { useNavigate, } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { useAdminLogoutMutation } from "../../redux/slices/adminSlice/adminApiSlice";

// Theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

export default function AdminSidebar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const [AdminlogoutApiCall] = useAdminLogoutMutation()
  const handleLogoutClick = async () => {
    try {
      await AdminlogoutApiCall().unwrap();
      dispatch(logout());
      navigate("/adminLogin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-panel">
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="admin-sidebar"
      >
        <div className="admin-sidebar-content" style={{ flex: true }}>
          <Link className="sidebarOptions">
            <h5> Admin panel</h5>
          </Link>
        </div>
        <div className="admin-sidebar-content">
          <Link className="sidebarOptions">
            <i
              className="pi pi-home mr-3"
              style={{ fontSize: "1.2rem", padding: "20px" }}
            ></i>
            Dashboard
          </Link>
        </div>
        <div className="admin-sidebar-content">
          <Link className="sidebarOptions">
            <i
              className="pi pi-bell"
              style={{ fontSize: "1.2rem", padding: "20px" }}
            ></i>
            Guide Requests
          </Link>
        </div>
        <div className="admin-sidebar-content">
          <Link to={"/userList"} className="sidebarOptions">
            <i
              className="pi pi-user"
              style={{ fontSize: "1.2rem", padding: "20px" }}
            ></i>
            User Management
          </Link>
        </div>
        <div className="admin-sidebar-content">
          <Link to={"/guideListData"} className="sidebarOptions">
            <i
              className="pi pi-user"
              style={{ fontSize: "1.2rem", padding: "20px" }}
            ></i>
            Guide Management
          </Link>
        </div>
        <div className="admin-sidebar-content">
          <Link to={"/AdminBookingData"} className="sidebarOptions">
            <i
              className="pi pi-calendar
"
              style={{ fontSize: "1.2rem", padding: "20px" }}
            ></i>
            Bookings Details
          </Link>
        </div>

        {/* Add the "Logout" link here */}
        <div className="admin-sidebar-content">
          <Link
            className="sidebarOptions"
            onClick={handleLogoutClick} // Call the function when the link is clicked
          >
            <i
              className="pi pi-sign-out mr-3"
              style={{ fontSize: "1.2rem", padding: "20px" }}
            ></i>
            Logout
          </Link>
        </div>
      </Sidebar>

      <Button
        icon="pi pi-arrow-right"
        onClick={() => setVisible(true)}
        className="admin-button"
      ></Button>

      <span style={{ paddingLeft: "20px", fontSize: "20px" }}>
        {" "}
        <img alt="logo" src="/logos2.png" height="50" className="mr-2"></img>
      </span>
    </div>
  );
}


