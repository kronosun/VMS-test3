import React, { Fragment, useEffect,useState } from "react";
import { Helmet } from "react-helmet";
import "./Signup.css";
import { QRCode } from "react-qr-svg";
import "./assets/vendor/fontawesome-free/css/all.min.css";
// import 'bootstrap/dist/css/bootstrap.css';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//Redux
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import { TableHead } from "@material-ui/core";

import {getHistory} from '../../actions/api';
const ProfileUser = ({
  match,
  attributes: {
    userId,
    address,
    birthdate,
    phone,
    gender,
    admin,
    profile,
    name,
    email,
    ektp,
  },
}) => {
  const [data,setData]= useState(
    []
  );
  useEffect(()=>{
    const fetchHistory= async ()=>{
      const res= await getHistory(match.params.id);
      console.log(res);
      setData(res);
    }
    fetchHistory();
    const interval = setInterval(fetchHistory,4500);
    return ()=>clearInterval(interval);
  },[])
  return (
    <Fragment>
      <Helmet>
        <style>{"body { background-color: #4E73DF }"}</style>
      </Helmet>

      <div className="container">
        <div className="row justify-content-center">
          <div className=" col-lg-6 col-md-6 col-sm-5">
            <div className="card o-hidden border-0 shadow-lg my-3">
              <div className="card-body ">
                <div className="row justify-content-center">
                  <div
                    className="col-lg-8 col-sm-8 align-items-center text-center px-1 "
                    style={{ height: "auto" }}
                  >
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-1">
                        Visitor's Profile
                      </h1>
                    </div>
{name ? (           <Fragment>         <img
                      className="shadow img-profile rounded-circle mx-1 mt-2"
                      src={profile}
                      style={{ width: "115px", height: "115px" }}
                    />
                    <br />
                    <p className="h4 text-dark mt-3 mb-0">{name}</p>
                    <hr className="border-bottom-primary" />
                    <TableContainer
                      component={Paper}
                      style={{ width: "600x" }}
                      className="mb-3 mx-0"
                    >
                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow key={0}>
                            <TableCell component="th" scope="row">
                              Email
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {email}
                            </TableCell>
                          </TableRow>
                          <TableRow key={4}>
                            <TableCell component="th" scope="row">
                              Birth Date
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {birthdate}
                            </TableCell>
                          </TableRow>
                          <TableRow key={3}>
                            <TableCell component="th" scope="row">
                              Gender
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {gender}
                            </TableCell>
                          </TableRow>
                          <TableRow key={5}>
                            <TableCell component="th" scope="row">
                              Address
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {address}
                            </TableCell>
                          </TableRow>
                          <TableRow key={6}>
                            <TableCell component="th" scope="row">
                              Phone Number
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {phone}
                            </TableCell>
                          </TableRow>
                          <TableRow key={1}>
                            <TableCell component="th" scope="row">
                              Status
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {admin ? "Admin" : "Visitor"}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <img
                      className="shadow-sm border border-light rounded img-profile mx-1 mt-2"
                      src={ektp}
                      style={{ width: "250px", height: "130px" }}
                    />
                    {/* <button
                      className="btn btn-primary mt-2"
                      type="button"
                      data-toggle="collapse"
                      data-target="#hist"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      My History
                    </button>  */}
                    {data &&data.length!==0 && (                    
  
  <div className="collapse show mt-4" id="hist">
  <h5 className="text-secondary my-2">My Book History</h5>
                      <div className="shadow-sm">
                      <TableContainer
                      component={Paper}
                      style={{ width: "600x" }}
                      className="mb-3 mx-0"
                    >
                      <Table aria-label="simple table">
                      <TableHead>
                <TableRow>
                  <TableCell   component="th" scope="row" key={uuidv4()} align="left">
                    Date
                  </TableCell>
                  <TableCell component="th" scope="row" key={uuidv4()} align="right">
                    Visitee
                  </TableCell>                  
                  <TableCell component="th" scope="row" key={uuidv4()} align="right">
                    Link
                  </TableCell>
                </TableRow>
              </TableHead>
                        <TableBody>
                        {data &&data.length!==0 && data.map(x=><Fragment>
                          <TableRow key={uuidv4()}>

                          <TableCell component="th" scope="row">
                          {x.date}
                            </TableCell>
                            <TableCell
                            key={uuidv4()}
                              align="right"
                              style={{ fontSize: "0.8rem" }}
                            >
                              {x.visitee}
                            </TableCell>
                            <TableCell
                            key={uuidv4()}
                              align="right"
                              style={{ fontSize: "0.8rem" }}
                            >
                              <Link to={`/book/${x.id}`}>Click Here!</Link>
                            </TableCell>
                          </TableRow>

                        </Fragment>)}
                           
                        </TableBody>
                      </Table>
                    </TableContainer>
                      </div>
                    </div>)}
                    </Fragment>) : <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>}

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

ProfileUser.propTypes = {
  attributes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  attributes: state.auth.attributes,
});

export default connect(mapStateToProps, {})(ProfileUser);
