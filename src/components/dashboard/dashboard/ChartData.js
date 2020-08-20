import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Line, Pie, Bar } from "react-chartjs-2";
import CardDesign from "./CardDesign";
import Gantt from "./Gantt";
import TextBox from "./TextBox";
import {getGeneral,getAvailableSessions,getVisitorData} from '../../../actions/api';
const dataset = {
  labels: [
    "Boston",
    "Worcester",
    "Springfield",
    "Lowell",
    "Cambridge",
    "New Bedford",
  ],
  datasets: [
    {
      data: [617594, 181045, 153060, 106519, 105162, 95072],
      //backgroundColor:'green',
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
        "rgba(255, 99, 132, 0.6)",
      ],
    },
  ],
};

const chartRender = (label,data) =>{
  return ({
    labels: label.map(x=>{
      if(x==='1') return "1st Floor"
      if(x==='2') return "2nd Floor"
      if(x==='3') return "3rd Floor"
      else return `${x}th Floor`
    }) ,
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });
}
const plotRender = (x) =>{
  return ({
    labels: x.map(item=>item.date) ,
    datasets: [
      {
        label: "Visitor",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: x.map(item=>item.visitorToday).reverse(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  });
}

const ChartData = (props) => {
  const [dataChart, setDataChart] = useState({});
  const [plotChart,setPlotChart]=useState({});
  const [general, setGeneral] = useState({
    TotalFloors: "",
    TotalWards: "",
    SumVisitor: "",
    SumOfBlockedWards: "",
    VisitorPerFloor: [],
  });
  const [plot,setPlot] = useState([]);
  const [session,setSession]= useState([]);
  useEffect(() => {
    const updateChart = async () => {
      const res= await getGeneral();
      const ses= await getAvailableSessions(Date.now());
      const plotData= await getVisitorData();
      console.log(ses);
      const label = [
        Math.ceil(Math.random() * 100),
        Math.ceil(Math.random() * 100),
        Math.ceil(Math.random() * 100),
        Math.ceil(Math.random() * 100),
      ];
      const dataNew = chartRender(res.VisitorPerFloor.map(x=>x.FloorNumber),res.VisitorPerFloor.map(x=>x.VisitorCount));
      const plotNew= plotRender(plotData.sort((a,b)=>(a.date>b.date?1:-1)));
      setDataChart(dataNew);
      setGeneral(res);
      setSession(ses);
      setPlotChart(plotNew);
    };
    updateChart();
    const interval = setInterval(updateChart, 1500);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-6">
          <div class="row row-cols-sm-2 p-2">
            <CardDesign
              title="Current Visitor"
              value={general.SumVisitor}
              logo="user-friends"
              color="success"
              colorlogo="success"
            />
            <CardDesign
              title="Wards"
              value={general.TotalWards}
              logo="clinic-medical"
              color="danger"
              colorlogo="danger"
            /> 
            <CardDesign
              title="Floors"
              value={general.TotalFloors}
              logo="hospital"
              color="primary"
              colorlogo="primary"
            />
            <CardDesign
              title="Wards Access Blocked"
              value={general.SumOfBlockedWards}
              logo="shield-alt"
              color="warning"
              colorlogo="warning"
            />
            {/* <CardDesign
              title="Wards Access Blocked"
              value="3"
              logo="shield-alt"
              color="warning"
              colorlogo="warning"
            />
            <CardDesign
              title="Wards Access Blocked"
              value="3"
              logo="shield-alt"
              color="warning"
              colorlogo="warning"
            /> */}
            <h2>
              {/* {JSON.stringify(general.VisitorPerFloor.map(x=>x.FloorNumber))} */}
            </h2>
          </div>
        </div>
        <div className="col-sm-6 px-3 pt-0 pb-2">
          <div class="card mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Visitor</h6>
            </div>
            <div class="card-body">
              <Line
                data={plotChart}
                options={{
                  legend: {
                    display: true,
                    // position: props.legendPosition,
                    labels: {
                      fontColor: "#000",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <div className="py-2 p-3">
            <div class="card mb-4 h-100">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                  Visitor per Floor
                </h6>
              </div>
              <div class="card-body">
                <Pie
                  data={dataChart}
                  options={{
                    legend: {
                      // display: true,
                      // position: true,
                      // labels: {
                      //   fontColor: '#000'
                      // }
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="py-2 p-3">
            <div class="card mb-4 ">
              <div class="card-header py-3 ">
                <h6 class="m-0 font-weight-bold text-primary">
                  Available Sessions Today
                </h6>
              </div>
              <div class="card-body">
                <Gantt sessionArray={session}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <TextBox />
        </div>
      </div>
    </Fragment>
  );
};

ChartData.propTypes = {};

export default ChartData;

{
  /* <Line
data={dataChart}
/> */
}

{
  /* <Pie
data={dataChart}
options={{
  title: {
    display: true,
    text: 'Largest Cities in Massachusetts',
    fontSize: 25
  },
  legend: {
    display: true,
    // position: true,
    labels: {
      fontColor: '#000'
    }
  }
}}
/> */
}

{
  /* <Bar
data={dataChart}
options={{
  title: {
    display: true,
    text: "Largest Cities in Massachusetts",
    fontSize: 25
  },
  legend: {
    display: true,
    // position: props.legendPosition,
    labels: {
      fontColor: "#000"
    }
  }
}}
/> */
}

{
  /* <Line
data={dataset}
options={{
  title: {
    display: true,
    text: "Largest Cities in Massachusetts",
    fontSize: 25
  },
  legend: {
    display: true,
    // position: props.legendPosition,
    labels: {
      fontColor: "#000"
    }
  }
}}
/> */
}
