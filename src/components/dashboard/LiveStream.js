import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LiveStreamCard from "./livestream/LiveStreamCard";
import SidePanel from "./layout/SidePanel";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function createData(bed, visitor) {
  return { bed, visitor };
}
const rowsOld = [
  createData(0, 4),
  createData(0, 0),
  createData(0, 0),
  createData(0, 0),
  createData(0, 0),
  createData(0, 0),
  createData(0, 0),
].sort((a, b) => (a.visitor < b.visitor ? -1 : 1));

function createWard(ward, rows, access) {
  return { ward, rows, access };
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
    return createWard(newWard, newRows2, Math.random() >= 0.1);
  }).sort((a, b) => (a.ward < b.ward ? -1 : 1));
  // setWard(newWards);
  // console.log("ward Updated", wards);
  return newWards;
};

const fetchFloor = () => {
  const newFloors = Array.from([1, 2, 3], (x) => {
    // console.log(fetchwards(x));
    return createFloor(x, fetchwards(x));
  }).sort((a, b) => (a.floor > b.floor ? 1 : -1));
  // console.log(newFloors);
  return newFloors;
};

const createFloor = (floor, wards) => ({ floor, wards });

const LiveStream = (props) => {
  const [max, setMax] = useState(5);
  const [wards, setWard] = useState(wardOld);
  const [floors, setFloors] = useState(fetchFloor());
  const [input, setInput] = useState({
    floorFilter: 1,
    wardFilter: 101,
  });

  const {floorFilter,wardFilter}= input;
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchFloor();
      setFloors(res);
      console.log("floors", floors);
      console.log("map",JSON.stringify(floors));
    };
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  //Functions
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log({ ...input, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };
  return (
    <div id="wrapper">
      <SidePanel msg="livestream" />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar
            message="Livestream Visitor"
            burger={true}
            userName=""
            profilePicture=""
            isLock={false}
          />
          <div className="container-fluid ">
            <div className="d-flex align-items-center mx-auto p-0">
              <button
                className="btn btn-success mx-auto py-0 pr-0 pl-2"
                type="button"
                data-toggle="collapse"
                data-target="#filterCol"
                aria-expanded="false"
                aria-controls="collapseExample"
                style={{ width: "150px" }}
              >
                Toggle Filter{" "}
                <i className="btn fas fa-arrow-down text-light mb-1"></i>
              </button>
            </div>

            <div className="collapse mt-3 mx-auto" id="filterCol">
              <div className="card card-body">
                <div className="row justify-content-center">
                  <div className="col-2">
                    <FormControl
                    >
                      <InputLabel id="input1">Floor</InputLabel>
                      <Select
                        labelId="input1"
                        // id="input1"
                        name="floorFilter"
                        style={{ width: "200px" }}
                        value={floorFilter}
                        onChange={(e) => onChange(e)}
                      >
                        {floors
                          .map((floor) => floor.floor)
                          .map((floor) => (
                            <MenuItem value={floor}>{floor}</MenuItem>
                          ))}
                        {/* <h1>
                       {floors.map((floor) => (floor.floor)}
                        </h1> */}
                         {/* <MenuItem value={2}>2nd Floor</MenuItem>
          <MenuItem value={3}>3rd Floor</MenuItem>  */}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-2">
                    <FormControl>
                      <InputLabel id="input2">Ward</InputLabel>
                      <Select
                        labelId="input2"
                        // id="input2"
                        name="wardFilter"
                        style={{ width: "200px" }}
                        value={wardFilter}
                        onChange={(e) => onChange(e)}
                      >
                        {floors.filter(floor=>floor.floor===floorFilter).map(floor=>floor.wards)[0].map(item=>item.ward).map(ward=><MenuItem value={ward}>{ward}</MenuItem>)}
                        {/* {wards.filter(ward=>ward.ward>input.(floorFilter*100))map(ward=>{ */}
                        {/* })} */}
                      </Select>
                    </FormControl>
                  </div>

                </div>
              </div>
            </div>
            {/* Content */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 justify-content-start">

                {!(floors.filter(floor=>floor.floor===floorFilter).map(floor=>floor.wards)[0].filter(item=>item.ward===wardFilter)[0] == null) && floors.filter(floor=>floor.floor===floorFilter).map(floor=>floor.wards)[0].filter(item=>item.ward===wardFilter)[0].rows.sort((a,b)=>a.bed>b.bed?1:-1)
                .map((rows) => (
                  <LiveStreamCard
                    bed={rows.bed}
                    visitors={rows.visitor}
                    max={max}
                  />
                ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

LiveStream.propTypes = {};

export default LiveStream;
