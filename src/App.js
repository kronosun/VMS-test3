import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect ,useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Redux
import { Provider } from 'react-redux';
import store from './store';

// Components
import Landing from './components/landing/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateAdmin from './components/routing/PrivateAdmin';
import Dashboard from './components/dashboard/Dashboard';
import Book from './components/auth/Book';
import ForgotPassword from './components/auth/ForgotPassword';
import BookId from './components/auth/BookId';
// Actions 

const App= ()=>{
  useEffect(()=>{
    console.log("App !");
},[]);
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Signup} />
      <Route exact path='/forgot-password' component={ForgotPassword} />
      <PrivateAdmin exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/book" component={Book} />
      <PrivateRoute exact path="/book/:id" component={BookId} />
      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;