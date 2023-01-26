import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { allAppComponentsWithPageTitle, startValueForTimer } from '../../data/consts';
import { functionsForMocks } from '../../helper/forMocks/functions';
import { useStyles } from '../../styles/Style';
import { LoginUI } from '../../ui_components/LoginUI';
import preloader from '../../img/preloader.gif';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { countdownForLetterRequestWithLink, instantUserVerificationChecking, isMobileDevice, requestTheLetter } from '../../helper/helper';
import { useAutomaticStartOfTheCountdownTimer, useUserVerificationWaiting } from '../../hooks/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { emailVerificationConfirmationWaitingIsFalse, emailVerificationConfirmationWaitingIsTrue, lastAuthorization } from '../../store/AppSwitches/Action';
import { getStatusesInTheAppCountdownForLetterRequestIsNumberSelector, getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector } from '../../store/AppSwitches/Selectors';

export const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const isMobileDeviceBoolean = isMobileDevice();

  const dispatch = useDispatch();
  const verificationWaitingBoolean = useSelector(getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector);
  const timeLeftBeforeRequesting = useSelector(getStatusesInTheAppCountdownForLetterRequestIsNumberSelector);

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
      await functionsForMocks.login(email, password);
      dispatch({
        type: emailVerificationConfirmationWaitingIsTrue.type,
      });

      const isLoading = instantUserVerificationChecking(verificationWaitingBoolean, push);
      if (isLoading === true) {
        dispatch({
          type: emailVerificationConfirmationWaitingIsTrue.type,
        });
      } else if (isLoading === false) {
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

  const changeInfoMessage = async () => {
    setError('');
    setInfoMessage('');

    countdownForLetterRequestWithLink(dispatch, startValueForTimer);

    try {
      const text = await requestTheLetter(myEmail);
      if (text) {
        setInfoMessage(text);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useUserVerificationWaiting(verificationWaitingBoolean, push);
  useAutomaticStartOfTheCountdownTimer();

  const iAmGoingToSignup = (
    verificationWaitingBoolean 
    ? 
    <div className={classes.SigLogActionWaiting}>
      <h1 className={classes.SigLogTitle}>Верификация</h1>
      <p className={classes.SigLogActionWaitingText}>Ожидание подтверждения электронной почты{infoMessage ? null : (myEmail ? ' ' + myEmail : null)}</p>
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
      <h1 className={classes.SigLogTitle}>Вход</h1>
      <p className={classes.SigLogDescription}>Заполните форму для входа в свою учетную запись.</p>
      <div className={`${classes.SigLogEmailArea} ${classes.SigLogArea}`}>
          <input
          className={`${classes.SigLogEmailInput} ${classes.SigLogInput} ${isMobileDeviceBoolean ? classes.SigLogInputMobileDevice : null}`}
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleEmailChange}
          value={email}
          data-testid="idEmailLogin"
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
          data-testid="idPasswordLogin"
          />
      </div>
      <div className={`${classes.SigLogActionArea} ${classes.SigLogArea}`}>
          {
            error && !verificationWaitingBoolean
            && 
            <div className={classes.SigLogActionErrorArea}>
              <p className={classes.SigLogActionErrorText} data-testid="idErrorLogin">{error}</p>
            </div>
          }
          <button className={classes.SigLogActionBtn} type="submit" data-testid="idBtnSubmitLogin">Войти</button>
      </div>
      <p className={classes.SigLogInfoDescription}>
          <span className={classes.SigLogInfoText}>Нет аккаунта? </span>
          <Link className={classes.SigLogInfoLink} to={allAppComponentsWithPageTitle.signup.path}>Регистрация</Link>
      </p>
    </form>
  )

  return (
    <LoginUI classes={classes} iAmGoingToSignup={iAmGoingToSignup}></LoginUI>
  )
};
