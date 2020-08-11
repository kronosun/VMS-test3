import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import "./Signup.css";
import { QRCode } from "react-qr-svg";
import "./assets/vendor/fontawesome-free/css/all.min.css";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
            <div className="card o-hidden border-0 shadow-lg my-3">
              <div className="card-body ">
                <div className="row justify-content-center">
                  <div
                    className="col-lg-8 col-sm-5 align-items-center text-center "
                    style={{ height: "615px" }}
                  >
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-1">Digital Badge</h1>
                    </div>

                    <small className="d-block text-muted inline-block mt-1 mb-1">
                      ID : {match.params.id}
                    </small>
                    <img
                      className="shadow img-profile rounded-circle mx-1 mt-2"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT_4XtzuMxsKKa7pro9ySNUnob2o2gFD92NVA&usqp=CAU"
                      style={{ width: "115px", height: "115px" }}
                    />
                    <br />
                    {/* <p className="h3">David Fauzi</p> */}
                    <p className="h4 text-dark mt-3 mb-0">David Fauzi</p>
                    <hr />
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
                            <TableCell align="right">David</TableCell>
                          </TableRow>
                          <TableRow key={1}>
                            <TableCell component="th" scope="row">
                              Ward's Number
                            </TableCell>
                            <TableCell align="right">R102</TableCell>
                          </TableRow>
                          <TableRow key={2}>
                            <TableCell component="th" scope="row">
                              Visit Date
                            </TableCell>
                            <TableCell align="right">10-10-2020</TableCell>
                          </TableRow>
                          <TableRow key={3}>
                            <TableCell component="th" scope="row">
                              Session
                            </TableCell>
                            <TableCell align="right">1 (08.00-11.00)</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <QRCode
                      className="shadow-sm border border-light rounded"
                      level="Q"
                      style={{ width: 130 }}
                      value={JSON.stringify({
                        id: 928328,
                        name: "Jane Doe",
                        insider: true,
                      })}
                    />
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

export default BookId;
