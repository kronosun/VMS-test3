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

// const config= {
//     headers:{
//         'Content-Type':'application/json'
//     }
// }
// await axios.post(`/api/post`,JSON.stringify(formData),config);


// Get All Bed
const configJson = {headers:
    {
    'Content-Type':'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS,PUT",
    "Access-Control-Allow-Headers": "Content-Type"
}}
const config = {
    headers:
    {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Methods" : "DELETE,POST,GET,OPTIONS,PUT,PATCH",
    "Access-Control-Allow-Headers" : "Content-Type"
}}
export const getAllBed = async () => {
    try {
        const res= await axios.get("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/warddatabase/getallbed");
        const data=res.data.body;
        // console.log("GET ALL BED",data);

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
        WardAccess
    })
    try {
        const res= await axios.put("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/warddatabase/editward/updatewardaccess",formData,config);
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}



// [
//     {
//         "FloorNumber": "2",
//         "Wards": [
//             {
//                 "WardAccess": "true",
//                 "Beds": [
//                     {
//                         "visitee": "Valerie",
//                         "BedNumber": "1",
//                         "visitorCount": 0
//                     }
//                 ],
//                 "WardNumber": "1"
//             },
//             {
//                 "Beds": [
//                     {
//                         "BedNumber": "101",
//                         "visitee": "VK",
//                         "visitorCount": 0
//                     }
//                 ],
//                 "WardAccess": "true",
//                 "WardNumber": "206"
//             }
//         ]
//     },
// ]