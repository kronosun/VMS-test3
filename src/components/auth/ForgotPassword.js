import React, {useState,useEffect, Fragment} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from 'react-helmet';
// Import CSS
import './assets/css/sb-admin-2.css';
import "./assets/vendor/fontawesome-free/css/all.min.css";
import UserPool from "../../UserPool";
import { CognitoUser } from "amazon-cognito-identity-js";
//Redux 
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {loadUser} from '../../actions/auth';
import {setAlert} from '../../actions/alert';

const ForgotPassword= ({setAlert,alert})=>{
    useEffect(()=>{
        loadUser();
    },[]);
  //State
  const [email,setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [code, setCode] = useState('');
  const [state,setState]= useState(0);
  const onSubmit= async(e)=>{
    e.preventDefault();

    await resetPassword();
    setState(3);

  }
  const sendCode = () =>{
    const user = new CognitoUser({
      Username: email.toLowerCase(),
      Pool:UserPool
    });
    try {
      user.forgotPassword({
        onSuccess:data=>{
          console.log("Success",data);
        },
        onFailure:err=>{
          console.log("error",err);
        },
        inputVerificationCode:data=>{
          console.log("Input code",data);
        }
  
      })
    } catch (error) {
      console.error(error);
    }
  }

  const resetPassword= async () =>{
    if (password !== confirmPassword){
      setAlert("Please fill in code field !","danger"); 
      return;
    }
    const user = new CognitoUser({
      Username: email.toLowerCase(),
      Pool:UserPool
    });
    await user.confirmPassword(code,password,{
      onSuccess:data=>{
        console.log("Success",data);
      },
      onFailure:err=>{
        console.log("error",err);
      }
    })
  }

  const stage1= async(e)=>{
    e.preventDefault();

    if(email===''){
      setAlert("Please fill in email field !","danger");
      return;
    }
    await sendCode();
    setState(1);
  }

    const stage2= (e)=>{
    e.preventDefault();
      if(code===''){
        setAlert("Please fill in code field !","danger");
        return;
      }
    setState(2);
  }
  
  const stage0= ()=>{
    setState(0);
  }
  return (
    <Fragment >
                <Helmet>
                <style>{'body { background-color: #4E73DF }'}</style>
            </Helmet>

        <div className="container">

<div className="row justify-content-center">

  <div className="col-xl-10 col-lg-12 col-md-9">

    <div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-lg-6 d-none d-lg-block bg-password-image" style={{height:"600px"}}></div>
          
          <div className="col-lg-6" style={{height:"600px"}}>
          {alert && alert.length!==0 && alert.map(x=>              <div class={`alert alert-${x.alertType}`} role="alert">
  {x.msg}
</div>)}
            <div className="p-5">

            <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                    </div>
                  <form className="user">
                  {state===0 &&    <Fragment>               <div className="form-group">
                  <div className="text-center">
                    <p className="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you confirmation code to reset your password!</p>
                  </div>
                      <input onChange={e=>setEmail(e.target.value)} value={email} type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                    </div>
                    <button className="btn btn-primary btn-user btn-block" onClick={stage1}>
                      Reset Password
                    </button>
                    </Fragment>  }
                    {state===1 &&    <Fragment>               <div className="form-group">
                    <div className="text-center">
                    <p className="mb-5">Confirmation code has been sent to your email</p><br />
                  </div>
                      <input value={code} onChange={e=>setCode(e.target.value)} type="text" className="form-control form-control-user" aria-describedby="emailHelp" placeholder="Enter Confirmation Code" />
                    </div>
                    <button className="btn btn-primary btn-user btn-block" onClick={stage2}>
                      Enter Code 
                    </button>
                    </Fragment>  }
                    {state===2 &&    <Fragment>               <div className="form-group">
                    <div className="text-center">
                    <p className="mb-1">Set your new Password !</p>
                  </div>
                      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter New Password" />
                      <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="form-control form-control-user mt-3"  aria-describedby="emailHelp" placeholder="Confirm New Password" />
                    </div>
                    <button className="btn btn-primary btn-user btn-block" onClick={onSubmit}>
                      Change Password
                    </button>
                    </Fragment>  }
                    {state===3 &&    <Fragment>               <div className="form-group">
                    <div className="text-center">
                    <p className="mt-5 mb-5">Password has been changed !</p><br />
                    <Link className="btn btn-primary btn-user btn-block" to="/login">
                      Login
                    </Link>
                  </div>
                    </div>

                    </Fragment>  }

                  </form>
                  <hr />
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
      </div>
    </div>

  </div>

</div>

</div>

    </Fragment>
  );
}
ForgotPassword.propTypes = {
alert: PropTypes.array.isRequired
  }
  
  const mapStateToProps = state => ({
    alert:state.alert
  });
  
export default connect(mapStateToProps,{setAlert})(ForgotPassword);

