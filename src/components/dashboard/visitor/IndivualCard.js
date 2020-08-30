import React, { Fragment,useState,useEffect } from "react";
import {updateAccess, getAllBed,dummyFetch} from '../../../actions/api';
import TableBed from "./TableBed";
//Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {setAlert} from '../../../actions/alert';

const IndivualCard = ({rows,max,ward,access,floorNumber,fetchData,alert,setAlert}) => {
  const akses=access=="true";
  const changeAccess= async() =>{
    await updateAccess(String(floorNumber),String(ward),akses);
    await fetchData();
    setAlert("Access Changed !","success");
  }
  return (
    <Fragment>
    <div className="col y-2 ">
      <div className={`card border-secondary shadow border-bottom-secondary px-4 py-2 mx-3 my-3`}>

        <div className="card-body p-0 mx-2 text-center">
          <h2 className="card-title text-center text-dark">Ward {ward}</h2>

          {akses &&<i className="btn fas fa-unlock fa-2x text-success collapse show " id="lockWard" onClick={changeAccess}></i>}
          {!akses &&<i className="btn fas fa-lock fa-2x text-danger collapse show " id="lockWard" onClick={changeAccess}></i>}
  


          {/* <h2 className="card-title text-center">Ward <br   /> {ward}</h2> */}
          <div className="mx-auto" >

          </div>

          <hr className="mt-0 mb-2 border"/>
          <div className="container-fluid px-2 py-4">
          <TableBed rows={rows} max={max} />


          <h5 className={`text-${access=="true"?"success":"danger"} collapse show mt-2`} id="lockWard">
          {access=="true"?"Access: Allowed":"Access: Denied"}
        </h5>
         

          </div>
          
        </div></div>
    </div>

    </Fragment>
  );
};

IndivualCard.propTypes = {
  alert: PropTypes.array.isRequired,
  setAlert:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert
});

export default connect(mapStateToProps, {setAlert})(IndivualCard);
