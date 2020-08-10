import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import "./Signup.css";
import { QRCode } from "react-qr-svg";

import TextField from "@material-ui/core/TextField";
import { makeStyles ,useTheme} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
//Redux
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import { signupCognito, loadUser, logOut } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      flexDirection: "column",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
    alignSelf: "flex-start",
  },
  cover: {
    width: 150,
    height: 150,
    alignItems: "center",

  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  cardContainer: {
    paddingTop: "20px",
  },
}));
const BookId = ({ match }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Fragment>
      <Helmet>
        <style>{"body { background-color: #4E73DF }"}</style>
      </Helmet>

      <div className="container">
        <div className="row justify-content-center">
          <div className=" col-lg-6 col-md-6 col-sm-5">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body ">
                <div className="row justify-content-center">
                  <div
                    className="col-lg-6 col-sm-5 align-items-center  text-center "
                    style={{ height: "600px" }}
                  >
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 my-2">Digital Badge</h1>
                      <QRCode
                        level="Q"
                        style={{ width: 100 }}
                        value={JSON.stringify({
                          id: 928328,
                          name: "Jane Doe",
                          insider: true,
                        })}
                      />
                    </div>
                    {/* Tempat Isinya */}
                    <br />
                    <br />
                    <br />
                    <h2 className="h5 text-gray-900 my-2">
                      Visitor ID : {match.params.id}
                    </h2>
                    <div className="text-center align-items-center">
                    <Card className={classes.card}>
                        <CardMedia
                          className={classes.cover}
                          image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          title="Live from space album cover"
                        />
                    </Card>
                    </div>

                  </div>
                  {/* <div
                    className="col-lg-4 d-none d-lg-block bg-login-image"
                    style={{ height: "600px" }}
                  ></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BookId;
