import React from 'react';
import { Link } from 'react-router-dom';

export const SignupUI = (props) => {
    return (
    <div className={props.classes.SigLogField}>
        <form className={props.classes.SigLogForm} onSubmit={props.handleSubmit}>
        <p className={props.classes.SigLogDescription}>Заполните форму ниже, чтобы зарегистрировать новую учетную запись.</p>
        <div className={`${props.classes.SigLogEmailArea} ${props.classes.SigLogArea}`}>
            <input
            className={`${props.classes.SigLogEmailInput} ${props.classes.SigLogInput}`}
            placeholder="Email"
            name="email"
            type="email"
            onChange={props.handleEmailChange}
            value={props.email}
            data-testid="idEmail"
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
            data-testid="idPassword"
            />
        </div>
        <div className={`${props.classes.SigLogActionArea} ${props.classes.SigLogArea}`}>
            {
                props.error 
                && 
                <div className={props.classes.SigLogActionErrorArea}>
                    <p className={props.classes.SigLogActionErrorText} data-testid="idError">{props.error}</p>
                </div>
            }
            <button className={props.classes.SigLogActionBtn} type="submit" data-testid="idBtnSubmit">Зарегистрироваться</button>
        </div>
        <p className={props.classes.SigLogInfoDescription}>
            <span className={props.classes.SigLogInfoText}>Уже есть аккаунт? </span>
            <Link className={props.classes.SigLogInfoLink} to={props.allAppComponentsWithPageTitleLoginPath}>Войти</Link>
        </p>
        </form>
    </div>
    )
};
