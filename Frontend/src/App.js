import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';  
import DashBoard from './Components/DashBoard';
import Login from './Components/auth/Login';
import SignUp from './Components/auth/SignUp';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';


export default class App extends React.Component{

  render()
  {

    if (localStorage.jwtToken) {

      setAuthToken(localStorage.jwtToken);
   
      const decoded = jwt_decode(localStorage.jwtToken);
  
      store.dispatch(setCurrentUser(decoded));
    

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
    
        store.dispatch(logoutUser());
   
        window.location.href = '/login';
      }
    }

    return(
      <div className="App">
        <Provider store={store}>
          <Router>
            <Route exact path = "/" component={DashBoard} />
            <Route exact path = "/dashboard" component={DashBoard} />
            <Route exact path = "/login" component={Login} />
            <Route exact path = "/signup" component={SignUp} />
          </Router>
        </Provider>
      </div>
    )

  }
}

