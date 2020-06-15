import {createStore} from 'redux';
import reducer from './reducer';

const { composeWithDevTools } = require('redux-devtools-extension');

let store = createStore(reducer,composeWithDevTools())

export default store;