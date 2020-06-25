import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './ActionTypes';


export const registerUser = (userData,successs,fail, history) => dispatch => {
  axios
    .post('https://facility-book.herokuapp.com/user/signup', userData)
    .then(res => {
        successs()
        const { token } = res.data;
    
        localStorage.setItem('jwtToken', token);
    
        setAuthToken(token);
        
        const decoded = jwt_decode(token);
        
        setTimeout(()=>{
            dispatch(setCurrentUser(decoded));
        },500)
        
    })
    .catch(err =>
    {
        fail()
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
    );
};


export const loginUser = (userData,successs,fail) => dispatch => {
  axios
    .post('https://facility-book.herokuapp.com/user/login', userData)
    .then(res => {
      successs()
      const { token } = res.data;
    
      localStorage.setItem('jwtToken', token);
   
      setAuthToken(token);
    
      const decoded = jwt_decode(token);
    
      setTimeout(()=>{
        dispatch(setCurrentUser(decoded));
      },500)
    })
    .catch(err =>
    {
        fail()
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
    );
};


export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};
