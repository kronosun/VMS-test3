
const getBookId= async (visitId) =>{
  try {
      const url=`https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/${String(visitId)}`;
      console.log(url);
      const res= await axios.get(url);
      const data= res.data;
      console.log(data);

      // return res.data.body
      return data;
      
  } catch (error) {
      console.error(error);
  }
}

// Get User History
const getHistory = async (userId) => {
  try {
    const res = await axios.get(
      `https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/visitschedule/filter/${userId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// Coba getbookId
const fetch = async () =>{
  const resp= await getBookId("9eeb01b80bcb2e4c7daaad21160074f2");
console.log(resp);
} 

fetch();