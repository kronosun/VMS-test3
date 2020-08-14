import React, { Fragment,useState } from "react";

import TableBed from "./TableBed";

const IndivualCard = ({rows,max,ward}) => {
  // console.log(rows);
  return (
    <Fragment>
    <div className="col p-0 ">
      
      <div className="card border-secondary shadow border-bottom-primary p-4 mx-3 my-3">
        <div className="card-body p-0 mx-2">
          <h2 className="card-title text-center">Ward <br   /> {ward}</h2>

          <hr className="mt-0 mb-2 border"/>
          <div className="container-fluid p-2">
          <TableBed rows={rows} max={max} />
            
          </div>
        </div>
      </div>
    </div>

    </Fragment>
  );
};

IndivualCard.propTypes = {};

export default IndivualCard;

          {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p> */}
          {/* <TableContainer
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
          </TableContainer> */}