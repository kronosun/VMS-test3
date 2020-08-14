import React, {useState,useEffect} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SidePanel from "./layout/SidePanel";
import TopBar from "./layout/TopBar";
import TabelSchedule from './schedule/TabelSchedule';
import Footer from './layout/Footer';

const rowsdemo = [
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/11/1',1),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/11/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/11/1',1),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/11/1',1),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/11/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/11/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/11/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/13/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/14/1',1),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/15/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/24/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/21/1',1),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/08/23/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/09/11/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/09/13/3',3),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/09/08/2',2),
  createData(Math.random().toString(36).substring(7),Math.ceil( Math.random()*200+100), Math.random().toString(36).substring(7),Math.random().toString(36).substring(7), '2020/10/01/1',1),
];

function createData(visitId, ward, visitee, visitor, date,session) {
  return { visitId, ward, visitee, visitor, date,session };
}

const Schedules = () => {
  const [rows,setRows]=useState(rowsdemo);
  useEffect(() => {
    const fetchRows= async () => {
      const newRows= Array.from({length: 40}, () =>{
        const newVisit=Math.random().toString(36).substring(7);
        const newWard=Math.ceil(Math.random()*2)*100+(Math.ceil(Math.random()*2));
        const newVisitee=Math.random().toString(36).substring(7)
        const newVisitor= Math.random().toString(36).substring(7)
        const newSession=Math.ceil(Math.random()*3);
        const newDay=Math.ceil(Math.random()*5+10);
        const newDate=`2020/08/${newDay}/${newSession}/${newWard}`

         return createData(newVisit,newWard,newVisitee,newVisitor,newDate ,newSession)
      });
      setRows(newRows);
    };
    fetchRows();
    const interval = setInterval(fetchRows, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div id="wrapper">
      <SidePanel msg="schedules"/>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar message="Schedules" burger={true}  userName="" profilePicture=""/>
        <div className="container-fluid mx-auto px-5 py-2" >
        <TabelSchedule rows={rows} />

        </div>

        </div>
        <Footer />
      </div>
    </div>
  );
};

Schedules.propTypes = {};

export default Schedules;
