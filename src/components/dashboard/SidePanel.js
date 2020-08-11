import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../auth/assets/css/sb-admin-2.css";

const SidePanel = (props) => {
  return (
    //   <!-- Page Wrapper -->
    <Fragment>
      {/* <!-- Sidebar --> */}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-3">
            {/* <i className="fas fa-laugh-wink"></i> */}
            <span>Obscura</span>
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </Link>
        <br />

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        <br />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <br />

        <li className="nav-item active">
          <Link className="nav-link" to="/regulation">
            <i className="fas fa-fw fa-sliders-h"></i>
            <span>Set Rules</span>
          </Link>
        </li>

        <br />

        <li className="nav-item active">
          <Link className="nav-link" to="/visitor">
            <i className="fas fa-fw fa-user-friends"></i>
            <span>Visitor Number</span>
          </Link>
        </li>
        <br />

        <li className="nav-item active">
          <Link className="nav-link" to="/schedules">
            <i className="fas fa-fw fa-calendar-alt"></i>
            <span>Schedules</span>
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default SidePanel;
