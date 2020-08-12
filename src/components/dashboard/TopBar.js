import React, {useState,useEffect, Fragment} from 'react';
import PropTypes from "prop-types";
import "../auth/assets/css/sb-admin-2.css";
//Redux 
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from '../../actions/auth';

const TopBar = ({ message ,burger,logOut,userName,profilePicture}) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* <!-- Sidebar Toggle (Topbar) --> */}
      {/* <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button> */}
      {/* <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        
      </button> */}
      {burger ? (      <button
        className="btn btn-link d-md-none dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa fa-bars"></i>
      </button>) :(null)}

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
      <h1 className="h3 mb-0 text-gray-800 mx-1">{message}</h1>

      {/* <!-- Topbar Navbar --> */}
      <ul className="navbar-nav ml-auto" >
        {/* <!-- Nav Item - User Information --> */}

        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="img-profile rounded-circle mx-1"
              src={profilePicture}
              style={{width:"32px",height:"32px"}}
            />
            <span className="mx-1 d-lg-inline d-none text-gray-600 small">
              {userName}
            </span>
          </a>
        </li>
        <div className="topbar-divider  d-sm-block mr-1"></div>
        <li className="nav-item dropdown no-arrow">
          <Link
            className="nav-link"
            onClick={logOut}
            to="/"
          >
            <i className="fas fa-sign-out-alt fa-sm"></i>
            <span className="mr-0 d-none d-lg-inline text-gray-600 small">
              Logout
            </span>
          </Link>
        </li>
        <li className="nav-item dropdown no-arrow">
          <Link
            className="nav-link"
            to="/"
          >
            <i className="fas fa-home fa-sm"></i>
            <span className="mr-0 d-none d-lg-inline text-gray-600 small">
              Home
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

TopBar.propTypes = {
  logOut :PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userName: state.auth.attributes.name,
  profilePicture:state.auth.attributes.profile
});

export default connect(mapStateToProps,{logOut})(TopBar);
