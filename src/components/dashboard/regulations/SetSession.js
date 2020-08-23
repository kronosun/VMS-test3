import React, { Fragment, useState, useEffect } from "react";
import SessionCard from "./SessionCard";
import { Button } from "react-scroll";
import { TextField, Fab } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import AddIcon from "@material-ui/icons/Add";
import {getRules, updateRules} from '../../../actions/api';
//Redux
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {setAlert} from '../../../actions/alert';

const dataDummy = async ()=>{
  const data ={
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
  return data;
}

const SetSession = ({alert,setAlert}) => {
  const [state,setState] = useState(false);
  const [newRules, setNewRules] = useState("");
  const [updateDay, setUpdateDay] = useState(-1);
  const [updateEnd, setUpdateEnd] = useState(-1);
  const [editDay, setEditDay] = useState({
    sessionDay: updateDay,
    fromDay: "00:00",
    toDay: "00:00",
  });
  const [editEnd, setEditEnd] = useState({
    sessionEnd: updateEnd,
    fromEnd: "00:00",
    toEnd: "00:00",
  }
  );
  const [weekDaySession, setweekDaySession] = useState([
    // {
    //   session_number: 1,
    //   session_from: "00:00",
    //   session_to: "00:00",
    // },
    // {
    //   session_number: 2,
    //   session_from: "00:00",
    //   session_to: "00:00",
    // },
  ]);

  const [weekEndSession, setweekEndSession] = useState([
    // {
    //   session_number: 1,
    //   session_from: "00:00",
    //   session_to: "00:00",
    // },
    // {
    //   session_number: 2,
    //   session_from: "00:00",
    //   session_to: "00:00",
    // },
  ]);
  const [formData, setFormData] = useState({
    maxVisitor: 0,
    maxVisitorStatus: true,
    maxTime: 0,
    maxTimeStatus: true,
    rules: [],
  });
  const fetchRules = async() => {
    const newData = await getRules();
    const freshFormData={
      maxVisitor: Number(newData.maxVisitor),
      maxVisitorStatus: String(newData.maxVisitorStatus)==='true',
      maxTime: Number(newData.maxTime),
      maxTimeStatus: String(newData.maxTimeStatus)==='true',
      rules: newData.rules
    }
    const freshWeekDay=[...newData.weekDaySession];
    const freshWeekEnd=[...newData.weekEndSession];
    const test= await dataDummy();
    console.log("formData",freshFormData);
    console.log("weekday",freshWeekDay);
    console.log("weekend",freshWeekEnd);
    console.log("test",test);
    setFormData(freshFormData);
    setweekDaySession(freshWeekDay);
    setweekEndSession(freshWeekEnd);
    setState(true);
  };
  const reAdjust = () =>{
    console.log("Readjusting");
    console.log(weekDaySession);
    console.log(weekEndSession);
    if(weekDaySession.length===0) return;
    const newDay= weekDaySession.map((x,i)=>({...x,session_number:(i+1)}));
    console.log(newDay);
    setweekDaySession(newDay);

    if(weekEndSession.length===0) return;
    const newEnd= weekEndSession.map((x,i)=>({...x,session_number:(i+1)}));
    console.log(newEnd);
    setweekEndSession(newEnd);
  }

  useEffect(() => {

    fetchRules();
    // const interval = setInterval(reAdjust, 500);
    // return () => clearInterval(interval);
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
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(weekDaySession);
    console.log(weekEndSession);
    const newSessionDay={
      session_day: 'weekday',
      sessions:[...weekDaySession]
  }
  
  const newSessionEnd={
      session_day: 'weekend',
      sessions:[...weekEndSession]
  }
  
  const newFormat={
      Rules: 'RULES',
      session_rules:[newSessionDay,newSessionEnd],
      maximum_visitor:{
          max_visitor:formData.maxVisitor,
          max_time:formData.maxTime,
          max_time_status:formData.maxTimeStatus,
          max_visitor_status:formData.maxVisitorStatus
      },
      general:[...formData.rules]
  }
  setState(false);

  console.log("SEND",JSON.stringify(newFormat));
    const code =await updateRules(newFormat);
    if (code===200)console.log("Update SUCCESS");
    await fetchRules();
    setAlert("Rules Updated !","success");

  };

  const deleteSessionDay = (e) => {
    const idx = weekDaySession.findIndex(
      (x) => Number(x.session_number) === Number(e.target.value)
    );

    const newData = [...weekDaySession];
    if (idx !== -1) newData.splice(idx, 1);
    const final=newData.map((x,i)=>({...x,session_number:(i+1)}))

    setweekDaySession(final);
    setAlert("Session Deleted !","danger");

  };

  const deleteSessionEnd = (e) => {
    const idx = weekEndSession.findIndex(
      (x) => Number(x.session_number) === Number(e.target.value)
    );
    const newData = [...weekEndSession];
    if (idx !== -1) newData.splice(idx, 1);
    const final=newData.map((x,i)=>({...x,session_number:(i+1)}))

    setweekEndSession(final);
    setAlert("Session Deleted !","danger");

  };

  const updateSessionDay = (e) => {
    const idx = weekDaySession.findIndex(
      (x) => Number(x.session_number) === Number(updateDay)
    );
    console.log(idx);
    const newData = [...weekDaySession];
    console.log(newData);

    const newInput = {
      session_number: updateDay,
      session_from: editDay.fromDay.concat(":00"),
      session_to: editDay.toDay.concat(":00"),
    };
    console.log(newInput);
    if (idx !== -1) newData.splice(idx, 1, newInput);

    const final=newData.map((x,i)=>({...x,session_number:(i+1)}))

    setweekDaySession(final);
    setAlert("Session Updated !","warning");

  };
  const updateSessionEnd = (e) => {
    console.log(updateEnd);
    const idx = weekDaySession.findIndex(
      (x) => Number(x.session_number) === Number(updateEnd)
    );
    const newData = [...weekEndSession];
    const newInput = {
      session_number: updateEnd,
      session_from: editEnd.fromEnd.concat(":00"),
      session_to: editEnd.toEnd.concat(":00"),
    };
    console.log(newInput);
    if (idx !== -1) newData.splice(idx, 1, newInput);
    const final=newData.map((x,i)=>({...x,session_number:(i+1)}))

    setweekEndSession(final);
    setAlert("Session Updated !","warning");

  };

  const addWeekDaySession = () => {
    const newData = [...weekDaySession];
    const newInput = {
      session_number: weekDaySession.length + 1,
      session_from: editDay.fromDay.concat(":00"),
      session_to: editDay.toDay.concat(":00"),
    };
    newData.push(newInput);
    const final=newData.map((x,i)=>({...x,session_number:(i+1)}))
    setweekDaySession(final);
    setAlert("Session Added !","success");

  };
  const addWeekEndSession = () => {
    const newData = [...weekEndSession];
    const newInput = {
      session_number: weekEndSession.length + 1,
      session_from: editEnd.fromEnd.concat(":00"),
      session_to: editEnd.toEnd.concat(":00"),
    };
    newData.push(newInput);
    console.log(newData);
    const final=newData.map((x,i)=>({...x,session_number:(i+1)}))
    setweekEndSession(final);
    setAlert("Session Added !","success");

  };

  const onChangeDay = (e) => {
    const newData = { ...editDay, [e.target.name]: e.target.value };
    // console.log(newData);
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
    setAlert("Rules Deleted !","danger");
  }
  return (
    <Fragment>
    {alert && alert.map(x=>              <div className={`alert alert-${x.alertType}`} role="alert">
  {x.msg}
</div>)}
{state ? (    <Fragment>
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
                        Session {x.session_number}
                      </div>
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {x.session_from.substring(0,5)} - {x.session_to.substring(0,5)}
                      </div>
                    </div>
                    <div className="col-auto">
                      <button
                        value={Number(x.session_number)}
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
                        value={Number(x.session_number)}
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
                        Session {x.session_number}
                      </div>
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        {x.session_from.substring(0,5)} - {x.session_to.substring(0,5)}
                      </div>
                    </div>
                    <div className="col-auto">
                      <button
                        value={Number(x.session_number)}
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
                        value={Number(x.session_number)}
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
          <div className=" row justify-content-start ml-2" >
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
                className={`ml-4 ${!formData.maxVisitorStatus && "invisible"}`} style={{width:"350px"}}
              >
                <div className="d-flex flex-row bd-highlight mt-3 ml-2">
                  <h5>Max Visitor per bed :</h5>
                  <TextField
                    id="standard-basic"
                    type="text"
                    // label="Visitee's name"
                    name="maxVisitor"
                    style={{ width: "25px" }}
                    value={formData.maxVisitor}
                    onChange={(e) => onChange(e)}
                    className="ml-3 mb-3"
                  />
                  <h5>visitors</h5>
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
          <div className=" row justify-content-start " >
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
              <div className={`ml-4 ${!formData.maxTimeStatus && "invisible"}`} style={{width:"280px"}}>
                <div className="ml-2 d-flex flex-row bd-highlight mt-3" >
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
                  <h5>Hours</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end  */}
      </div>

      <div className="d-sm-flex align-items-center justify-content-start mb-2 mt-2">
        <h1 className="h4 mb-0 text-gray-800">Written Rules</h1>
      </div>    

      <div className="row align-items-center mx-1 mb-5">
        <div className="col-6">
          <ul className="list-group ">
            {formData.rules &&
              formData.rules.map((x, i) => (
                <Fragment>
                  <div className="d-flex justify-content-between">
                    <li
                      className="list-group-item my-1 "
                      style={{ width: "900px" }}
                    >
                      {i + 1}. {x}
                    </li>
                    <button
                      className="btn fas fa-times text-danger-300 p-0 m-auto"
                      style={{ fontSize: "1.3em", color: "red" }}
                      onClick={() => deleteRules(x)}
                    />
                  </div>{" "}
                </Fragment>
              ))}
          </ul>
        </div>
        <div className="col-auto">
          <Fab
            aria-label="add"
            className="btn mx-auto text-light bg-success "
            data-toggle="modal"
            data-target="#addRules"
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="d-sm-flex align-items-center justify-content-center mb-3">
        <button className="btn btn-success my-3" onClick={onSubmit}>Update Regulation</button>
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
    </Fragment>):                           ( <div className="text-center"><div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div></div>)}
    </Fragment>
  );
};

SetSession.propTypes = {
  alert: PropTypes.array.isRequired,
  setAlert:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert
});

export default connect(mapStateToProps, {setAlert})(SetSession);