import React,{useEffect} from 'react';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadUser,getAttributes} from '../../actions/auth';

const PrivateRoute = ({loadUser,getAttributes,component:Component,auth:{isAuthenticated,loading,attributes},...rest}) => {
    useEffect(()=>{
        loadUser();
    },[])
    return(
    <Route {...rest} render={props=>!isAuthenticated && !loading ?(<Redirect to =
    '/login' />):(<Component {...props} />)} />
)}

PrivateRoute.propTypes ={
    auth:PropTypes.object.isRequired,
    loadUser:PropTypes.func.isRequired,
    getAttributes:PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    auth : state.auth
});

export default connect(mapStateToProps,{loadUser,getAttributes})(PrivateRoute);