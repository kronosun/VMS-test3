import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SidePanel from "./SidePanel";
import TopBar from "./TopBar";

const Regulation = (props) => {
  return (
    <div id="wrapper">
      <SidePanel />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <TopBar message="Regulation" burger={true} userName="" profilePicture="" />
        </div>
      </div>
    </div>
  );
};


export default Regulation;
