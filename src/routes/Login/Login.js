import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { allAppComponentsWithPageTitle } from '../../data/consts';
import { functionsForMocks } from '../../helper/forMocks/functions';
import { useStyles } from '../../styles/Style';
import { LoginUI } from '../../ui_components/LoginUI';
import preloader from '../../img/preloader.gif';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { instantUserVerificationChecking, isMobileDevice } from '../../helper/helper';
import { useUserVerificationWaiting } from '../../hooks/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { emailVerificationConfirmationWaitingIsFalse, emailVerificationConfirmationWaitingIsTrue } from '../../store/VerificationStatus/Action';
import { getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector } from '../../store/VerificationStatus/Selectors';

export const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isMobileDeviceBoolean = isMobileDevice();

  const dispatch = useDispatch();
  const verificationWaitingBoolean = useSelector(getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector);

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
              error 
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
