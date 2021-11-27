import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Header } from './routes/Header/Header';
import { Home } from './routes/Home/Home';
import { Profile } from './routes/Profile/Profile';
import { ChatsList } from './routes/ChatsList/ChatsList';
import { Chat } from './routes/Chat/Chat';
import { Error404 } from './routes/Error404/Error404';
import { ApiUsers } from './routes/ApiUsers/ApiUsers';
import { Signup } from './routes/Signup/Signup';
import { Login } from './routes/Login/Login';
import { store, persistor } from './store/Store';
import { auth } from './firebase/firebase';
import { PrivateRoute } from './hocs/PrivateRoute';
import { PublicRoute } from './hocs/PublicRoute';
import { Box } from '@material-ui/core';
import { Preloader } from './components/Preloader';

export const App = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    })
  }, []);

  return (
    <Provider store={store}>
    <PersistGate loading={<Preloader />} persistor={persistor}>
    <Switch>
    <>
      <Header></Header>
      <Box mx='10vw' p={1}>
        <Route exact path='/' authenticated={authed}>
          <Home></Home>
        </Route>
        <PrivateRoute path='/profile' authenticated={authed}>
          <Profile></Profile>
        </PrivateRoute>
        <PrivateRoute path='/messenger' authenticated={authed}>
          <Box display="flex" justifyContent="space-between" bgcolor="trancend" color="white">
            <ChatsList></ChatsList>
            <Route path='/messenger/error404'>
              <Error404></Error404>
            </Route>
            <Route path='/messenger/:chatId'>
              <Chat></Chat>
            </Route>
          </Box>
        </PrivateRoute>
        <Route authenticated={authed} path='/usersapi'>
          <ApiUsers></ApiUsers>
        </Route>
        <PublicRoute path='/signup' authenticated={authed}>
          <Signup></Signup>
        </PublicRoute>
        <PublicRoute path='/login' authenticated={authed}>
          <Login></Login>
        </PublicRoute>
      </Box>
    </>
    </Switch>
    </PersistGate>
    </Provider>
  );
};
