import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Import Component
import SidePanel from "./layout/SidePanel";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import { Button } from "@material-ui/core";
import IndivualCard from "./visitor/IndivualCard";


// import 'bootstrap/dist/css/bootstrap.css';
function createData(bed, visitor) {
  return { bed, visitor };
}
const rowsOld = [
  createData(0,0),
  createData(0,0),
  createData(0,0),
  createData(0,0),
  createData(0,0),

  createData(0,0),
  createData(0,0),
].sort((a, b) => (a.visitor < b.visitor ? -1 : 1));

function createWard(ward,rows){
  return {ward,rows}
}

const wardOld= [
  createWard(Math.ceil(Math.random()*1000),rowsOld),
  createWard(Math.ceil(Math.random()*1000),rowsOld),
  createWard(Math.ceil(Math.random()*1000),rowsOld),
  createWard(Math.ceil(Math.random()*1000),rowsOld),
  createWard(Math.ceil(Math.random()*1000),rowsOld),
  createWard(Math.ceil(Math.random()*1000),rowsOld),
]

const Visitor = (props) => {
  const [max,setMax]=useState(5);
  const [wards,setWard]= useState(wardOld);
  // console.log(wardOld);
  useEffect(() => {
    const fetchRows=  () => {
      const newRows= Array.from({length: 11}, () =>{
        const newBed=Math.ceil(Math.random()*10)
        const newVisitors=Math.ceil(Math.random()*6 );
         return createData(newBed,newVisitors);
      }).sort((a, b) => (a.visitor < b.visitor ? 1 : -1));
      return newRows;
    };
    const fetchwards= async() =>{
      const newWards= Array.from({length: 20},  () =>{
        const newWard= Math.ceil(Math.random()*3)*100+Math.ceil(Math.random()*3);
        const newRows2=  fetchRows();
        return createWard(newWard,newRows2);
        }).sort((a, b) => (a.ward < b.ward ? -1 : 1));
        console.log(newWards);
        setWard(newWards);
      console.log('ward Updated',wards);

    }
    fetchwards();
    const interval = setInterval(fetchwards, 8000);
    return () => clearInterval(interval);
  }, []);

  const [floor, setFloor] = useState(1);
  return (
    <div id="wrapper">
      <SidePanel msg="visitor"/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* Masukin Semua Konten Disini ! */}
          <TopBar
            message="Visitor"
            burger={true}
            userName=""
            profilePicture=""
          />
          <div className="container-fluid ">
            <div className="text-center">
              <Button onClick={() => setFloor(1)}>LT1</Button>
              <Button onClick={() => setFloor(2)}>LT2</Button>
              <Button onClick={() => setFloor(3)}>LT3</Button>
            </div>

            {floor === 1 && (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 justify-content-start">
              {wards.filter(wards=>wards.ward<200 && wards.ward>100).map(wards=>(<IndivualCard rows={wards.rows} ward={wards.ward} max={max}/>))}
                <h5>
                  {/* {JSON.stringify(wards)} */}
                </h5>
              </div>
            )}
            {floor === 2 && (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 justify-content-start">
              {wards.filter(wards=>wards.ward<300 && wards.ward>200).map(wards=>(<IndivualCard rows={wards.rows} ward={wards.ward} max={max}/>))}

              </div>
            )}
            {floor === 3 && (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 justify-content-start">
              {wards.filter(wards=>wards.ward<400 && wards.ward>300).map(wards=>(<IndivualCard rows={wards.rows} ward={wards.ward} max={max}/>))}

              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

Visitor.propTypes = {};

export default Visitor;
