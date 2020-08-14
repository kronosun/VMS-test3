import React from "react";
import "../../auth/assets/css/sb-admin-2.css";
//Redux
import { Link,  } from "react-router-dom";

const TopBarGuest = ({ message, burger }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {burger ? (
        <button
          className="btn btn-link d-md-none dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa fa-bars"></i>
        </button>
      ) : null}

      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link className="dropdown-item" to="/dashboard">
          Dashboard
        </Link>
        <Link className="dropdown-item" to="/regulation">
          Regulation
        </Link>
        <Link className="dropdown-item" to="/visitor">
          Visitor
        </Link>
        <Link className="dropdown-item" to="/schedules">
          Schedules
        </Link>
      </div>
      <h1 className="h4 mb-0 text-gray-800 mx-2">{message}</h1>

      {/* <!-- Topbar Navbar --> */}
      <ul className="navbar-nav ml-auto">
        {/* <!-- Nav Item - User Information --> */}

        <div className="topbar-divider d-sm-block mx-1 d-flex justify-content-center"></div>

        <li className="nav-item dropdown no-arrow">
          <Link className="nav-link" to="/">
            <i className="fas fa-home fa-sm"></i>
            <span className="ml-2 mr-0 d-none d-lg-inline text-gray-600 small">
              Home
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};


export default TopBarGuest;
