import {combineReducers} from 'redux';
import userInfo from './info.js';

const rootReducer = combineReducers({
    userInfo: userInfo
})

export default rootReducer;