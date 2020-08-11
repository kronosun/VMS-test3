import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SidePanel from "./SidePanel";
import TopBar from './TopBar';

const Visitor = (props) => {
  return (
    <div id="wrapper">
    <SidePanel />
    <div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
    <TopBar />
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800 mx-2">Visitor</h1>
          </div>

        
    </div>
    </div>
    </div>
  );
};

Visitor.propTypes = {};

export default Visitor;
