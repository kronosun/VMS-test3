import React, {useState,useEffect, Fragment} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from 'react-helmet';
// Import CSS
import './assets/css/sb-admin-2.css';
import './assets/vendor/fontawesome-free/css/all.min.css';
//Redux 
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {loadUser,loginCognito} from '../../actions/auth';


const Login= ({loadUser,loginCognito,isAdmin,isAuthenticated})=>{
    useEffect(()=>{
        loadUser();
    },[]);
  //State
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit= (e)=>{
    e.preventDefault();
    loginCognito(email,password);
  }
  if(isAuthenticated && isAdmin!==null){
    if(isAdmin){
    return <Redirect to="/dashboard"/>
    } 
    else
    {
    return <Redirect to="/book"/>

    }
  }
  return (
    <Fragment >
                <Helmet>
                <style>{'body { background-color: #4E73DF }'}</style>
            </Helmet>
        {/* <h1>Login</h1>
        <form onSubmit= {onSubmit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit" className="btn btn-dark">Login</button>
        </form> */}
        <div className="container">

<div className="row justify-content-center">

  <div className="col-xl-10 col-lg-12 col-md-9">

    <div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
          
          <div className="col-lg-6">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-5 mt-5">Welcome Back!</h1>
              </div>
              <form className="user" onSubmit= {onSubmit}>
                <div className="form-group">
                  <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="form-control form-control-user mb-4" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                </div>
                <div className="form-group">
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} type="password" className="form-control form-control-user mb-4" id="exampleInputPassword" placeholder="Password" />
                </div>
                <br />
                {/* <div className="form-group">
                  <div className="custom-control custom-checkbox small mb-4">
                    <input name="checkbox" type="checkbox" className="custom-control-input" id="customCheck" />
                    <label className="custom-control-label" >Remember Me</label>
                  </div>
                </div> */}
                <button type="submit" className="btn btn-primary btn-user btn-block mb-3 mt-3">
                  Login
                </button>
              </form>
              <hr className="mb-3"/>
              <div className="text-center my-4">
                <small>Don't Have an Account ? </small>
                <Link className="small" to="/register">Create an Account!</Link>
              </div>
              <div className="text-center my-3">
                <Link className="small" to="/forgot-password">Forgot Password?</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* NEW Stuff HERE */}
          {/* <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et facilisis augue. Nam eleifend vulputate tortor. Ut non bibendum elit. Phasellus vel mattis nunc. Aenean tristique vel lorem ut commodo. Aliquam lacinia est quis porttitor sodales. Nam mattis commodo erat, nec lobortis ipsum luctus non. Cras a leo eu leo feugiat ullamcorper non vel lectus. Vivamus nibh mi, posuere vitae vehicula et, fringilla in velit. Donec eget nulla efficitur, rhoncus dui id, pellentesque augue. In hac habitasse platea dictumst. Integer convallis mi varius, lacinia ante vitae, congue nibh. Curabitur consectetur felis leo, nec volutpat urna molestie sodales.

Maecenas lacus est, volutpat vel leo non, fringilla vulputate odio. Suspendisse potenti. Sed congue varius imperdiet. Fusce egestas et justo non commodo. Nulla fermentum lacinia nulla, id faucibus tortor accumsan id. Nullam scelerisque neque ante. Maecenas elementum lectus magna, mattis suscipit nisi suscipit dapibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque id varius eros. Etiam justo nunc, vulputate eget arcu eget, mollis ullamcorper neque. Vivamus massa urna, efficitur vel molestie id, laoreet eget libero. Sed vel neque id ante ultrices tristique eget ac elit. Nunc diam nisi, auctor in dolor sit amet, mollis finibus elit.

Morbi malesuada sollicitudin fermentum. Curabitur lacinia lacinia felis, quis aliquet neque tristique eget. Nullam mollis dui consequat dictum consequat. Sed eu volutpat arcu, vel imperdiet risus. Vestibulum id pulvinar ante. Vivamus efficitur pulvinar orci, eget malesuada sem dictum sit amet. Aliquam viverra massa eros, non pharetra nisi interdum quis. Suspendisse potenti. Donec quis lacus et augue laoreet sagittis vitae ac diam. Nam tristique est at tempor dignissim.
          </p> */}
        </div>
      </div>
    </div>

  </div>

</div>

</div>

    </Fragment>
  );
}
Login.propTypes = {
    loadUser :PropTypes.func.isRequired,
    loginCognito: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
    isAdmin:PropTypes.bool
  }
  
  const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    isAdmin:state.auth.isAdmin
  });
  
export default connect(mapStateToProps,{loadUser,loginCognito})(Login);

