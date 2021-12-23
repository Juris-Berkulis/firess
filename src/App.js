import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import { persistor } from './store/Store';
import { auth } from './firebase/firebase';
import { PrivateRoute } from './hocs/PrivateRoute';
import { PublicRoute } from './hocs/PublicRoute';
import { Box } from '@material-ui/core';
import { Preloader } from './components/Preloader';
import { allAppComponentsWithPageTitle } from './data/consts';
import { getPageTitle, giveTitleForPage, makeFullPageTitle } from './helper/helper';
import { useWindowDimensions } from './hooks/hooks';
import { getMobileMenuIsOpenSelector } from './store/MobileMenuStatus/Selectors';

export const App = () => {
  useWindowDimensions();

  const [authed, setAuthed] = useState(false);

  const location = useLocation();

  const pageTitle = getPageTitle(location);
  const fullPageTitle = makeFullPageTitle(pageTitle);
  giveTitleForPage(fullPageTitle);

  const mobileMenuOpen = useSelector(getMobileMenuIsOpenSelector);

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
    <PersistGate loading={<Preloader />} persistor={persistor}>
    <Switch>
    <>
      <Header></Header>
      <Box height='90vh' px='10vw' py='5vh' display={mobileMenuOpen ? 'none' : null}>
        <Route exact path={allAppComponentsWithPageTitle.home.path}>
          <Home></Home>
        </Route>
        <PrivateRoute path={allAppComponentsWithPageTitle.profile.path} authenticated={authed}>
          <Profile></Profile>
        </PrivateRoute>
        <PrivateRoute path={allAppComponentsWithPageTitle.messenger.path} authenticated={authed}>
          <Box display="flex" justifyContent="space-between" bgcolor="trancend" color="white" height='100%'>
            <ChatsList></ChatsList>
            <Route path={allAppComponentsWithPageTitle.error404.path}>
              <Error404></Error404>
            </Route>
            <Route path={allAppComponentsWithPageTitle.openChat.path}>
              <Chat></Chat>
            </Route>
          </Box>
        </PrivateRoute>
        <Route path={allAppComponentsWithPageTitle.usersApi.path}>
          <ApiUsers></ApiUsers>
        </Route>
        <PublicRoute path={allAppComponentsWithPageTitle.signup.path} authenticated={authed}>
          <Signup></Signup>
        </PublicRoute>
        <PublicRoute path={allAppComponentsWithPageTitle.login.path} authenticated={authed}>
          <Login></Login>
        </PublicRoute>
      </Box>
    </>
    </Switch>
    </PersistGate>
  );
};
