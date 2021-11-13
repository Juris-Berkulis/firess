import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { profileReducer } from './Profile/Reducer';
import { chatListReducer } from './ChatList/Reducer';
import { chatsListReducer } from './ChatsList/Reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    profile: profileReducer,
    chatListReducer: chatListReducer,
    chatsListReducer: chatsListReducer,
});

export const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk))
);
