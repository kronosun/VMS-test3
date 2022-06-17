import React, { useState, useEffect } from "react";
import LiveStreamCard from "./livestream/LiveStreamCard";
import SidePanel from "./layout/SidePanel";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getAllBed, getMax, getAvailableSessions } from "../../actions/api";
import Moment from "react-moment";

const checkSession = (session) => {
  const now = new Date(Date.now());
  const newSession = session.filter((x) => {
    const fromHours = Number(x.session_from.substring(0, 2));
    const fromMinutes = Number(x.session_from.substring(3, 5));
    const toHours = Number(x.session_to.substring(0, 2));
    const toMinutes = Number(x.session_to.substring(3, 5));
    const hour = now.getHours();
    const minute = now.getMinutes();
    // Check lebih besar dari from
    const greaterThanFrom =
      hour > fromHours || (hour === fromHours && minute > fromMinutes);
    const lesserThanTo =
      hour < toHours || (hour === toHours && minute < toMinutes);
    if (greaterThanFrom && lesserThanTo) return true;
    return false;
  });
  if (newSession.length !== 0) return String(newSession[0].session_number);
  else return "-";
};
function zeroPad(numberStr) {
  return ("0" + numberStr).slice(-2);
}
const timeRemaining = (session) => {
  if (session.length === 0) return "-";
  if (checkSession(session) === "-") return "-";
  const now = new Date(Date.now());
  const hour = now.getHours();
  const minute = now.getMinutes();
  const newSession = session.filter((x) => {
    const fromHours = Number(x.session_from.substring(0, 2));
    const fromMinutes = Number(x.session_from.substring(3, 5));
    const toHours = Number(x.session_to.substring(0, 2));
    const toMinutes = Number(x.session_to.substring(3, 5));
    const hour = now.getHours();
    const minute = now.getMinutes();
    // Check lebih besar dari from
    const greaterThanFrom =
      hour > fromHours || (hour === fromHours && minute > fromMinutes);
    const lesserThanTo =
      hour < toHours || (hour === toHours && minute < toMinutes);
    if (greaterThanFrom && lesserThanTo) return true;
    return false;
  });
  const toHours = Number(newSession[0].session_to.substring(0, 2));
  const toMinutes = Number(newSession[0].session_to.substring(3, 5));

  const deltaHour = toHours - hour;
  const deltaMinute = toMinutes - minute;
  return `${zeroPad(deltaHour)}:${zeroPad(deltaMinute)}`;
};

const LiveStream = (props) => {
  const [max, setMax] = useState(5);
  const [floors, setFloors] = useState([]);
  const [input, setInput] = useState({
    floorFilter: "",
    wardFilter: "",
  });
  const [sessionNow, setSessionNow] = useState("");
  // const [date,setDate] = useState(Date.now);
  const [remain, setRemain] = useState("");
  const { floorFilter, wardFilter } = input;
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBed();
      const maxData = await getMax();
      const ses = await getAvailableSessions(Date.now());
      setFloors(res);
      setMax(maxData);
      setSessionNow(checkSession(ses));
      if (ses) setRemain(timeRemaining(ses));
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  //Functions
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const onChangeFloor = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value, wardFilter: "" });
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
          <div className="container-fluid" style={{ height: "100vh" }}>
            <div
              className="collapse mt-1 mx-auto border-bottom-danger py-0"
              id="sidebarcollapse"
            >
              <div className="card card-body py-0" style={{ width: "auto" }}>
                <div
                  className="row justify-content-around py-1"
                  style={{ height: "70px" }}
                >
                  <div className="col-2 my-0 py-0"></div>
                  <div className="col-2 my-0 py-0">
                    <h4 className="text-secondary mt-3">
                      Current Time :{" "}
                      <strong>
                        <Moment format="HH:mm:ss">{Date.now()}</Moment>
                      </strong>
                    </h4>
                  </div>
                  <div className="col-1 my-0 py-0"></div>
                  <div className="col-2 my-0 py-0">
                    <h4 className="text-secondary mt-3">
                      Current Session :{" "}
                      <strong className="text-success">{sessionNow}</strong>
                    </h4>
                  </div>
                  <div className="col-1 my-0 py-0"></div>

                  <div className="col-2 my-0 py-0">
                    <h4 className="text-secondary mt-3">
                      Time Remaining :{" "}
                      <strong className="text-danger">{remain}</strong>
                    </h4>
                  </div>
                  <div className="col-2 my-0 py-0"></div>
                </div>
              </div>
            </div>
            {floors.length !== 0 ? (
              <div
                className="collapse show mt-1 mx-auto border-bottom-primary py-0"
                id="sidebarcollapse"
              >
                <div className="card card-body py-0" style={{ width: "auto" }}>
                  <div
                    className="row justify-content-center py-1"
                    style={{ height: "60px" }}
                  >
                    <div className="col-4 my-0 py-0"></div>
                    <div className="col-1 my-0 py-0">
                      <FormControl>
                        <InputLabel id="input1">Floor</InputLabel>
                        <Select
                          labelId="input1"
                          name="floorFilter"
                          style={{ width: "150px" }}
                          value={floorFilter}
                          onChange={(e) => onChangeFloor(e)}
                        >
                          {floors &&
                            floors.length !== 0 &&
                            floors
                              .map((floor) => floor.FloorNumber)
                              .sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
                              .map((x) => <MenuItem value={x}>{x}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-1 my-0 py-0"></div>
                    <div className="col-1 my-0 py-0">
                      <FormControl>
                        <InputLabel id="input2">Ward</InputLabel>
                        <Select
                          labelId="input2"
                          name="wardFilter"
                          style={{ width: "150px" }}
                          value={wardFilter}
                          onChange={(e) => onChange(e)}
                        >
                          {floors &&
                            floors.length !== 0 &&
                            floorFilter !== "" &&
                            floors
                              .filter(
                                (floor) => floor.FloorNumber === floorFilter
                              )[0]
                              .Wards.map((ward) => ward.WardNumber)
                              .sort((a, b) => (a > b ? 1 : -1))
                              .map((ward) => (
                                <MenuItem value={ward}>{ward}</MenuItem>
                              ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-4 my-0 py-0"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {" "}
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 justify-content-start">
              {floors &&
                floors.length !== 0 &&
                floorFilter !== "" &&
                wardFilter !== "" &&
                floors
                  .filter((floor) => floor.FloorNumber === floorFilter)[0]
                  .Wards.filter((ward) => ward.WardNumber === wardFilter)[0]
                  .Beds.sort((a, b) => (a.BedNumber > b.BedNumber ? 1 : -1))
                  .map((x) => (
                    <LiveStreamCard
                      bed={x.BedNumber}
                      visitors={x.visitorCount}
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
