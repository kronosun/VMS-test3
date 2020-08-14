import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SidePanel from "./layout/SidePanel";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import ChartAll from './dashboard/ChartAll';
const Dashboard = (props) => {
  return (
    <div id="wrapper">
      <SidePanel msg="dashboard"/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar
            message="Dashboard"
            burger={true}
            userName=""
            profilePicture=""
          />
          <div className="container-fluid ">
          
            <ChartAll />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
