import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SidePanel from "./SidePanel";
import TopBar from "./TopBar";
import TabelSchedule from './schedule/TabelSchedule';
import Footer from './Footer';

const Schedules = () => {
  return (
    <div id="wrapper">
      <SidePanel />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar message="Schedules" burger={true}  userName="" profilePicture=""/>
        <div className="container-fluid mx-auto" >
        <TabelSchedule />

        </div>

        </div>
        <Footer />
      </div>
    </div>
  );
};

Schedules.propTypes = {};

export default Schedules;
