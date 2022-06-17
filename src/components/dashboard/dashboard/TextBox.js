import React from "react";
import PropTypes from "prop-types";

const TextBox = (props) => {
  return (
    <div className="py-2 p-3">
      <div className="card shadow mb-4" style={{ height: "350px" }}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Daily Logs</h6>
        </div>
        <div className="card-body">
          <p>Everything is currently under control</p>
          <p>Web Traffic is normal</p>
          <p>Please maintain health protocols</p>
          <p>Next maintenance will be done in a week</p>
          <p>
            We'll continue on developing this webapps, so any feedback would be
            greatly appreciated !
          </p>
        </div>
      </div>
    </div>
  );
};

TextBox.propTypes = {};

export default TextBox;
