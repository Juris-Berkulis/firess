import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
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
import { allAppComponentsWithPageTitle, appThemesSchedule, APP_THEMES_NAMES } from './data/consts';
import { allowedPeriodInsideTheApp, getPageTitle, giveTitleForPage, isMobileDevice, makeFullPageTitle } from './helper/helper';
import { useChangeEmailVerificationStatus, useWindowDimensions } from './hooks/hooks';
import { getMobileMenuIsOpenSelector } from './store/MobileMenuStatus/Selectors';
import { bigChatClose } from './store/BigChatStatus/Action';
import { useStyles } from './styles/Style';
import { getStatusesInTheAppappThemeIsSelector, getStatusesInTheAppIsAquariumOpenSelector, getStatusesInTheAppLastAuthorizationDateAndTimeSelector } from './store/AppSwitches/Selectors';
import { auth } from './firebase/firebase';
import { Aquarium } from './routes/ChatsList/Aquarium/Aquarium';
import { getBigChatIsOpenSelector } from '../src/store/BigChatStatus/Selectors';
import { dropMessagesInStateAction } from './store/ChatList/Action';
import { dropChatsListInStateAction } from './store/ChatsList/Action';
import { appTheme, eventForPWAInstallation } from './store/AppSwitches/Action';
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
  const appThemeSel = useSelector(getStatusesInTheAppappThemeIsSelector);

  const emailVerificationStatus = useChangeEmailVerificationStatus(location);

  const getTimeBeforeThemeChanging = (themeStartAt, timeLocal) => {
    if (themeStartAt < timeLocal) {
      return (24 * 60 * 60 * 1000 - (timeLocal - themeStartAt))
    } else {
      return (themeStartAt - timeLocal)
    }
  };

  const changeThemeInApp = useCallback(() => {
    const newDate = new Date();

    const hourLocal = newDate.getHours();
    const minuteLocal = newDate.getMinutes();
    const secondLocal = newDate.getSeconds();
    const millisecundLocal = newDate.getMilliseconds();

    const timeLocal = hourLocal * 60 * 60 * 1000 + minuteLocal * 60 * 1000 + secondLocal * 1000 + millisecundLocal;

    const appThemesScheduleSort = appThemesSchedule.sort((a, b) => +a.themeStartAt > +b.themeStartAt ? 1 : -1);

    const appThemesWere = appThemesScheduleSort.filter((theme) => +theme.themeStartAt <= timeLocal);
    const appThemesWill = appThemesScheduleSort.filter((theme) => +theme.themeStartAt > timeLocal);

    const appThemeNow = (
      appThemesWere.length === 0 
      ? 
      appThemesScheduleSort[appThemesScheduleSort.length - 1] 
      : 
      appThemesWere[appThemesWere.length - 1]
    ) 

    const meta = document.querySelector('meta[name=theme-color]');

    if (appThemeNow.themeNameEn === APP_THEMES_NAMES.theme_1.nameEn) {
      meta.setAttribute("content", styleConsts.backgroundColor.mainColor1);
    } else if (appThemeNow.themeNameEn === APP_THEMES_NAMES.theme_2.nameEn) {
      meta.setAttribute("content", styleConsts.backgroundColor.mainColor1DarkTheme);
    } else if (appThemeNow.themeNameEn === APP_THEMES_NAMES.theme_3.nameEn) {
      meta.setAttribute("content", styleConsts.backgroundColor.mainColor1GreyTheme);
    } else if (appThemeNow.themeNameEn === APP_THEMES_NAMES.theme_4.nameEn) {
      meta.setAttribute("content", styleConsts.backgroundColor.mainColor1SunnyTheme);
    }

    dispatch({
      type: appTheme.type,
      payload: appThemeNow,
    });

    const appThemeNext = (
      appThemesWill.length === 0 
      ? 
      appThemesScheduleSort[0] 
      : 
      appThemesWill[0]
    ) 

    const timeUntilNextThemeChanging = getTimeBeforeThemeChanging(appThemeNext.themeStartAt, timeLocal);

    const timerId = setTimeout(() => {
      setBooleanForChangeTheme(booleanForChangeTheme => !booleanForChangeTheme);

      return clearTimeout(timerId)
      }, timeUntilNextThemeChanging);
  }, [dispatch]);

  //* The listener function will fire if the application can be installed on the desktop:
  useEffect(() => {
    const saveEventForfurtherPWAInstallation = (e) => {
      //* Prevent the mini-infobar from appearing on mobile:
      e.preventDefault();
      //* 1. Stash the event so it can be triggered later; 2. update UI notify the user they can install the PWA:
      dispatch({
        type: eventForPWAInstallation.type,
        payload: e,
      });
    };

    if (window.addEventListener) {
      window.addEventListener('beforeinstallprompt', saveEventForfurtherPWAInstallation);
      return () => window.removeEventListener('beforeinstallprompt', saveEventForfurtherPWAInstallation);
    } else if (window.attachEvent) {
      window.attachEvent('beforeinstallprompt', saveEventForfurtherPWAInstallation);
      return () => window.detachEvent('beforeinstallprompt', saveEventForfurtherPWAInstallation);
    }
  }, [dispatch]);

  //* The listener function will fire when the application is installed on the desktop:
  useEffect(() => {
    const reportAboutPWAInstallationSuccess = () => {
      //* 1. Hide the app-provided install prompt; 2. Clear the instalation event:
      dispatch({
        type: eventForPWAInstallation.type,
        payload: null,
      });
    };

    if (window.addEventListener) {
      window.addEventListener('appinstalled', reportAboutPWAInstallationSuccess);
      return () => window.removeEventListener('appinstalled', reportAboutPWAInstallationSuccess);
    } else if (window.attachEvent) {
      window.attachEvent('appinstalled', reportAboutPWAInstallationSuccess);
      return () => window.detachEvent('appinstalled', reportAboutPWAInstallationSuccess);
    }
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

  useLayoutEffect(() => {
    dispatch({
      type: dropChatsListInStateAction.type,
    });

    dispatch({
      type: dropMessagesInStateAction.type,
    });
  }, [dispatch]);

  useEffect(() => {
    changeThemeInApp();
  }, [changeThemeInApp, booleanForChangeTheme]);

  return (
    <PersistGate loading={<Preloader />} persistor={persistor}>
    <div className={`${classes.main} ${appThemeSel && appThemeSel.themeNameEn ? (appThemeSel.themeNameEn === APP_THEMES_NAMES.theme_2.nameEn ? classes.main_darkTheme : appThemeSel.themeNameEn === APP_THEMES_NAMES.theme_3.nameEn ? classes.main_greyTheme : appThemeSel.themeNameEn === APP_THEMES_NAMES.theme_4.nameEn ? classes.main_sunnyTheme : null) : null}`}>
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
