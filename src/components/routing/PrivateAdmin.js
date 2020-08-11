import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateAdmin = ({loadUser,component:Component,auth:{isAdmin,loading},...rest}) => {
    return(
    <Route {...rest} render={props=> !isAdmin && !loading  ?(<Redirect to =
    '/login' />):(<Component {...props} />)} />
)}

PrivateAdmin.propTypes ={
    auth:PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    auth : state.auth
});

export default connect(mapStateToProps,{})(PrivateAdmin);