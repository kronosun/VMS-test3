import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./Signup.css";
import { QRCode } from "react-qr-svg";
import "./assets/vendor/fontawesome-free/css/all.min.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getBookId } from "../../actions/api";

const BookId = ({ match, profile }) => {
  const [form, setForm] = useState({});
  const [state, setState] = useState(false);
  const fetchBook = async () => {
    const res = await getBookId(match.params.id);
    setForm(res);
    setState(true);
  };
  useEffect(() => {
    fetchBook();
  }, []);

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
                    className="col-lg-8 col-sm-5 align-items-center text-center "
                    style={{ height: "615px" }}
                  >
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-1">Visitor Badge</h1>
                    </div>

                    <small className="d-block text-muted inline-block mt-1 mb-1">
                      {match.params.id}
                    </small>
                    {form && state ? (
                      <Fragment>
                        {" "}
                        <img
                          alt="profile"
                          className="shadow img-profile rounded-circle mx-1 mt-2"
                          src={profile}
                          style={{ width: "115px", height: "115px" }}
                        />
                        <br />
                        <p className="h4 text-dark mt-3 mb-0">{form.visitor}</p>
                        <hr className="border-bottom-primary" />
                        <TableContainer
                          component={Paper}
                          style={{ width: "315x" }}
                          className="mb-3"
                        >
                          <Table aria-label="simple table">
                            <TableBody>
                              <TableRow key={0}>
                                <TableCell component="th" scope="row">
                                  Visitee's Name
                                </TableCell>
                                <TableCell align="right">
                                  {form.visitee}
                                </TableCell>
                              </TableRow>
                              <TableRow key={1}>
                                <TableCell component="th" scope="row">
                                  Ward's Number
                                </TableCell>
                                <TableCell align="right">{form.room}</TableCell>
                              </TableRow>
                              <TableRow key={2}>
                                <TableCell component="th" scope="row">
                                  Visit Date
                                </TableCell>
                                <TableCell align="right">{form.date}</TableCell>
                              </TableRow>
                              <TableRow key={3}>
                                <TableCell component="th" scope="row">
                                  Session
                                </TableCell>
                                <TableCell align="right">
                                  {form.session}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <QRCode
                          className="shadow-sm border border-light rounded"
                          level="Q"
                          style={{ width: 130 }}
                          value={form.id}
                        />
                      </Fragment>
                    ) : (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
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

BookId.propTypes = {
  profile: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.auth.attributes.profile,
});

export default connect(mapStateToProps, {})(BookId);
