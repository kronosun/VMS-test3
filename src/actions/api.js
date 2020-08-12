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