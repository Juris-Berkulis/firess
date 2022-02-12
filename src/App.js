import React, { useCallback, useEffect, useState } from 'react';
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
import { getStatusesInTheAppIsAquariumOpenSelector, getStatusesInTheAppisDarkThemeSelector, getStatusesInTheAppLastAuthorizationDateAndTimeSelector } from './store/AppSwitches/Selectors';
import { auth } from './firebase/firebase';
import { Aquarium } from './routes/ChatsList/Aquarium/Aquarium';
import { getBigChatIsOpenSelector } from '../src/store/BigChatStatus/Selectors';
import { dropMessagesInStateAction } from './store/ChatList/Action';
import { dropChatsListInStateAction } from './store/ChatsList/Action';
import { appDarkTheme } from './store/AppSwitches/Action';
import { styleConsts } from './styles/StyleConsts';

export const App = () => {
  const classes = useStyles();

  useWindowDimensions();

  const dispatch = useDispatch();

  const location = useLocation();

  const pageTitle = getPageTitle(location);
  const fullPageTitle = makeFullPageTitle(pageTitle);
  giveTitleForPage(fullPageTitle);

  const [booleanForChangeTheme, setBooleanForChangeTheme] = useState(false);

  const isMobileDeviceBoolean = isMobileDevice();
  const mobileMenuOpen = useSelector(getMobileMenuIsOpenSelector);
  const lastAuthorizationDateAndTime = useSelector(getStatusesInTheAppLastAuthorizationDateAndTimeSelector)
  const isAquariumStatus = useSelector(getStatusesInTheAppIsAquariumOpenSelector);
  const isBigChatOpen = useSelector(getBigChatIsOpenSelector);
  const isAppDarkTheme = useSelector(getStatusesInTheAppisDarkThemeSelector);

  const emailVerificationStatus = useChangeEmailVerificationStatus(location);

  const getTimeBeforeThemeChange = (themeStartAt, timeLocal) => {
    if (themeStartAt < timeLocal) {
      return (24 * 60 * 60 * 1000 - (timeLocal - themeStartAt))
    } else {
      return (themeStartAt - timeLocal)
    }
  };

  const isDarkTheme = useCallback(() => {
    const newDate = new Date();

    const hourLocal = newDate.getHours();
    const minuteLocal = newDate.getMinutes();
    const secondLocal = newDate.getSeconds();
    const millisecundLocal = newDate.getMilliseconds();

    const timeLocal = newDate.setHours(hourLocal, minuteLocal, secondLocal, millisecundLocal);

    const lightThemeStartAt = newDate.setHours(8, 30, 0, 0);
    const darkThemeStartAt = newDate.setHours(20, 30, 0, 0);

    const meta = document.querySelector('meta[name=theme-color]');

    if (timeLocal >= lightThemeStartAt && timeLocal < darkThemeStartAt) {
      meta.setAttribute("content", styleConsts.backgroundColor.mainColor1);

      dispatch({
        type: appDarkTheme.type,
        payload: false,
      });
    } else {
      meta.setAttribute("content", styleConsts.backgroundColor.mainColor1DarkTheme);

      dispatch({
        type: appDarkTheme.type,
        payload: true,
      });
    }

    const timeUntilNextLightTheme = getTimeBeforeThemeChange(lightThemeStartAt, timeLocal);
    const timeUntilNextDarkTheme = getTimeBeforeThemeChange(darkThemeStartAt, timeLocal);

    const timeUntilNextThemeChange = Math.min(timeUntilNextLightTheme, timeUntilNextDarkTheme);

    const timerId = setTimeout(() => {
      setBooleanForChangeTheme(booleanForChangeTheme => !booleanForChangeTheme);

      return clearTimeout(timerId)
      }, timeUntilNextThemeChange);
  }, [dispatch]);

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

  useEffect(() => {
    dispatch({
      type: dropChatsListInStateAction.type,
    });

    dispatch({
      type: dropMessagesInStateAction.type,
    });
  }, [dispatch]);

  useEffect(() => {
    isDarkTheme();
  }, [isDarkTheme, booleanForChangeTheme]);

  return (
    <PersistGate loading={<Preloader />} persistor={persistor}>
    <div className={`${classes.main} ${isAppDarkTheme ? classes.main_darkTheme : null} ${classes.center}`}>
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
            {isMobileDeviceBoolean && isAquariumStatus ? null : <ChatsList></ChatsList>}
            {isBigChatOpen ? null : <Aquarium></Aquarium>}
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
