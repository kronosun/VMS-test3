import React ,{useEffect,useState, Fragment} from "react";
import PropTypes from "prop-types";
import { Line,Pie,Bar } from "react-chartjs-2";

const dataset= {
    labels: [
      'Boston',
      'Worcester',
      'Springfield',
      'Lowell',
      'Cambridge',
      'New Bedford'
    ],
    datasets: [
      {
        data: [617594, 181045, 153060, 106519, 105162, 95072],
        //backgroundColor:'green',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }
    ]
  }

const ChartAll = (props) => {
  const [dataChart,setDataChart]=useState({});
  useEffect(() => {
    const updateChart = ()=>{
      const label=[Math.ceil(Math.random()*100), Math.ceil(Math.random()*100), Math.ceil(Math.random()*100), Math.ceil(Math.random()*100), Math.ceil(Math.random()*100), Math.ceil(Math.random()*100), Math.ceil(Math.random()*100)]
      const dataNew = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
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
            data: label,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          },
        ],
      };
      setDataChart(dataNew);
    }
    updateChart();
    const interval=setInterval(updateChart,250);
    return () => {
      clearInterval(interval);
    }
  }, [])
  return (
    <Fragment >
    <div className="row">
    <div className="col-6">
      <Line
        data={dataChart}
        
      />
    </div>
    <div className="col-6">
    <Pie
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
      />
    </div>
    </div>
    <div className="row">
    <div className="col-6">
    <Bar
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
      />
    </div>
    <div className="col-6">
    <Line
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
      />
    </div>
    </div>
    </Fragment>
  );
};

ChartAll.propTypes = {};

export default ChartAll;
