import React, { Fragment } from "react";
import PropTypes from "prop-types";

const LiveStreamCard = ({bed,visitors,max}) => {
  return (
    <Fragment>
      <div className="col-xl-3 col-md-6 mb-4 px-3 py-3">
        <div className={`card border-left-${visitors>=max?"danger":"primary"} shadow h-100 py-2`}>
          <div className="card-body">
            <div className="row no-gutters align-items-center px-2">
              <div className="col mr-2">
                <div className="text-lg font-weight-bold text-dark text-uppercase mb-1" style={{fontSize:"2.5rem"}}>
                  Bed {bed}
                </div>
                <div className="text-xs font-weight-bold text-secondary mb-1" style={{fontSize:"1.5rem"}}>
                 <span style={{fontSize:"1.8rem"}} >{visitors}/{max}</span>  Visitors
                </div>
              </div>
              <div className="col-auto">
                <i
                  className={`fas fa-bed fa-2x text-${visitors>=max?"danger":"primary"} p-0`}
                  style={{ fontSize: "3.5em"}}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

LiveStreamCard.propTypes = {};

export default LiveStreamCard;