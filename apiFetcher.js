// const axios = require ('axios');
// const getBookId= async (visitId) =>{
//   try {
//       const url=`https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/${String(visitId)}`;
//       console.log(url);
//       const res= await axios.get(url);
//       const data= res.data;
//       console.log(data);

//       // return res.data.body
//       return data;

//   } catch (error) {
//       console.error(error);
//   }
// }

// // Get User History
// const getHistory = async (userId) => {
//   try {
//     const res = await axios.get(
//       `https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/filter/${userId}`
//     );
//     return res.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
// export const bookSchedule = async(data)=>{
//   try {
//       const res= await axios.post("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/book",JSON.stringify(data));
//       if (res.data.statusCode===200) {return res.data;}
//       else {return false};
//   } catch (error) {
//       console.error(error);
//   }
// }
// // Coba getbookId
// const fetch = async () =>{
//   const resp= await getBookId("9eeb01b80bcb2e4c7daaad21160074f2");
// console.log(resp);
// }

const session = [
  { session_number: 1, session_from: "08:00:00", session_to: "10:00:00" },
  { session_number: 2, session_from: "18:00:00", session_to: "20:00:00" },
];

// fetch();
const checkSession = (session) => {
  const now = new Date(Date.now());
  const newSession = session.filter((x) => {
    const fromHours = Number(x.session_from.substring(0, 2));
    const fromMinutes = Number(x.session_from.substring(3, 5));
    const toHours = Number(x.session_to.substring(0, 2));
    const toMinutes = Number(x.session_to.substring(3, 5));
    const hour = now.getHours();
    const minute = now.getMinutes();
    console.log(fromHours);
    console.log(fromMinutes);
    console.log(toHours);
    console.log(toMinutes);
    // Check lebih besar dari from 
    const greaterThanFrom = hour>fromHours || (hour === fromHours && minute>fromMinutes);
    const lesserThanTo = hour<toHours || (hour === toHours && minute<toMinutes);
    console.log(greaterThanFrom);
    console.log(lesserThanTo);
    if (greaterThanFrom && lesserThanTo) return true;
    return false;
  });
  if(newSession.length !==0)
  return String(newSession[0].session_number)
  else return "-";
};
// const date= "13:00:00";
// // console.log(Date.parse(date));
// console.log(now.getHours());
// console.log(now.getMinutes());
// const datehours= Number(date.substring(0,2));
// const dateminutes= Number(date.substring(3,5));
// console.log(datehours);
// console.log(dateminutes);
checkSession(session);
