import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { allAppComponentsWithPageTitle, startValueForTimer } from '../../data/consts';
import { auth } from '../../firebase/firebase';
import { functionsForMocks } from '../../helper/forMocks/functions';
import { useStyles } from '../../styles/Style';
import { SignupUI } from '../../ui_components/SignupUI';
import preloader from '../../img/preloader.gif';
import { Link } from 'react-router-dom';
import { countdownForLetterRequestWithLink, isMobileDevice, requestTheLetter, userVerificationWaiting } from '../../helper/helper';
import { useAutomaticStartOfTheCountdownTimer, useUserVerificationWaiting } from '../../hooks/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusesInTheAppCountdownForLetterRequestIsNumberSelector, getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector } from '../../store/AppSwitches/Selectors';
import { emailVerificationConfirmationWaitingIsFalse, emailVerificationConfirmationWaitingIsTrue, lastAuthorization } from '../../store/AppSwitches/Action';

export const Signup = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const isMobileDeviceBoolean = isMobileDevice();

  const dispatch = useDispatch();
  const verificationWaitingBoolean = useSelector(getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector);
  const timeLeftBeforeRequesting = useSelector(getStatusesInTheAppCountdownForLetterRequestIsNumberSelector);

  const userLanguage = (
    window.navigator ? (
      window.navigator.languages[window.navigator.languages.length - 1] //* - for Chrome, FireFox, Safari.
      || window.navigator.languages[2] //* - for Chrome, FireFox, Safari.
      || window.navigator.languages[1] //* - for Chrome, FireFox, Safari.
      || window.navigator.language //* - for Chrome, FireFox, Safari (the same as "window.navigator.languages[0]").
      || window.navigator.systemLanguage 
      || window.navigator.userLanguage //* - for IE.
    ) : "en").substr(0, 2).toLowerCase();

  const myEmail = (email ? email : (auth.currentUser !== null ? auth.currentUser.email : null));

  const {push} = useHistory();

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage('');

    const now = new Date().getTime();
    dispatch({
      type: lastAuthorization.type,
      payload: now,
    });

    try {
      await functionsForMocks.registration(email, password);
      dispatch({
        type: emailVerificationConfirmationWaitingIsTrue.type,
      });
      auth.languageCode = userLanguage;

      countdownForLetterRequestWithLink(dispatch, startValueForTimer);

      const text = await requestTheLetter(myEmail);
      if (text) {
        setInfoMessage(text);
      }

      const isLoading = userVerificationWaiting(verificationWaitingBoolean, push);
      const waiting = (isLoading && isLoading.waiting ? isLoading.waiting : null);
      if (isLoading && isLoading.clear) {
        isLoading.clear();
      }
      
      if (waiting === false) {
        dispatch({
          type: emailVerificationConfirmationWaitingIsFalse.type,
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const logoutUser = async () => {
    auth.signOut();
    dispatch({
      type: emailVerificationConfirmationWaitingIsFalse.type,
    });
  };

  const changeInfoMessage = () => {
    setError('');
    setInfoMessage('');

    countdownForLetterRequestWithLink(dispatch, startValueForTimer);

    const intervalId = setInterval(async () => {
      try {
        const text = await requestTheLetter(myEmail);
        if (text) {
          setInfoMessage(text);
        }
      } catch (error) {
        setError(error.message);
      }

      return clearInterval(intervalId)
    }, 1000)
  };

  useUserVerificationWaiting(verificationWaitingBoolean, push);
  useAutomaticStartOfTheCountdownTimer();

  const iAmGoingToSignup = (
    verificationWaitingBoolean 
    ? 
    <div className={classes.SigLogActionWaiting}>
      <h1 className={classes.SigLogTitle}>Верификация</h1>
      <p className={classes.SigLogActionWaitingText}>Ожидание подтверждения электронной почты{infoMessage ? null : `${myEmail ? ` ${myEmail}.` : null}`}</p>
      <img className={classes.SigLogActionPreloader} src={preloader} alt='preloader' width='5vw' />
      {
        infoMessage 
        && 
        <p className={classes.SigLogActionWaitingText}>{infoMessage}</p>
      }
      {
        error 
        && 
        <div className={classes.SigLogActionErrorArea}>
            <p className={classes.SigLogActionErrorText}>{error}</p>
        </div>
      }
      <div className={classes.SigLogActionButtons}>
        {
          timeLeftBeforeRequesting === 0 || timeLeftBeforeRequesting === null || timeLeftBeforeRequesting === startValueForTimer
          ? 
          <button className={classes.SigLogActionBtn} type="submit" onClick={changeInfoMessage}>Запросить письмо</button>
          : 
          <p className={`${classes.SigLogActionWaitingText} ${classes.SigLogActionWaitingText_countdown}`}>Запросить письмо: {timeLeftBeforeRequesting}с</p>
        }
        <button className={classes.SigLogActionBtn} type="submit" onClick={logoutUser}>Выход</button>
      </div>
    </div>
    : 
    <form className={classes.SigLogForm} onSubmit={handleSubmit}>
      <h1 className={classes.SigLogTitle}>Регистрация</h1>
      <p className={classes.SigLogDescription}>Заполните форму для регистрации. На указанный адрес будет отправлено письмо для подтверждения электронной почты!</p>
      <div className={`${classes.SigLogEmailArea} ${classes.SigLogArea}`}>
          <input
          className={`${classes.SigLogEmailInput} ${classes.SigLogInput} ${isMobileDeviceBoolean ? classes.SigLogInputMobileDevice : null}`}
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleEmailChange}
          value={email}
          data-testid="idEmail"
          />
      </div>
      <div className={`${classes.SigLogPasswordArea} ${classes.SigLogArea}`}>
          <input
          className={`${classes.SigLogPasswordInput} ${classes.SigLogInput} ${isMobileDeviceBoolean ? classes.SigLogInputMobileDevice : null}`}
          placeholder="Password"
          name="password"
          type="password"
          onChange={handlePassChange}
          value={password}
          data-testid="idPassword"
          />
      </div>
      <div className={`${classes.SigLogActionArea} ${classes.SigLogArea}`}>
          {
            error && !verificationWaitingBoolean 
            && 
            <div className={classes.SigLogActionErrorArea}>
              <p className={classes.SigLogActionErrorText} data-testid="idError">{error}</p>
            </div>
          }
          <button className={classes.SigLogActionBtn} type="submit" data-testid="idBtnSubmit">Зарегистрироваться</button>
      </div>
      <p className={classes.SigLogInfoDescription}>
          <span className={classes.SigLogInfoText}>Уже есть аккаунт? </span>
          <Link className={classes.SigLogInfoLink} to={allAppComponentsWithPageTitle.login.path}>Войти</Link>
      </p>
    </form>
  )

  return (
    <SignupUI classes={classes} iAmGoingToSignup={iAmGoingToSignup}></SignupUI>
  )
};
