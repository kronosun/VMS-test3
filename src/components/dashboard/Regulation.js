import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SidePanel from "./layout/SidePanel";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import SetSession from './regulations/SetSession';

const Regulation = (props) => {
  return (
    <div id="wrapper">
      <SidePanel msg="regulation" />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar message="Regulation" burger={true} userName="" profilePicture="" isLock={false}/>
          <div className="container-fluid">
            <SetSession />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};


export default Regulation;
