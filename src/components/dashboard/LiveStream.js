import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import LiveStreamCard from './livestream/LiveStreamCard';
import SidePanel from './layout/SidePanel';
import TopBar from './layout/TopBar';
import Footer from './layout/Footer';

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

const LiveStream = props => {
  const [max,setMax]=useState(5);
  const [wards,setWard]= useState(wardOld);
  // console.log(wardOld);
  useEffect(() => {
    const fetchRows=  () => {
      const newRows= Array.from({length: 16}, () =>{
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
    }
    fetchwards();
    console.log('ward',wards);
    const interval = setInterval(fetchwards, 3000);
    return () => clearInterval(interval);
  }, []);
    return (
        <div id="wrapper">
        <SidePanel msg="livestream"/>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBar
              message="Livestream Visitor"
              burger={true}
              userName=""
              profilePicture=""
            />
            <div className="container-fluid ">
            {/* Content */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 justify-content-start">
            
            {wards[0].rows.sort((a,b)=>(a.bed>b.bed?1:-1)).map(rows=>(<LiveStreamCard bed={rows.bed} visitors={rows.visitor} max={max}/>))}
            {/* <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard />
            <LiveStreamCard /> */}

            </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
}

LiveStream.propTypes = {

}

export default LiveStream
