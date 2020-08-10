import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import "./Signup.css";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";

//Redux
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import { signupCognito, loadUser, logOut } from "../../actions/auth";

function getSteps() {
  return ["Check Availibity", "Confirm"];
}

const Book = () => {

  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    fullName: "",
    gender: "",
    address: "",
    birthDate: "",
    phone: "",
    profilePicture: "",
    ektp: "",
  });
  const {
    email,
    password,
    passwordConfirm,
    fullName,
    gender,
    address,
    birthDate,
    phone,
    profilePicture,
    ektp
  } = formData;

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

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row justify-content-center">
                  <div
                    className="col-lg-8 align-items-center p-4 "
                    style={{ height: "600px" }}
                  >
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 my-2">
                        Book a Visit
                      </h1>
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
                            Book Successfull, please keep this link to generate QR Digital Badge : 
                        </Typography>
                        <Link to="/book/102832923">Click Here !</Link>
                        {/* <Link
                          to="/"
                          className="btn btn-secondary btn-lg bottomDiv"
                        >
                          Home
                        </Link> */}
                      </div>
                    ) : (
                      <div className="mx-3 p-2 text-center">
                        {/* Where to put test cases */}
                        {/* <Typography>{activeStep}</Typography> */}
                        {activeStep === 0 ? (
                          <Fragment>
                            <TextField
                              id="standard-basic"
                              label="Standard"
                              type="text"
                              label="Email"
                              name="email"
                              value={email}
                              onChange={(e) => onChange(e)}
                              className="my-3"
                            />
                            <br />
                            <TextField
                              id="standard-basic"
                              label="Standard"
                              type="password"
                              autoComplete="current-password"
                              label="Password"
                              name="password"
                              value={password}
                              onChange={(e) => onChange(e)}
                              className="my-3"
                            />
                            <br />

                            <TextField
                              id="standard-basic"
                              label="Standard"
                              type="password"
                              autoComplete="current-password"
                              label="Confirm Password"
                              name="passwordConfirm"
                              value={passwordConfirm}
                              onChange={(e) => onChange(e)}
                              className="my-3"
                            />
                          </Fragment>
                        ) : null}
                        {activeStep === 1 ? (
                          <Fragment>
                            <TextField
                              id="standard-basic"
                              label="Standard"
                              type="text"
                              label="Full Name"
                              name="fullName"
                              value={fullName}
                              onChange={(e) => onChange(e)}
                              className="mt-1 mb-2"
                            />
                            <br />
                            <FormControl>
                              <InputLabel htmlFor="age-native-simple">
                                Gender
                              </InputLabel>
                              <Select
                                native
                                value={gender}
                                onChange={(e) => onChange(e)}
                                inputProps={{
                                  name: "gender",
                                  id: "gender-picker",
                                }}
                              >
                                <option aria-label="None" value="" />
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                              </Select>
                            </FormControl>
                            <br />
                            <TextField
                              name="birthDate"
                              id="date"
                              label="Birthday"
                              type="date"
                              className="mt-2"
                              value={birthDate}
                              onChange={(e) => onChange(e)}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            <TextField
                              name="address"
                              className="mb-3"
                              id="standard-multiline-static"
                              label="Address"
                              multiline
                              rows={2}
                              value={address}
                              onChange={(e) => onChange(e)}
                            />
                            <br />
                            <TextField
                              name="phone"
                              value={phone}
                              onChange={(e) => onChange(e)}
                              id="standard-number"
                              label="Phone Number"
                              type="number"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Fragment>
                        ) : null}

                        <div className="my-3 mx-1">
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
                        
                      </div>
                    )}
                  </div>
                  <div
                    className="col-lg-4 d-none d-lg-block bg-login-image"
                    style={{ height: "600px" }}
                  ></div>
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


