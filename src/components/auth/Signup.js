import React, { useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import "./Signup.css";
import "./assets/vendor/fontawesome-free/css/all.min.css";
import TextField from "@material-ui/core/TextField";
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
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Actions
import { signupCognito } from "../../actions/auth";
import TopBarGuest from "../dashboard/layout/TopBarGuest";
import {setAlert} from "../../actions/alert";

function getSteps() {
  return ["Login Details", "Personal Details", "Upload Pictures"];
}

const Signup = ({setAlert,alert}) => {
  // State
  const [uploadA,setUploadA] = useState(false);
  const [uploadB,setUploadB] = useState(false);
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
    ektp,
  } = formData;

function hasUpperCase(str) {
    return str.toLowerCase() != str;
}
function hasNumber(myString) {
  return /\d/.test(myString);
}
function hasLength(str){
  return str.length>=8;
}
  const checkEmpty=()=>{
    return ((email==="")|| (password==="")|| (passwordConfirm==="")|| (fullName==="")|| (gender==="")|| (address==="")|| (birthDate==="")||(phone==="")||(profilePicture==="")||(ektp===""));
  }
  const checkPass= ()=>{
   return password !== passwordConfirm;
  }
  const validateForm = () =>{
    if(checkEmpty()) setAlert("Fill every field !","danger");
    if(checkPass()) setAlert("Password doesn't match !","danger");
    if(!hasUpperCase(password)) setAlert("Password must have uppercase letter !","danger");
    if(!hasNumber(password)) setAlert("Password must include Number !","danger");
    if(!hasLength(password)) setAlert("Password length must be 8 or longer !","danger");
    return (checkEmpty() || checkPass() || !hasUpperCase(password) ||!hasNumber(password) ||!hasLength(password) );
  }
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
    if (validateForm()) return;
    handleNext();
    signupCognito(
        email,
        password,
        fullName,
        gender,
        birthDate,
        address,
        phone,
        profilePicture,
        ektp
      );
  };

  const uploadprofile = async (e) => {
    setUploadA(true);

    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "userimages");
    const body = data;
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/awshackaton/image/upload",
      body
    );
    //Upload
    setUploadA(false);
    setFormData({ ...formData, profilePicture: res.data.url });
  };
  const uploadektp = async (e) => {
    setUploadB(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "userimages");
    const body = data;
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/awshackaton/image/upload",
      body
    );
    //Upload
    setUploadB(false);
    setFormData({ ...formData, ektp: res.data.url });
  };

  return (
    <Fragment>
      <Helmet>
        <style>{"body { background-color: #4E73DF }"}</style>
      </Helmet>
      <div className="wrapper">
        <TopBarGuest message="Obscura" burger={false} />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row justify-content-center">
                    <div
                      className="col-lg-7 d-none d-lg-block bg-login-image"
                      style={{ height: "650px" }}
                    ></div>

                    <div
                      className="col-lg-5 align-items-center p-2 "
                      style={{ height: "650px" }}
                    >
                        {alert && alert.map(x=>              <div className={`alert alert-${x.alertType} mx-3`} role="alert">
  {x.msg}
</div>)}
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 my-2">
                          Account Registration
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
                        <Fragment>
                          <div className="d-flex justify-content-center mb-3">
                            <Typography
                              className="my-3 p-2"
                              style={{ width: "250px", textAlign: "center" }}
                            >
                              Register Successfull, please check your email for
                              confirmation.
                            </Typography>
                          </div>
                          <Link
                            to="/"
                            className="btn btn-secondary btn-lg bottomDiv"
                          >
                            Home
                          </Link>
                        </Fragment>
                      ) : (<Fragment>
                        <div className="mx-5 p-1 text-center h-70" style={{height:"315px"}}>
                          {activeStep === 0 ? (
                            <div>
                              <TextField
                                id="standard-basic"
                                label="Standard"
                                type="text"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                className="mb-3 "
                                style={{ width: "230px" }}
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
                                style={{ width: "230px" }}
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
                                style={{ width: "230px" }}
                              />
                            </div>
                          ) : null}
                          {activeStep === 1 ? (
                            <div>
                              <TextField
                                id="standard-basic"
                                label="Standard"
                                type="text"
                                label="Full Name"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => onChange(e)}
                                className=" mb-2"
                                style={{ width: "230px" }}
                              />
                              <br />
                              <FormControl style={{ width: "230px" }}>
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
                                style={{ width: "230px" }}
                              />
                              <TextField
                                name="address"
                                className="mb-3"
                                id="standard-multiline-static"
                                label="Address"
                                multiline
                                rows={2}
                                value={address}
                                style={{ width: "230px" }}
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
                                style={{ width: "230px" }}
                              />
                            </div>
                          ) : null}
                          {activeStep === 2 ? (
                            <Fragment>
                              <h6 className="mb-2 mt-3">
                              {uploadA  && <div className="spinner-border visible mb-1 mr-1" role="status" style={{height:"15px",width:"15px"}}>
                          </div>}
                               {profilePicture ? "Profile Picture Uploaded !": "Upload your Profile Picture !"}
                              </h6>
                              <input
                                type="file"
                                name="file"
                                placeholder="Upload Profile Picture !"
                                onChange={uploadprofile}
                                className="form-control-file mb-4"
                                style={{ width: "230px" }}
                              />
                              <h6 className="mb-2 mt-3">
                              {uploadB && <div className="spinner-border visible mb-1 mr-1" role="status" style={{height:"15px",width:"15px"}}>
                          </div>}
                          {ektp ? "E-KTP Uploaded !": "Upload your E-KTP !"}
                              </h6>
                              <input
                                type="file"
                                name="file"
                                placeholder="Upload E-KTP !"
                                onChange={uploadektp}
                                className="form-control-file   mb-5"
                                style={{ width: "230px" }}
                              />
                            </Fragment>
                          ) : null}
                        </div>
                        <div className="my-4 mx-1 text-center ">
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
                                Finish
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
                          </Fragment>
                      )}

                    </div>
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

Signup.propTypes = {
  alert: PropTypes.array.isRequired,
  setAlert:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert
});

export default connect(mapStateToProps, {setAlert})(Signup);
