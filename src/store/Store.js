import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { profileReducer } from './Profile/Reducer';
import { chatListReducer } from './ChatList/Reducer';
import { chatsListReducer } from './ChatsList/Reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    profile: profileReducer,
    chatListReducer: chatListReducer,
    chatsListReducer: chatsListReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReduser = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReduser, 
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
