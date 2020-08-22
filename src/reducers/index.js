import {combineReducers} from 'redux';
import auth from './auth';
import alert from './alert';


const func=combineReducers({
    auth,
    alert
});
export default func;