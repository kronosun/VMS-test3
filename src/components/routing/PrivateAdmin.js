import React,{useEffect} from 'react';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loadUser,getAttributes} from '../../actions/auth';

const PrivateAdmin = ({loadUser,getAttributes,component:Component,auth:{isAdmin,isAuthenticated,loading,attributes},...rest}) => {
    useEffect(()=>{
        loadUser();
    },[])
    console.log(isAdmin);
    return(
    <Route {...rest} render={props=> !isAdmin && !loading  ?(<Redirect to =
    '/login' />):(<Component {...props} />)} />
)}

PrivateAdmin.propTypes ={
    auth:PropTypes.object.isRequired,
    loadUser:PropTypes.func.isRequired,
    getAttributes:PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    auth : state.auth
});

export default connect(mapStateToProps,{loadUser,getAttributes})(PrivateAdmin);