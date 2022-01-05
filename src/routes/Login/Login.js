import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { allAppComponentsWithPageTitle } from '../../data/consts';
import { functionsForMocks } from '../../helper/forMocks/functions';
import { useStyles } from '../../styles/Style';
import { LoginUI } from '../../ui_components/LoginUI';
import preloader from '../../img/preloader.gif';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

export const Login = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

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
      setLoad(true);
      // push(allAppComponentsWithPageTitle.profile.path);

      const timerId = setInterval(async () => {
        if (auth.currentUser) {
          await functionsForMocks.userReload();
          console.log('Ожидание')
          if (auth.currentUser && auth.currentUser.emailVerified) {
            push(allAppComponentsWithPageTitle.profile.path);
            setLoad(false);
            console.log('Email подтверждён')
            return clearInterval(timerId)
          }
        } else {
          setLoad(false);
          return clearInterval(timerId)
        }
      }, 5000);
    } catch (error) {
      setError(error.message);
    }
  };

  const logoutUser = () => {
    auth.signOut();
    setLoad(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && !user.emailVerified) {
        setLoad(true)
      }
    });
  }, []);

  const iAmGoingToSignup = (
    load && !error 
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
          className={`${classes.SigLogEmailInput} ${classes.SigLogInput}`}
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
          className={`${classes.SigLogPasswordInput} ${classes.SigLogInput}`}
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
