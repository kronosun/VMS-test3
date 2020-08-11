import * as Action from '../actions/types';

const initialState ={
    isAdmin:null,
    isAuthenticated:null,
    loading: true,
    user: null,
    attributes:false,
}

export default function(state=initialState,action){
    const {type,payload} = action;
    switch(type)
    {
        case Action.USER_LOADED:
            return {
                ...state,
                isAuthenticated:true, 
                user:payload,
            }
        case Action.ATTRIBUTES_LOADED:
            return {
                ...state,
                loading:false,
                attributes:payload,
                isAdmin:payload.admin
            }
        case Action.REGISTER_SUCCESS:
        case Action.LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case Action.AUTH_ERROR:
        case Action.LOGIN_FAIL:
        case Action.REGISTER_FAIL:
        case Action.LOADED_FAIL:
        case Action.LOGOUT:
            return {
                ...state,
                ...payload,
                isAuthenticated:false,
                isAdmin:null,
                loading:false,
                user:null,
                attributes:null
            }
        default:
            return state;
    }

}