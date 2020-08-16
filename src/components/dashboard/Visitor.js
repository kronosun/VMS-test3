import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Import Component
import SidePanel from "./layout/SidePanel";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import { Button } from "@material-ui/core";
import IndivualCard from "./visitor/IndivualCard";
import {getAllBed} from '../../actions/api';

function createData(BedNumber, visitorCount) {
  return { BedNumber, visitorCount };
}
const rowsOld = [
  createData(0, 4),
  createData(0, 0),
  createData(0, 0),
  createData(0, 0),
  createData(0, 0),
  createData(0, 0),
  createData(0, 0),
].sort((a, b) => (a.visitorCount < b.visitorCount ? -1 : 1));

function createWard(WardNumber, Beds, WardAccess) {
  return { WardNumber, Beds, WardAccess };
}

const wardOld = [
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
  createWard(Math.ceil(Math.random() * 1000), rowsOld, Math.random() >= 0.5),
];
const fetchRows = () => {
  const newRows = Array.from([...Array(5).keys()], (x) => {
    const newBed = x + 1;
    const newVisitors = Math.ceil(Math.random() * 6);
    return createData(newBed, newVisitors);
  }).sort((a, b) => (a.visitor < b.visitor ? 1 : -1));
  return newRows;
};
const fetchwards = (floor) => {
  const newWards = Array.from([...Array(5).keys()], (x) => {
    const newWard = Math.ceil(floor) * 100 + (x + 1);
    const newRows2 = fetchRows();
    return createWard(newWard, newRows2, Math.random() >= 0.5);
  }).sort((a, b) => (a.WardNumber < b.WardNumber ? -1 : 1));
  // setWard(newWards);
  // console.log("ward Updated", wards);
  return newWards;
};

const fetchFloor = () => {
  const newFloors = Array.from([1, 2, 3], (x) => {
    // console.log(fetchwards(x));
    return createFloor(x, fetchwards(x));
  }).sort((a, b) => (a.FloorNumber > b.FloorNumber ? 1 : -1));
  // console.log(newFloors);
  return newFloors;
};

// MAIN COMPONENT

const createFloor = (FloorNumber, Wards) => ({ FloorNumber, Wards });
const Visitor = (props) => {
  const [max, setMax] = useState(5);
  const [floors, setFloors] = useState([]);
  const [floorFilter,setFloorFilter]= useState(1);
  useEffect(() => {
    const fetchData = async () => {
      // const res = await fetchFloor();
      const res = await getAllBed();
      setFloors(res);
      console.log("floors", res);
    };
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
          <div className="container-fluid ">
            <div className="text-center">
              <div className="btn-group" role="group" aria-label="Basic example">
              {/* <h1>
                {JSON.stringify(floors.map(floor=>Number(floor.FloorNumber)))}
              </h1> */}
              
              {floors.map(floor=>Number(floor.FloorNumber)) &&floors.map(floor=>Number(floor.FloorNumber)).sort((a,b)=>a>b?1:-1).map(x=><button type="button" className="btn btn-secondary" onClick={() => setFloorFilter(x)}>
              {x===1 && "1st Floor"}
              {x===2 && "2nd Floor"}
              {x===3 && "3rd Floor"}
              {x>3 && `${x}th Floor`}
              </button>)}

            </div>
            </div>
            {/* map(x=><h1>{JSON.stringify(x)}</h1>) */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 justify-content-start">
              {floors.filter(floor=>Number(floor.FloorNumber)===floorFilter).map(x=>x.Wards)[0] && floors.filter(floor=>Number(floor.FloorNumber)===floorFilter).
              map((current,idx,array)=>              <IndivualCard
                        rows={current.Wards[0].Beds}
                        ward={Number(current.Wards[0].WardNumber)}
                        max={max}
                        access={current.Wards[0].WardAccess}
                        floorNumber={current.FloorNumber}
                      />  )}

              
              {/* x.Wards)[0].map(x=>
              <IndivualCard
                        rows={x.Beds}
                        ward={Number(x.WardNumber)}
                        max={max}
                        access={(x.WardAccess)}
                        floorNumber={}
                      />)} */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

Visitor.propTypes = {};

export default Visitor;
