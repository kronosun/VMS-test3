const axios=require('axios');

const getData= async () =>{
    try {
        const res = await axios.get("https://7z4mgi9veg.execute-api.us-east-1.amazonaws.com/VMS/rules/get");

    const data= res.data.body
    const newData= {
        weekDaySession:data[0].session_rules,
        weekEndSession:data[0].session_rules,
        maxVisitor:data[0].maximum_visitor.max_visitor,
        maxVisitorStatus:data[0].maximum_visitor.max_visitor_status,
        maxTime:data[0].maximum_visitor.max_time,
        maxTimeStatus:data[0].maximum_visitor.max_time_status
    }
    console.log(newData);
    } catch (error) {
        console.error(error);
    }
}

getData();