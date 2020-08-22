import React, { useState, useEffect } from "react";
import LiveStreamCard from "./livestream/LiveStreamCard";
import SidePanel from "./layout/SidePanel";
import TopBar from "./layout/TopBar";
import Footer from "./layout/Footer";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getAllBed, getMax } from "../../actions/api";

const LiveStream = (props) => {
  const [max, setMax] = useState(5);
  const [floors, setFloors] = useState([]);
  const [input, setInput] = useState({
    floorFilter: "",
    wardFilter: "",
  });

  const { floorFilter, wardFilter } = input;
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBed();
      const maxData = await getMax();
      setFloors(res);
      setMax(maxData);
      console.log("map", JSON.stringify(res));
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  //Functions
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log({ ...input, [e.target.name]: e.target.value });
  };
  const onChangeFloor = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value, wardFilter: "" });
    console.log({ ...input, [e.target.name]: e.target.value, wardFilter: "" });
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
{floors.length!==0 ?(            <div
              className="collapse show mt-1 mx-auto border-bottom-primary"
              id="sidebarcollapse"
            >
              <div className="card card-body" style={{ width: "auto" }}>
                <div className="row justify-content-center">
                  <div className="col-2">
                    <FormControl>
                      <InputLabel id="input1">Floor</InputLabel>
                      <Select
                        labelId="input1"
                        // id="input1"
                        name="floorFilter"
                        style={{ width: "200px" }}
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
                </div>
              </div>
            </div>) : <div className="text-center"> <div className="spinner-border" role="status">
  <span className="sr-only">Loading...</span>
</div></div>}
            {/* Content */}
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
