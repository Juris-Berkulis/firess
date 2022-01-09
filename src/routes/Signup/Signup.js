import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { allAppComponentsWithPageTitle } from '../../data/consts';
import { auth } from '../../firebase/firebase';
import { functionsForMocks } from '../../helper/forMocks/functions';
import { useStyles } from '../../styles/Style';
import { SignupUI } from '../../ui_components/SignupUI';
import preloader from '../../img/preloader.gif';
import { Link } from 'react-router-dom';
import { isMobileDevice, userVerificationWaiting } from '../../helper/helper';
import { useUserVerificationWaiting } from '../../hooks/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector } from '../../store/VerificationStatus/Selectors';
import { emailVerificationConfirmationWaitingIsFalse, emailVerificationConfirmationWaitingIsTrue } from '../../store/VerificationStatus/Action';

export const Signup = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isMobileDeviceBoolean = isMobileDevice();

  const dispatch = useDispatch();
  const verificationWaitingBoolean = useSelector(getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector);

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

    try {
      await functionsForMocks.registration(email, password); //? FIXME: - Оптимизировать согласно статье "https://habr.com/ru/company/ruvds/blog/414373/".
      dispatch({
        type: emailVerificationConfirmationWaitingIsTrue.type,
      });
      auth.languageCode = userLanguage;
      await functionsForMocks.checkEmail(); //? FIXME: - Оптимизировать согласно статье "https://habr.com/ru/company/ruvds/blog/414373/".
      
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

  useUserVerificationWaiting(verificationWaitingBoolean, push);

  const iAmGoingToSignup = (
    verificationWaitingBoolean && !error 
    ? 
    <div className={classes.SigLogActionWaiting}>
      <p className={classes.SigLogActionWaitingText}>По указанному адресу ({myEmail}) было отправлено письмо со ссылкой для подтверждения электронной почты. Перейдите по ссылке в письме, чтобы завершить процесс регистрации.</p>
      <p className={classes.SigLogActionWaitingText}>Ожидание подтверждения электронной почты:</p>
      <img className={classes.SigLogActionPreloader} src={preloader} alt='preloader' width='5vw' />
      <button className={classes.SigLogActionBtn} type="submit" onClick={logoutUser}>Отмена</button>
    </div>
    : 
    <form className={classes.SigLogForm} onSubmit={handleSubmit}>
      <p className={classes.SigLogDescription}>Заполните форму для регистрации. На указанный адрес будет отправлено письмо для подтверждения почты!</p>
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
              error 
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
