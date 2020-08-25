import React, { useState, Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Signup.css";
import "./assets/vendor/fontawesome-free/css/all.min.css";

import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//Components
import TopBar from "../dashboard/layout/TopBar";
//Redux
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import {
  getWrittenRules,
  getAvailableSessions,
  bookSchedule,
} from "../../actions/api";
import {setAlert} from '../../actions/alert';

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}
function getSteps() {
  return ["Pick the Date", "Choose Session", "Confirm"];
}

const Book = ({ userId, name, setAlert, alert}) => {
  // State
  const [appointment, setAppointment] = useState("");
  const [rules, SetRules] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [formData, setFormData] = useState({
    visitee: "",
    ward: "",
    date: "",
    session: "",
  });
  const { visitee, ward, date, session } = formData;
  const fetchRules = async () => {
    const data = await getWrittenRules();
    SetRules(data);
  };
  const fetchSession = async (x) => {
    if (x === "") return;
    const sessionFetch = await getAvailableSessions(x);
    setSessions(sessionFetch);
  };
  useEffect(() => {
    fetchRules();
    // fetchSession();
    // const interval = setInterval(fetchSession, 10000);
    // return () => clearInterval(interval);
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    fetchSession(date);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleNext();
    const dataSent = {
      visitor: name,
      userid: userId,
      visitee: visitee,
      room: String(ward),
      date: date,
      session: String(session),
    };
    const res = await bookSchedule(dataSent);
    if (res.statusCode===200){
      setAppointment(res.body);
    }
    else if (res.statusCode === 201) {
    setAlert("Sessions is full !","danger");
    setActiveStep((prevActiveStep) => prevActiveStep - 3);

    }
    else if (res.statusCode=== 202){
      setAlert("Incorrect visitee or wards number","danger");
    setActiveStep((prevActiveStep) => prevActiveStep - 3);

    }
  };

  return (
    <Fragment>
      <Helmet>
        <style>{"body { background-color: #4E73DF }"}</style>
      </Helmet>
      <div className="wrapper">
        <TopBar
          message="Obscura"
          burger={false}
          userName=""
          profilePicture=""
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row justify-content-center ">
                    <div
                      className="col-lg-8 align-items-center p-4 "
                      style={{ height: "700px" }}
                    >
                                                                {alert && alert.map(x=>              <div className={`alert alert-${x.alertType} mx-1`} role="alert">
  {x.msg}
</div>)}
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 my-2">Book a Visit</h1>
                      </div>
                      {/* Tempat Isinya */}
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      {activeStep === steps.length ? (
                        <div className="text-center">
                          {appointment !== "" && (
                            <Fragment>
                              {" "}
                              <Typography className="my-5 p-3">
                                Book Successfull, please keep this link to
                                generate QR Digital Badge :
                              </Typography>
                              <Link to={`/book/${appointment}`}>
                                Click Here !
                              </Link>
                            </Fragment>
                          )}
                          {appointment === "" && (
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          )}
                          {/* {String(appointment)==='false' && <h3 className="text-danger">
                              Book Failed, Please reconfirm your input !
                          </h3>} */}
                          {/* target="_blank" */}
                        </div>
                      ) : (
                        <div
                          className="mx-3 p-2 text-center"
                          style={{ height: "300px" }}
                        >
                          {activeStep === 0 ? (
                            <Fragment>
                              <TextField
                                id="standard-basic"
                                type="text"
                                label="Visitee's name"
                                name="visitee"
                                style={{ width: "250px" }}
                                value={visitee}
                                onChange={(e) => onChange(e)}
                                className=" mb-2"
                              />
                              <br />
                              <TextField
                                id="standard-basic"
                                type="number"
                                label="Ward's Number"
                                name="ward"
                                style={{ width: "250px" }}
                                value={ward}
                                onChange={(e) => onChange(e)}
                                className="my-1 mb-2"
                              />
                              <br />
                              <TextField
                                name="date"
                                id="date"
                                label="Visit Date"
                                type="date"
                                className="mt-2 mb-4"
                                style={{ width: "250px" }}
                                value={date}
                                onChange={(e) => onChange(e)}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                              <br />
                            </Fragment>
                          ) : null}
                          {activeStep === 1 ? (
                            <Fragment>
                              <FormControl
                                component="fieldset"
                                style={{ width: "250px" }}
                              >
                                <FormLabel component="legend" className="my-4">
                                  Available Sessions
                                </FormLabel>
                                <RadioGroup
                                  defaultValue="female"
                                  aria-label="gender"
                                  name="session"
                                  value={session}
                                  onChange={(e) => onChange(e)}
                                >
                                  {sessions.map((x, i) => (
                                    <FormControlLabel
                                      className="my-1"
                                      key={i}
                                      value={String(x.session_number)}
                                      control={<StyledRadio />}
                                      label={`Session ${
                                        i + 1
                                      } (${x.session_from.substring(
                                        0,
                                        5
                                      )} - ${x.session_to.substring(0, 5)})`}
                                    />
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              {sessions.length ===0 &&
                              (<Fragment>
                              <br />
                              <div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div></Fragment>)}
                            </Fragment>
                          ) : null}
                          {activeStep === 2 ? (
                            <Fragment>
                              <p className="h4 my-4">Visit Confirmation</p>
                              <div className="d-flex justify-content-center mb-3">
                                <TableContainer
                                  component={Paper}
                                  style={{ width: "300px" }}
                                  className="shadow"
                                >
                                  <Table aria-label="simple table">
                                    <TableBody>
                                      <TableRow key={0}>
                                        <TableCell component="th" scope="row">
                                          Visitee's Name
                                        </TableCell>
                                        <TableCell align="right">
                                          {visitee}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow key={1}>
                                        <TableCell component="th" scope="row">
                                          Ward's Number
                                        </TableCell>
                                        <TableCell align="right">
                                          {ward}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow key={2}>
                                        <TableCell component="th" scope="row">
                                          Visit Date
                                        </TableCell>
                                        <TableCell align="right">
                                          {date}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow key={3}>
                                        <TableCell component="th" scope="row">
                                          Session
                                        </TableCell>
                                        <TableCell align="right">
                                          {session}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </div>
                            </Fragment>
                          ) : null}

                          <div className="my-4 mx-1 ">
                            <div
                              className="modal fade"
                              id="exampleModalScrollable"
                              tabIndex="-1"
                              role="dialog"
                              aria-labelledby="exampleModalScrollableTitle"
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-scrollable"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalScrollableTitle"
                                    >
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
                                    <ul className="list-group">
                                      {rules &&
                                        rules.length !== 0 &&
                                        rules.map((x, i) => (
                                          <li
                                            className="list-group-item"
                                            key={i}
                                          >
                                            {i + 1}. {x}
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        //Before this
                      )}
                      {(activeStep === 0 ||
                        activeStep === 1 ||
                        activeStep === 2) && (
                        <div className="container-fluid text-center">
                          <div className="mt-3 mb-2 mx-1 ">
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                            >
                              Back
                            </Button>

                            {activeStep === steps.length - 1 ? (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={onSubmit}
                                className="mx-2"
                              >
                                Book
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className="mx-2"

                              >
                                Next
                              </Button>
                            )}
                          </div>
                          <button
                            type="button"
                            className="btn btn-secondary my-2"
                            data-toggle="modal"
                            data-target="#exampleModalScrollable"
                          >
                            Regulations
                          </button>
                        </div>
                      )}
                    </div>
                    <div
                      className="col-lg-4 d-none d-lg-block bg-login-image"
                      style={{ height: "700px" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Book.propTypes = {
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  alert:PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  userId: state.auth.attributes.userId,
  name: state.auth.attributes.name,
  alert :state.alert
});

export default connect(mapStateToProps, {setAlert})(Book);
