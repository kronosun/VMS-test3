import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SessionCard from "./SessionCard";
import { Button } from "react-scroll";
import { TextField, Fab } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import AddIcon from "@material-ui/icons/Add";

const SetSession = (props) => {
  const [newRules, setNewRules] = useState("");
  const [updateDay, setUpdateDay] = useState(-1);
  const [updateEnd, setUpdateEnd] = useState(-1);
  const [editDay, setEditDay] = useState({
    sessionDay: updateDay,
    fromDay: "10:10",
    toDay: "10:10",
  });
  const [editEnd, setEditEnd] = useState({
    sessionEnd: updateEnd,
    fromEnd: "10:10",
    toEnd: "10:10",
  });
  const [weekDaySession, setweekDaySession] = useState([
    {
      session: 1,
      from: "08:00",
      to: "10:00",
    },
    {
      session: 2,
      from: "11:00",
      to: "13:00",
    },
  ]);

  const [weekEndSession, setweekEndSession] = useState([
    {
      session: 1,
      from: "08:00",
      to: "10:00",
    },
    {
      session: 2,
      from: "11:00",
      to: "13:00",
    },
  ]);
  const [formData, setFormData] = useState({
    maxVisitor: 5,
    maxVisitorStatus: true,
    maxTime: 2,
    maxTimeStatus: true,
    rules: ["1", "2", "3", "4"],
  });

  useEffect(() => {
    const fetchRules = () => {
      const newData = {
        maxVisitor: Math.ceil(Math.random() * 10),
        maxVisitorStatus: true,
        maxTime: Math.ceil(Math.random() * 3),
        maxTimeStatus: true,
        rules: [
          Math.random().toString(36).substring(8),
          Math.random().toString(36).substring(8),
          Math.random().toString(36).substring(8),
          Math.random().toString(36).substring(8),
        ],
      };
      setFormData(newData);
    };
    fetchRules();
    const interval = setInterval(fetchRules, 8000);
    return () => clearInterval(interval);
  }, []);

  const onChange = (e) => {
    const newForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(newForm);
    console.log(newForm);
  };

  const onChangeSwitch = (e) => {
    const newForm = { ...formData, [e.target.name]: e.target.checked };
    setFormData(newForm);
    console.log(newForm);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const deleteSessionDay = (e) => {
    const idx = weekDaySession.findIndex(
      (x) => Number(x.session) === Number(e.target.value)
    );
    const newData = [...weekDaySession];
    if (idx !== -1) newData.splice(idx, 1);
    setweekDaySession(newData);
  };

  const deleteSessionEnd = (e) => {
    const idx = weekEndSession.findIndex(
      (x) => Number(x.session) === Number(e.target.value)
    );
    const newData = [...weekEndSession];
    if (idx !== -1) newData.splice(idx, 1);
    setweekEndSession(newData);
  };

  const updateSessionDay = (e) => {
    const idx = weekDaySession.findIndex(
      (x) => Number(x.session) === Number(updateDay)
    );
    console.log(idx);
    const newData = [...weekDaySession];
    console.log(newData);

    const newInput = {
      session: updateDay,
      from: editDay.fromDay,
      to: editDay.toDay,
    };
    console.log(newInput);
    if (idx !== -1) newData.splice(idx, 1, newInput);
    setweekDaySession(newData);
  };
  const updateSessionEnd = (e) => {
    console.log(updateEnd);
    const idx = weekDaySession.findIndex(
      (x) => Number(x.session) === Number(updateEnd)
    );
    const newData = [...weekEndSession];
    const newInput = {
      session: updateEnd,
      from: editEnd.fromEnd,
      to: editEnd.toEnd,
    };
    console.log(newInput);
    if (idx !== -1) newData.splice(idx, 1, newInput);
    setweekEndSession(newData);
  };

  const addWeekDaySession = () => {
    const newData = [...weekDaySession];
    const newInput = {
      session: weekDaySession.length + 1,
      from: editDay.fromDay,
      to: editDay.toDay,
    };
    newData.push(newInput);
    setweekDaySession(newData);
  };
  const addWeekEndSession = () => {
    const newData = [...weekEndSession];
    const newInput = {
      session: weekEndSession.length + 1,
      from: editEnd.fromEnd,
      to: editEnd.toEnd,
    };
    newData.push(newInput);
    console.log(newData);
    setweekEndSession(newData);
  };

  const onChangeDay = (e) => {
    const newData = { ...editDay, [e.target.name]: e.target.value };
    console.log(newData);
    setEditDay(newData);
  };
  const onChangeEnd = (e) => {
    const newData = { ...editEnd, [e.target.name]: e.target.value };
    setEditEnd(newData);
  };
  const onChangeRules = (e) => {
    setNewRules(e.target.value);
  };
  const onSubmitRules = () => {
    const newData = { ...formData };
    newData.rules.push(newRules);
    console.log(newData);
    setFormData(newData);
  };
  const deleteRules = (x)=>{
    const list= [...formData.rules]
    const idx = list.findIndex(
      (item) => item.trim()===x.trim()
    );
    if (idx!==-1) list.splice(idx, 1);
    const newInput={...formData,rules:list};
    console.log(newInput);
    setFormData(newInput);
  }
  return (
    <Fragment>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h4 mb-0 text-gray-800">Available Weekday Sessions</h1>
        <h1 className="h4 mb-0 text-gray-800">{}</h1>
      </div>
      {/* 1st Row Start */}
      <div className="row">
        {/* Start of Card */}
        {weekDaySession &&
          weekDaySession.map((x) => (
            <div className="col-xl-2 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center p-0">
                    <div className="col mr-2">
                      <div className="text-sm font-weight-bold text-dark text-uppercase mb-1">
                        Session {x.session}
                      </div>
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {x.from} - {x.to}
                      </div>
                    </div>
                    <div className="col-auto">
                      <button
                        value={x.session}
                        className="btn fas fa-edit fa-2x text-danger-300 p-0 ml-2"
                        style={{ fontSize: "2.2em", color: "orange" }}
                        data-toggle="modal"
                        data-target="#updateSessionDay"
                        onClick={(e) => {
                          setUpdateDay(e.target.value);
                          setEditDay({
                            ...editDay,
                            sessionDay: e.target.value,
                          });
                        }}
                      ></button>
                      <button
                        className="btn fas fa-times fa-2x text-danger-300 p-0 ml-2"
                        style={{ fontSize: "2.5em", color: "red" }}
                        value={x.session}
                        onClick={deleteSessionDay}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* End of Card */}
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
          {/* 0th Modal */}
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
                    Add Weekday Session
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
                        name="fromDay"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        value={editDay.fromDay}
                        onChange={onChangeDay}
                      />
                      <br />
                      <br />
                      <br />
                      <TextField
                        id="time"
                        label="To"
                        type="time"
                        name="toDay"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        value={editDay.toDay}
                        onChange={onChangeDay}
                      />
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={addWeekDaySession}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* 1th Modal */}
          <div
            className="modal fade"
            id="setWeekEnds"
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
                    Add Weekend Session
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
                        name="fromEnd"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        value={editEnd.fromEnd}
                        onChange={onChangeEnd}
                      />
                      <br />
                      <br />
                      <br />
                      <TextField
                        id="time"
                        label="To"
                        type="time"
                        name="toEnd"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        value={editEnd.toEnd}
                        onChange={onChangeEnd}
                      />
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={addWeekEndSession}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd Modal */}
          <div
            className="modal fade"
            id="updateSessionDay"
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
                    Update Weekday Session {updateDay}
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
                        name="fromDay"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        value={editDay.fromDay}
                        onChange={onChangeDay}
                      />
                      <br />
                      <br />
                      <br />
                      <TextField
                        id="time"
                        label="To"
                        type="time"
                        name="toDay"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        value={editDay.toDay}
                        onChange={onChangeDay}
                      />
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={updateSessionDay}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd Modal */}

          <div
            className="modal fade"
            id="updateSessionEnd"
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
                    Update Weekend Session {updateEnd}
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
                        name="fromEnd"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        value={editEnd.fromEnd}
                        onChange={onChangeEnd}
                      />
                      <br />
                      <br />
                      <br />
                      <TextField
                        id="time"
                        label="To"
                        type="time"
                        name="toEnd"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: "200px" }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                        value={editEnd.toEnd}
                        onChange={onChangeEnd}
                      />
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={updateSessionEnd}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4th Modal */}

          <div
            className="modal fade"
            id="addRules"
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
                    Add New Rules
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
                        id="standard-basic"
                        type="text"
                        label="Input New Rules"
                        name="newRules"
                        style={{ width: "250px" }}
                        value={newRules}
                        onChange={(e) => onChangeRules(e)}
                        className=" mb-2"
                      />
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    data-dismiss="modal"
                    onClick={onSubmitRules}
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
        {weekEndSession &&
          weekEndSession.map((x) => (
            <div className="col-xl-2 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center p-0">
                    <div className="col mr-2">
                      <div className="text-sm font-weight-bold text-dark text-uppercase mb-1">
                        Session {x.session}
                      </div>
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {x.from} - {x.to}
                      </div>
                    </div>
                    <div className="col-auto">
                      <button
                        value={x.session}
                        className="btn fas fa-edit fa-2x text-danger-300 p-0 ml-2"
                        style={{ fontSize: "2.2em", color: "orange" }}
                        data-toggle="modal"
                        data-target="#updateSessionEnd"
                        onClick={(e) => {
                          setUpdateEnd(e.target.value);
                          setEditEnd({
                            ...editEnd,
                            sessionEnd: e.target.value,
                          });
                        }}
                      ></button>
                      <button
                        value={x.session}
                        onClick={deleteSessionEnd}
                        className="btn fas fa-times fa-2x text-danger-300 p-0 ml-2"
                        style={{ fontSize: "2.5em", color: "red" }}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                    data-target="#setWeekEnds"
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
                {formData.maxVisitorStatus ? (
                  <h4 className="text-primary mt-2">Enabled</h4>
                ) : (
                  <h4 className="text-secondary mt-2"> Disabled</h4>
                )}

                <Switch
                  checked={formData.maxVisitorStatus}
                  onChange={onChangeSwitch}
                  color="primary"
                  name="maxVisitorStatus"
                  value={formData.maxVisitorStatus}
                  label="hi"
                />
              </div>
            </div>
            <div className="col-5">
              <div
                className={`ml-4 ${!formData.maxVisitorStatus && "invisible"}`}
              >
                <div className="d-flex flex-row bd-highlight mt-3 ">
                  <h5>Max Visitor per bed :</h5>
                  <TextField
                    id="standard-basic"
                    type="text"
                    // label="Visitee's name"
                    name="maxVisitor"
                    style={{ width: "25px" }}
                    value={formData.maxVisitor}
                    onChange={(e) => onChange(e)}
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
                {formData.maxTimeStatus ? (
                  <h4 className="text-primary mt-2">Enabled</h4>
                ) : (
                  <h4 className="text-secondary mt-2">Disabled</h4>
                )}
                <Switch
                  checked={formData.maxTimeStatus}
                  onChange={onChangeSwitch}
                  color="primary"
                  name="maxTimeStatus"
                  label="hi"
                />
              </div>
            </div>
            <div className="col-5">
              <div className={`ml-4 ${!formData.maxTimeStatus && "invisible"}`}>
                <div className="d-flex flex-row bd-highlight mt-3 ">
                  <h5>Max time limit :</h5>
                  <TextField
                    id="standard-basic"
                    type="text"
                    // label="Visitee's name"
                    name="maxTime"
                    style={{ width: "25px" }}
                    value={formData.maxTime}
                    onChange={(e) => onChange(e)}
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
            {formData.rules &&
              formData.rules.map((x, i) => (
                <Fragment>
                  <div class="d-flex justify-content-between">
                    <li
                      className="list-group-item my-1 "
                      style={{ width: "900px" }}
                    >
                      {i + 1}. {x}
                    </li>
                    <button
                      className="btn fas fa-times text-danger-300 p-0 m-auto"
                      style={{ fontSize: "2em", color: "red" }}
                      onClick={() => deleteRules(x)}
                      button
                    />
                  </div>{" "}
                </Fragment>
              ))}
          </ul>
        </div>
        <div className="col-auto">
          <Fab
            aria-label="add"
            className="btn mx-auto text-light bg-success"
            data-toggle="modal"
            data-target="#addRules"
          >
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
