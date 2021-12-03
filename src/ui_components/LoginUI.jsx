import React from 'react';
import { Link } from 'react-router-dom';

export const LoginUI = (props) => {
    return (
    <div className={props.classes.SigLogField}>
        <form className={props.classes.SigLogForm} onSubmit={props.handleSubmit}>
        <p className={props.classes.SigLogDescription}>Заполните форму ниже, чтобы войти в свою учетную запись.</p>
        <div className={`${props.classes.SigLogEmailArea} ${props.classes.SigLogArea}`}>
            <input
            className={`${props.classes.SigLogEmailInput} ${props.classes.SigLogInput}`}
            placeholder="Email"
            name="email"
            type="email"
            onChange={props.handleEmailChange}
            value={props.email}
            />
        </div>
        <div className={`${props.classes.SigLogPasswordArea} ${props.classes.SigLogArea}`}>
            <input
            className={`${props.classes.SigLogPasswordInput} ${props.classes.SigLogInput}`}
            placeholder="Password"
            name="password"
            type="password"
            onChange={props.handlePassChange}
            value={props.password}
            />
        </div>
        <div className={`${props.classes.SigLogActionArea} ${props.classes.SigLogArea}`}>
            {
                props.error 
                && 
                <div className={props.classes.SigLogActionErrorArea}>
                    <p className={props.classes.SigLogActionErrorText}>{props.error}</p>
                </div>
            }
            <button className={props.classes.SigLogActionBtn} type="submit">Войти</button>
        </div>
        <p className={props.classes.SigLogInfoDescription}>
            <span className={props.classes.SigLogInfoText}>Нет аккаунта? </span>
            <Link className={props.classes.SigLogInfoLink} to={props.allAppComponentsWithPageTitleSignupPath}>Регистрация</Link>
        </p>
        </form>
    </div>
    )
};
