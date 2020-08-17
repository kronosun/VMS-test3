import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

function daysToMilliseconds(days) {
    return days * 24 * 60 * 60 * 1000;
  }

function fastForward(time,hours){
  return time + hours*3600*1000;
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

const Gantt = props => {
    return (
      <Fragment>
        <div className="px-1 py-0">
                    <Chart
        //   width={"100%"}
        //   height={"400px"}
          chartType="Gantt"
          loader={<div>Loading Chart</div>}
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
            [
              "session1",
              "Session 1",
              "Session Weekday",
              new Date(1597338452000),
              new Date(fastForward(1597338452000,2)),
              null,
              100,
              null
            ],
            [
              "session2",
              "Session 2",
              "Session Weekday",
              new Date(1597339452000),
              new Date(fastForward(1597339452000,2)),
              null,
              100,
              null
            ],
            [
              "session3",
              "Session 3",
              "Session Weekday",
              new Date(1597348452000),
              new Date(fastForward(1597348452000,2)),
              null,
              100,
              null
            ]
          ]}
          options={{
            height: "auto",
            gantt: {
              trackHeight: 50
            }
          }}
        //   rootProps={{ "data-testid": "2" }}
        />
        </div>
        </Fragment>
    )
}

Gantt.propTypes = {

}

export default Gantt
