import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SidePanel from "./SidePanel";
import TopBar from "./TopBar";

const Visitor = (props) => {
  return (
    <div id="wrapper">
      <SidePanel />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar message="Visitor" burger={true} userName="" profilePicture=""/>
        </div>
      </div>
    </div>
  );
};

Visitor.propTypes = {};

export default Visitor;
