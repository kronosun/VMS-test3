import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import SessionCard from "./SessionCard";
import { Button } from "react-scroll";
import { TextField, Fab } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import AddIcon from "@material-ui/icons/Add";
const SetSession = (props) => {
  return (
    <Fragment>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h4 mb-0 text-gray-800">Available Weekday Sessions</h1>
      </div>
      {/* 1st Row Start */}
      <div className="row">
        <SessionCard />
        <SessionCard />
        <SessionCard />
        <div className="col-xl-2 col-md-6 ml-2 mb-4  my-0 p-0">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center p-0">
                <div className="col mr-2">
                  <div
                    className="text-sm font-weight-bold text-dark text-uppercase mb-1"
                    style={{ fontSize: "0.9em" }}
                  >
                    Add More <br /> Session
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fas fa-plus fa-2x text-danger-300 text-success btn"
                    style={{ fontSize: "2.5em" }}
                    data-toggle="modal"
                    data-target="#setWeekDays"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Start of Modal */}
          <div
            className="modal fade"
            id="setWeekDays"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="setWeekDaysTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-scrollable"
              role="document"
              style={{ width: "300px" }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="setWeekDaysTitle">
                    Hospital's Regulations
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* ISI */}
                  <div className="col align-items-center text-center p-4 ">
                    <form noValidate>
                      <TextField
                        id="time"
                        label="From"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                      <br />
                      <br />
                      <br />
                      <TextField
                        id="time"
                        label="To"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* End of Modal */}
        </div>
      </div>
      {/* 1st Row End */}
      <div className="d-sm-flex align-items-center justify-content-start mb-4">
        <h1 className="h4 mb-0 text-gray-800">Available Weekend Sessions</h1>
      </div>
      {/* 2nd Row Start */}
      <div className="row">
        <SessionCard />
        <SessionCard />
        <SessionCard />
        <div className="col-xl-2 col-md-6 ml-2 mb-4  my-0 p-0">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center p-0">
                <div className="col mr-2">
                  <div
                    className="text-sm font-weight-bold text-dark text-uppercase mb-1"
                    style={{ fontSize: "0.9em" }}
                  >
                    Add More <br /> Session
                  </div>
                </div>
                <div className="col-auto">
                  <i
                    className="fas fa-plus fa-2x text-danger-300 text-success btn"
                    style={{ fontSize: "2.5em" }}
                    data-toggle="modal"
                    data-target="#setWeekDays"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Start of Modal */}
          <div
            className="modal fade"
            id="setWeekDays"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="setWeekDaysTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-scrollable"
              role="document"
              style={{ width: "300px" }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="setWeekDaysTitle">
                    Hospital's Regulations
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* ISI */}
                  <div className="col align-items-center text-center p-4 ">
                    <form noValidate>
                      <TextField
                        id="time"
                        label="From"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                      <br />
                      <br />
                      <br />
                      <TextField
                        id="time"
                        label="To"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* End of Modal */}
        </div>
      </div>
      {/* 2nd Row End */}
      <div className="row justify-content-start">
        <div className="col-md-6">
          <div className="d-sm-flex align-items-center justify-content-start mb-4">
            <h1 className="h4 mb-0 text-gray-800">Max Visitor</h1>
          </div>
          {/* 3rd Row Start */}
          <div className="row justify-content-start">
            <div className="col-3 mt-2">
              <div className="d-sm-flex align-items-center justify-content-start mb-4">
                <h4 className="text-primary mt-2">Enabled</h4>
                <Switch
                  // checked={false}
                  // onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  // inputProps={{ 'aria-label': 'primary checkbox' }}
                  // className="btn btn-primary" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  label="hi"
                />
              </div>
            </div>
            <div className="col-5">
              <div className="collapse ml-4" id="collapseExample">
                <div className="d-flex flex-row bd-highlight mt-3 ">
                  <h5>Max Visitor per bed :</h5>
                  <TextField
                    id="standard-basic"
                    type="text"
                    // label="Visitee's name"
                    name="visitee"
                    style={{ width: "25px" }}
                    // value={visitee}
                    // onChange={(e) => onChange(e)}
                    className="ml-3 mb-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <div className="d-sm-flex align-items-center justify-content-start mb-4">
            <h1 className="h4 mb-0 text-gray-800">Max Visit Time limit</h1>
          </div>
          {/* 3rd Row Start */}
          <div className="row justify-content-start">
            <div className="col-3 mt-2">
              <div className="d-sm-flex align-items-center justify-content-start mb-4">
                <h4 className="text-primary mt-2">Enabled</h4>
                <Switch
                  // checked={false}
                  // onChange={handleChange}
                  color="primary"
                  name="checkedB"
                  // inputProps={{ 'aria-label': 'primary checkbox' }}
                  // className="btn btn-primary" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                  data-toggle="collapse"
                  data-target="#timeLimit"
                  label="hi"
                />
              </div>
            </div>
            <div className="col-5">
              <div className="collapse ml-4" id="timeLimit">
                <div className="d-flex flex-row bd-highlight mt-3 ">
                  <h5>Max time limit :</h5>
                  <TextField
                    id="standard-basic"
                    type="text"
                    // label="Visitee's name"
                    name="visitee"
                    style={{ width: "25px" }}
                    // value={visitee}
                    // onChange={(e) => onChange(e)}
                    className="ml-3 mb-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end  */}
      </div>

      <div className="d-sm-flex align-items-center justify-content-start mb-2">
        <h1 className="h4 mb-0 text-gray-800">Written Rules</h1>
      </div>

      <div className="row align-items-center mx-1 mb-5">
      <div className="col-6">
      <ul className="list-group ">
          <li className="list-group-item my-1 ">
            Limit visitors to two per patient at one time.
          </li>
          <li className="list-group-item my-1">
            Maintain low voice tones in all areas of the hospital.
          </li>
          <li className="list-group-item my-1">Adhere to visiting hours.</li>
          <li className="list-group-item my-1">
            Restrict calls to patient rooms after 9 p.m.
          </li>
          <li className="list-group-item my-1">
            Avoid visiting in hallways in patient care areas.
          </li>
          <li className="list-group-item my-1">
            If you notice an area for improvement regarding noise levels in the
            hospital, please notify the nursing staff.
          </li>

        </ul>
      </div>
      <div className="col-auto">
      <Fab aria-label="add" className="mx-auto text-light bg-success">
            <AddIcon />
          </Fab>
      </div>


      </div>
      <div className="d-sm-flex align-items-center justify-content-center mb-3">
        <button className="btn btn-success my-3">Update Regulation</button>
      </div>
      {/* <button className="btn btn-primary d-sm-flex align-items-center my-2 mx-1 ">
        {" "}
        <i
          className="fas fa-plus fa text-danger-300 text-light btn"
          style={{ fontSize: "1em" }}
          data-toggle="modal"
          data-target="#setWeekDays"
        />
          
        <h5 style={{ fontSize: "1em" }} className="mt-2" >
        Add More
        </h5>
      </button> */}

      {/* <div className="row">
        <Button >Add More</Button>
        </div> */}
    </Fragment>
  );
};

SetSession.propTypes = {};

export default SetSession;
