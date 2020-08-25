import axios from "axios";

let config = {
  headers: {
    'Content-Type': 'application/json',
  }
}
// Dummy API for testing only 
export const dummyApi = async () => {
  try {
    const res = await axios.get("https://randomuser.me/api/");
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
export const dummyFetch = async () => {
  try {
    const res = await axios.put(
      "https://zlrfbbk9b2.execute-api.us-east-1.amazonaws.com/live/data",
      JSON.stringify({})
    );
  } catch (error) {
    console.error(error);
  }
};

// API related for Booking features
// Check Available sessions based on visitor's option on visit date. 
export const getAvailableSessions = async (date) => {
  try {

    const res = await axios.get(
      "https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/rules/get"
    );
    const data = res.data.body;
    const sessionWeekDay = data[0].session_rules.map((x) => x.sessions)[0];
    const sessionWeekEnd = data[0].session_rules.map((x) => x.sessions)[1];
    const now = new Date(date).getDay();
    if (now >= 1 && now <= 5) {
      return sessionWeekDay;
    } else if(now===0 || now===6) {
      return sessionWeekEnd;
    }
  } catch (error) {
    console.error(error);
  }
};
// Get Written Rules only
export const getWrittenRules = async () => {
  try {
    const res = await axios.get(
      "https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/rules/get"
    );
    const data = res.data.body[0].general;
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Post Book form
export const bookSchedule = async(data)=>{
    try {
        const res= await axios.post("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/book",JSON.stringify(data));
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

// Fetch data to render Digital Badge
export const getBookId= async (visitId) =>{
  try {
      const url="https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/get/id2"
      const body={
        "id":String(visitId)
      }
      const res= await axios.put(url,body,config);
      return res.data.body;
      
  } catch (error) {
      console.error(error);
  }
}


// API related for user profile 
// Get User History
export const getHistory = async (userId) => {
  try {
    const body={
      "userid":String(userId)
    }
    const res = await axios.put(
      `https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/filter/userid2`,body,config
    );

    return res.data.body;
  } catch (error) {
    console.error(error);
  }
};


// Dashboard Panel 
// Get Dashboard quantified variable data
export const getGeneral = async ()=>{
  try {
    const res= await axios.get("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/dashboard/general");
    return res.data.body;
  } catch (error) {
    console.error();
  }
}
// Get Visitor Data for plotting purpose 
export const getVisitorData = async() =>{
  try {
    const res= await axios.get("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/dashboard/visitortoday/getall");
    return res.data.body;
  } catch (error) {
    console.error();
  }
}

// Visitor Panel and Livestream Panel
// Get all Bed from All Wards
export const getAllBed = async () => {
  try {
    const res = await axios.get(
      "https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/warddatabase/getallbed"
    );
    const data = [...res.data.body];
    return data;
  } catch (error) {
    console.error(error);
  }
};
// Get Max Visitor
export const getMax = async () => {
  try {
    const res = await axios.get(
      "https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/rules/get"
    );
    const data = res.data.body[0].maximum_visitor;
    const maxValue = data.max_visitor_status ? data.max_visitor : 100;
    return Number(maxValue);
  } catch (error) {
    console.error(error);
  }
};
// Update Ward Access
export const updateAccess = async (FloorNumber, WardNumber, WardAccess) => {
  const formData = JSON.stringify({
    FloorNumber,
    WardNumber,
    WardAccess: String(!WardAccess),
  });
  try {
    const res = await axios.put(
      "https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/warddatabase/editward/updatewardaccess",
      formData
    );
  } catch (error) {
    console.error(error);
  }
};

// Rules and Regulation Panel
// Get All Rules
export const getRules = async () => {
  try {
    const res = await axios.get(
      "https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/rules/get"
    );

    const data = res.data.body;
    const newData = {
      weekDaySession: data[0].session_rules.map((x) => x.sessions)[0],
      weekEndSession: data[0].session_rules.map((x) => x.sessions)[1],
      maxVisitor: data[0].maximum_visitor.max_visitor,
      maxVisitorStatus: data[0].maximum_visitor.max_visitor_status,
      maxTime: data[0].maximum_visitor.max_time,
      maxTimeStatus: data[0].maximum_visitor.max_time_status,
      rules: data[0].general,
    };
    return newData;
  } catch (error) {
    console.error(error);
  }
};
// update Rules
export const updateRules = async(formData)=>{
    try {
        const res = await axios.put("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/rules/update",JSON.stringify(formData));
        return res.data.statusCode;
    } catch (error) {
        console.error(error);
    }
}

//Schedule Panel
// Get All Schedule
export const getSchedule = async () => {
  try {
    const res = await axios.get(
      "https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/get"
    );
    return res.data.body;
  } catch (error) {
    console.error(error);
  }
};
// Update schedule access 
export const changeAccess = async(id,current) =>{
  try {
    const body = 
      {
        "id": String(id),
        "access": String(current)
      }
    
    const res= await axios.put("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/updateaccess",body,config);
    // return res.data.body;
  } catch (error) {
    console.error();
  }
}
// Delete book data
export const deleteBook = async(id) =>{
  try {
    const body = 
      {
        "id": String(id)
      }
    
    const res= await axios.put("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/delete",body,config);
    // return res.data.body;
  } catch (error) {
    console.error();
  }
}
