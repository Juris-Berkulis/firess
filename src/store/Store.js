import { createStore, combineReducers } from 'redux';
import { profileReducer } from './Profile/Reducer';
import { chatListReducer } from './ChatList/Reducer';

const rootReducer = combineReducers({
    profile: profileReducer,
    chatListReducer: chatListReducer,
});

export const store = createStore(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
