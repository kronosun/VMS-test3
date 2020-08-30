import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

const fromTimetoMilliseconds = (time) =>{
  function zeroPad(numberStr) {
    return ("0" + numberStr).slice(-2);
  }
  
const formattedtime= `${zeroPad(Number(time.substring(0,2)))}:${time.substring(3,8)}`;
const format = `${((new Date(Date.now())).getFullYear())}-${zeroPad((new Date(Date.now())).getMonth()+1)}-${zeroPad((new Date(Date.now())).getDate())}T${formattedtime}.000Z`
const test= (new Date(format)).getTime()-7*3600000;
return test ;

}
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" }
  ];

const Gantt = ({sessionArray}) => {
    return (
      <Fragment>
      {sessionArray && sessionArray.length !==0 &&<div className="px-2 py-2 mt-3">
                    <Chart
        //   width={"100%"}
        //   height={"400px"}
          chartType="Gantt"
//           loader={<div className="spinner-border mx-auto" role="status">
//   <span className="sr-only">Loading...</span>
// </div>}
          data={[
            [
              { type: "string", label: "Task ID" },
              { type: "string", label: "Task Name" },
              { type: "string", label: "Resource" },
              { type: "date", label: "Start Date" },
              { type: "date", label: "End Date" },
              { type: "number", label: "Duration" },
              { type: "number", label: "Percent Complete" },
              { type: "string", label: "Dependencies" }
            ],
            ...sessionArray.map(x=>[
              `Session ${String(x.session_number)}`,
              `Session ${String(x.session_number)}`,
              "Session",
              new Date(fromTimetoMilliseconds(String(x.session_from))),
              new Date(fromTimetoMilliseconds(String(x.session_to))),
              null,
              100,
              null
            ])
          ]}
          options={{
            title: 'Company Performance',
            gantt: {
              trackHeight: 50
            },
          }}
        //   rootProps={{ "data-testid": "2" }}
        />
        </div> }
        
        </Fragment>
    )
}

Gantt.propTypes = {

}

export default Gantt
