import * as Action from "./types";
import axios from 'axios';

export const dummyApi = async () =>{
    try {
        const res= await axios.get('https://randomuser.me/api/');
        // console.log(res);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
export const dummyFetch = async () =>{
    try {
        const res=await axios.put("https://zlrfbbk9b2.execute-api.us-east-1.amazonaws.com/live/data",JSON.stringify({}));
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}


// Get all Bed from All Wards 

export const getAllBed = async () => {
    try {
        const res= await axios.get("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/warddatabase/getallbed");
        const data=[...res.data.body];
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Update Ward Access 

export const updateAccess = async (FloorNumber,WardNumber,WardAccess) => {
    const formData =JSON.stringify({
        FloorNumber,
        WardNumber,
        WardAccess:String(!WardAccess)
    })
    console.log(formData);
    try {
        const res= await axios.put("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/warddatabase/editward/updatewardaccess",formData);
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}

// Get All Schedule 

export const getSchedule = async ()=>{
    try {
        const res=await axios.get("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/get");
        return res.data.body;
    } catch (error) {
        console.error(error);
    }
}

// Get Max Visitor

export const getMax = async () =>
{
    try {
        const res = await axios.get("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/rules/get");
        const data= res.data.body[0].maximum_visitor;
        const maxValue=data.max_visitor_status ? data.max_visitor : 100;
        return Number(maxValue);
        } catch (error) {
            console.error(error);
        }
}

// Get All Rules

export const getRules = async () => {
    try {
        const res = await axios.get("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/rules/get");

    const data= res.data.body
    const newData= {
        weekDaySession:data[0].session_rules.map(x=>x.sessions)[0],
        weekEndSession:data[0].session_rules.map(x=>x.sessions)[1],
        maxVisitor:data[0].maximum_visitor.max_visitor,
        maxVisitorStatus:data[0].maximum_visitor.max_visitor_status,
        maxTime:data[0].maximum_visitor.max_time,
        maxTimeStatus:data[0].maximum_visitor.max_time_status,
        rules:[      Math.random().toString(36).substring(8),
            Math.random().toString(36).substring(8),
            Math.random().toString(36).substring(8),
            Math.random().toString(36).substring(8)]
    }
    console.log(newData);
    return newData
    } catch (error) {
        console.error(error);
    }
}

