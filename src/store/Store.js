import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { profileReducer } from './Profile/Reducer';
import { chatListReducer } from './ChatList/Reducer';
import { chatsListReducer } from './ChatsList/Reducer';
import { newUsers } from './ApiUsers/NewUsersApi';
import { mobileMenuReducer } from './MobileMenuStatus/Reducer';
import { bigChatReducer } from './BigChatStatus/Reducer';
import { statusesInTheAppReducer } from './AppSwitches/Reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    profile: profileReducer,
    chatListReducer: chatListReducer,
    chatsListReducer: chatsListReducer,
    USERS: newUsers.reducer,
    mobileMenu: mobileMenuReducer,
    bigChat: bigChatReducer,
    statusesInTheApp: statusesInTheAppReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['chatListReducer'] //* - This blacklist lists, in quotes as strings, reducers that should not be stored in the browser's "local store" because it has a size limit of about 5Mb.
};

const persistedReduser = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReduser, 
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
