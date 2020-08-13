import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// Import Component
import SidePanel from "./SidePanel";
import TopBar from "./TopBar";
import WardCard from './visitor/WardCard';
import Footer from './Footer';
import { Button } from "@material-ui/core";
// import 'bootstrap/dist/css/bootstrap.css';
const Visitor = (props) => {
  const [floor,setFloor]= useState(1);
  return (
    <div id="wrapper">
      <SidePanel />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
        {/* Masukin Semua Konten Disini ! */}
          <TopBar message="Visitor" burger={true} userName="" profilePicture=""/>
          <div className="container-fluid ">

<div className="text-center">
<Button onClick={()=>setFloor(1)}>LT1</Button>
<Button onClick={()=>setFloor(2)}>LT2</Button>
<Button onClick={()=>setFloor(3)}>LT3</Button>
<Button onClick={()=>setFloor(4)}>LT4</Button>
</div>

{
  floor===1 && (          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 " >
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />

          </div>)
}
{
  floor===2 && (          <div className="row row-cols-1 row-cols-lg-5 " >
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />

          </div>)
}
{
  floor===3 && (          <div className="row row-cols-1 row-cols-lg-5 " >
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />

          </div>)
}
{
  floor===4 && (          <div className="row row-cols-1 row-cols-lg-5 " >
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />
          <WardCard />

          </div>)
}


          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

Visitor.propTypes = {};

export default Visitor;
