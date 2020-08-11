import React, { useState, Fragment } from "react";
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
import TopBar from "../dashboard/TopBar";
//Redux
import { Link } from "react-router-dom";
// Actions

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
  return ["Check Availibity", "Confirm"];
}

const Book = () => {
  // State
  const [formData, setFormData] = useState({
    visitee: "",
    ward: "",
    date: "",
    session: "",
  });
  const { visitee, ward, date, session } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleNext();
    console.log(formData);
  };

  return (
    <Fragment>
      <Helmet>
        <style>{"body { background-color: #4E73DF }"}</style>
      </Helmet>
      <div className="wrapper">
        <TopBar message="Obscura" burger={false} userName="" profilePicture="" />
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
                          <Typography className="my-5 p-3">
                            Book Successfull, please keep this link to generate
                            QR Digital Badge :
                          </Typography>
                          {/* target="_blank" */}
                          <Link to="/book/102832923">Click Here !</Link>
                        </div>
                      ) : (
                        <div className="mx-3 p-2 text-center h-100 ">
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

                              <FormControl
                                component="fieldset"
                                style={{ width: "250px" }}
                              >
                                <FormLabel component="legend">
                                  Available Sessions
                                </FormLabel>
                                <RadioGroup
                                  defaultValue="female"
                                  aria-label="gender"
                                  name="session"
                                  value={session}
                                  onChange={(e) => onChange(e)}
                                >
                                  <FormControlLabel
                                    className="my-1"
                                    value="1"
                                    control={<StyledRadio />}
                                    label="Session 1 (09.00 - 12.00)"
                                  />
                                  <FormControlLabel
                                    className="my-1"
                                    value="2"
                                    control={<StyledRadio />}
                                    label="Session 2 (14.00 - 17.00)"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Fragment>
                          ) : null}
                          {activeStep === 1 ? (
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
                              >
                                Book
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                              >
                                Next
                              </Button>
                            )}
                          </div>
                          <div className="my-4 mx-1 ">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-toggle="modal"
                              data-target="#exampleModalScrollable"
                            >
                              Read Regulations
                            </button>

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
                                      <li className="list-group-item">
                                        Limit visitors to two per patient at one
                                        time.
                                      </li>
                                      <li className="list-group-item">
                                        Maintain low voice tones in all areas of
                                        the hospital.
                                      </li>
                                      <li className="list-group-item">
                                        Adhere to visiting hours.
                                      </li>
                                      <li className="list-group-item">
                                        Restrict calls to patient rooms after 9
                                        p.m.
                                      </li>
                                      <li className="list-group-item">
                                        Avoid visiting in hallways in patient
                                        care areas.
                                      </li>
                                      <li className="list-group-item">
                                        If you notice an area for improvement
                                        regarding noise levels in the hospital,
                                        please notify the nursing staff,
                                        Department Director or Coordinator. We
                                        thank you for your understanding and
                                        cooperation.
                                      </li>
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
                          {/* <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div> */}
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

export default Book;
