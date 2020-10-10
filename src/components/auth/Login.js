import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
// Import CSS
import "./assets/css/sb-admin-2.css";
import "./assets/vendor/fontawesome-free/css/all.min.css";
//Redux
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TopBarGuest from "../dashboard/layout/TopBarGuest";
// Actions
import { loadUser, loginCognito } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { CSSTransition } from "react-transition-group";
const Login = ({
  loginCognito,
  isAdmin,
  isAuthenticated,
  setAlert,
  alert,
  loading,
}) => {
  const [choice, setChoice] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pressed, setPressed] = useState(false);
  //State
  const onSubmit = async (e) => {
    setPressed(true);
    e.preventDefault();
    await loginCognito(email, password);
  };
  const clickVisitor = () => {
    setChoice(true);
  };
  if (isAuthenticated && isAdmin !== null) {
    if (isAdmin) {
      return <Redirect to="/dashboard" />;
    } else {
      return <Redirect to="/book" />;
    }
  }
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
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>

                    <div
                      className="col-lg-6 text-center"
                      style={{ height: "650px" }}
                    >
                      {alert &&
                        alert.map((x) => (
                          <div
                            className={`alert alert-${x.alertType} mx-1`}
                            role="alert"
                          >
                            {x.msg}
                          </div>
                        ))}
                      <div className="p-5" style={{ height: "375px" }}>
                        {choice ? (
                          <Fragment>
                              <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-5 mt-1">
                                  Welcome Back!
                                </h1>
                              </div>

                              <form className="user">
                                <div className="form-group">
                                  <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="form-control form-control-user mb-4"
                                    id="exampleInputEmail"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Email Address..."
                                  />
                                </div>
                                <div className="form-group">
                                  <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                    type="password"
                                    className="form-control form-control-user mb-0"
                                    id="exampleInputPassword"
                                    placeholder="Password"
                                  />
                                </div>
                                <br />

                                <button
                                  type="submit"
                                  className="btn btn-primary btn-user btn-block mb-3 mt-0"
                                  onClick={onSubmit}
                                >
                                  Login
                                </button>
                                {pressed && !(!loading && !isAuthenticated) ? (
                                  <div
                                    className="spinner-border visible mb-3"
                                    role="status"
                                  ></div>
                                ) : null}
                              </form>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <div className="text-center">
                              <h1 className="h4 text-gray-900 mb-5 mt-1">
                                Account Access
                              </h1>
                            </div>
                            <div className="row m-4"></div>
                            <div className="row mt-3">
                              <div
                                className="btn col-sm border-right"
                                onClick={clickVisitor}
                              >
                                <i
                                  className="fas fa-users"
                                  style={{ fontSize: "6rem" }}
                                />
                                <h3 className="text-dark my-3">Visitor</h3>
                              </div>

                              <div
                                className="btn col-sm border-left"
                                onClick={clickVisitor}
                              >
                                <i
                                  className="fas fa-users-cog"
                                  style={{ fontSize: "6rem" }}
                                />
                                <h3 className="text-dark my-3">Admin</h3>
                              </div>
                            </div>
                          </Fragment>
                        )}
                      </div>
                      <hr className="mb-3" />
                      <div className="text-center my-4">
                        <small>Don't Have an Account ? </small>
                        <Link className="small" to="/register">
                          Create an Account!
                        </Link>
                      </div>
                      <div className="text-center my-3">
                        <Link className="small" to="/forgot-password">
                          Forgot Password?
                        </Link>
                      </div>
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
Login.propTypes = {
  loadUser: PropTypes.func.isRequired,
  loginCognito: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  alert: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  isAdmin: state.auth.isAdmin,
  alert: state.alert,
});

export default connect(mapStateToProps, { loadUser, loginCognito, setAlert })(
  Login
);
