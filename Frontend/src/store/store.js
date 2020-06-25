import { createStore } from 'redux';
import rootReducer from '../reducers';
import middleware from '../middleware/index'


const store = createStore(rootReducer , middleware);

export default store;
