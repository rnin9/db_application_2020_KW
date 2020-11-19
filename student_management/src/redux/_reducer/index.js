import { combineReducers } from 'redux';
import friend from './friend_reducer';

const rootReducer = combineReducers({
    friend,
});

export default rootReducer;