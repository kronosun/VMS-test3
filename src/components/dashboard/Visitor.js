import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Import Component
import SidePanel from "./layout/SidePanel";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import { Button } from "@material-ui/core";
import IndivualCard from "./visitor/IndivualCard";
import {getAllBed,getMax} from '../../actions/api';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {setAlert} from '../../actions/alert';

// MAIN COMPONENT

const Visitor = ({alert,setAlert}) => {
  const [max, setMax] = useState(5);
  const [floors, setFloors] = useState([]);
  const [floorFilter,setFloorFilter]= useState(1);
  const fetchData = async () => {
    const res = await getAllBed();
    const maxData= await getMax();
    setFloors(res);
    setMax(maxData);
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="wrapper">
      <SidePanel msg="visitor" />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* Masukin Semua Konten Disini ! */}
          <TopBar
            message="Visitor"
            burger={true}
            userName=""
            profilePicture=""
            isLock={true}
          />
          <div className="container-fluid" >
          {alert && alert.map(x=>              <div class={`alert alert-${x.alertType}`} role="alert">
  {x.msg}
</div>)}
            <div className="text-center">
            {floors.length ===0 && <div className="spinner-border mx-auto" role="status">
  <span className="sr-only">Loading...</span>
</div>}
              <div className="btn-group collapse show" role="group" aria-label="Basic example" id="sidebarcollapse">

              
              {floors && floors.length !==0 && floors.map(floor=>Number(floor.FloorNumber)) &&floors.map(floor=>Number(floor.FloorNumber)).sort((a,b)=>a>b?1:-1).map(x=><button type="button" className="btn btn-secondary" onClick={() => setFloorFilter(x)}>
              {x===1 && "1st Floor"}
              {x===2 && "2nd Floor"}
              {x===3 && "3rd Floor"}
              {x>3 && `${x}th Floor`}
              </button>)}

            </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 justify-content-start">
              {floors && floors.length!==0 && floors.filter(floor=>Number(floor.FloorNumber)===floorFilter).map(x=>x.Wards)[0] && floors.filter(floor=>Number(floor.FloorNumber)===floorFilter).
              map((current)=>current.Wards)[0].map(ward=><IndivualCard
                        rows={ward.Beds}
                        ward={Number(ward.WardNumber)}
                        max={max}
                        access={ward.WardAccess}
                        floorNumber={floorFilter}
                        fetchData={fetchData}
                        key={uuidv4()}
                      />)}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

Visitor.propTypes = {
  alert: PropTypes.array.isRequired,
  setAlert:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert
});

export default connect(mapStateToProps, {setAlert})(Visitor);