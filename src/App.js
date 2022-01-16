import React, { useEffect } from 'react';
import { useLocation } from "react-router";
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { PrivateRoute } from './hocs/PrivateRoute';
import { PublicRoute } from './hocs/PublicRoute';
import { Box } from '@material-ui/core';
import { Preloader } from './components/Preloader';
import { allAppComponentsWithPageTitle } from './data/consts';
import { allowedPeriodInsideTheApp, getPageTitle, giveTitleForPage, isMobileDevice, makeFullPageTitle } from './helper/helper';
import { useChangeEmailVerificationStatus, useWindowDimensions } from './hooks/hooks';
import { getMobileMenuIsOpenSelector } from './store/MobileMenuStatus/Selectors';
import { bigChatClose } from './store/BigChatStatus/Action';
import { useStyles } from './styles/Style';
import { getStatusesInTheAppLastAuthorizationDateAndTimeSelector } from './store/AppSwitches/Selectors';
import { auth } from './firebase/firebase';

export const App = () => {
  const classes = useStyles();

  useWindowDimensions();

  const dispatch = useDispatch();

  const location = useLocation();

  const pageTitle = getPageTitle(location);
  const fullPageTitle = makeFullPageTitle(pageTitle);
  giveTitleForPage(fullPageTitle);

  const isMobileDeviceBoolean = isMobileDevice();
  const mobileMenuOpen = useSelector(getMobileMenuIsOpenSelector);
  const lastAuthorizationDateAndTime = useSelector(getStatusesInTheAppLastAuthorizationDateAndTimeSelector)

  const emailVerificationStatus = useChangeEmailVerificationStatus(location);

  useEffect(() => {
    dispatch({
        type: bigChatClose.type,
    });
    return () => {
        dispatch({
            type: bigChatClose.type,
        });
    };
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user) {
        const now = new Date().getTime();
        const period = allowedPeriodInsideTheApp(0, 1, 0, 0, 0, 0, 0);
        if (lastAuthorizationDateAndTime === null || now - lastAuthorizationDateAndTime > period) {
          auth.signOut();
        }
      }
    });

    return () => unsubscribe()
  }, [lastAuthorizationDateAndTime]);

  return (
    <PersistGate loading={<Preloader />} persistor={persistor}>
    <div className={`${classes.main} ${classes.center}`}>
    <Switch>
    <>
      <Header></Header>
      <Box className={`${classes.field} ${mobileMenuOpen ? classes.field_mobileMenuOpen : null} ${isMobileDeviceBoolean ? classes.field_mobileDevice : null}`}>
        <Route exact path={allAppComponentsWithPageTitle.home.path}>
          <Home></Home>
        </Route>
        <PrivateRoute path={allAppComponentsWithPageTitle.profile.path} authenticated={emailVerificationStatus}>
          <Profile></Profile>
        </PrivateRoute>
        <PrivateRoute path={allAppComponentsWithPageTitle.messenger.path} authenticated={emailVerificationStatus}>
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
        <PublicRoute path={allAppComponentsWithPageTitle.signup.path} authenticated={emailVerificationStatus}>
          <Signup></Signup>
        </PublicRoute>
        <PublicRoute path={allAppComponentsWithPageTitle.login.path} authenticated={emailVerificationStatus}>
          <Login></Login>
        </PublicRoute>
      </Box>
    </>
    </Switch>
    </div>
    </PersistGate>
  );
};
