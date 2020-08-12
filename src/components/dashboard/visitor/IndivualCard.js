import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from '@material-ui/core/TableHead'
import Paper from "@material-ui/core/Paper";
import TableBed from "./TableBed";
import { v4 as uuidv4 } from 'uuid';

const IndivualCard = (props) => {
  return (
    <Fragment>
      {/* style={{ width: "18rem" }} */}
      <div className="card border-secondary shadow border-bottom-primary p-3">
        <div className="card-body p-0">
          <h2 className="card-title text-center">Ward <br   /> 101</h2>
          {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
          <hr className="mt-0 mb-2 border"/>
          <TableContainer
            component={Paper}
            // style={{ width: "300px" }}
            className="shadow-sm p-1 border border-dark rounded-lg"
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row" key={uuidv4()} align="left">
                    Bed
                  </TableCell>
                  <TableCell component="th" scope="row" key={uuidv4()} align="right">
                    Visitor
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={uuidv4()}>
                  <TableCell component="th" scope="row">
                  {Math.ceil(Math.random()*100)}
                  </TableCell>
                  <TableCell align="right">{Math.ceil(Math.random()*10)}</TableCell>
                </TableRow>
                <TableRow key={uuidv4()}>
                  <TableCell component="th" scope="row">
                  {Math.ceil(Math.random()*100)}
                  </TableCell>
                  <TableCell align="right">{Math.ceil(Math.random()*10)}</TableCell>
                </TableRow>
                <TableRow key={uuidv4()}>
                  <TableCell component="th" scope="row">
                  {Math.ceil(Math.random()*100)}
                  </TableCell>
                  <TableCell align="right">{Math.ceil(Math.random()*10)}</TableCell>
                </TableRow>
                <TableRow key={uuidv4()}>
                  <TableCell component="th" scope="row">
                  {Math.ceil(Math.random()*100)}
                  </TableCell>
                  <TableCell align="right">{Math.ceil(Math.random()*10)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TableBed /> */}
        </div>
      </div>
    </Fragment>
  );
};

IndivualCard.propTypes = {};

export default IndivualCard;
