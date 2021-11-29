import React from 'react';
import { Link } from 'react-router-dom';

export const SignupUI = (props) => {
    return (
    <div>
        <form onSubmit={props.handleSubmit}>
        <p>Заполните форму ниже, чтобы зарегистрировать новую учетную запись.</p>
        <div>
            <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={props.handleEmailChange}
            value={props.email}
            data-testid="idEmail"
            />
        </div>
        <div>
            <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={props.handlePassChange}
            value={props.password}
            data-testid="idPassword"
            />
        </div>
        <div>
            {props.error && <p data-testid="idError">{props.error}</p>}
            <button type="submit" data-testid="idBtnSubmit">Зарегистрироваться</button>
        </div>
        <hr />
        <p>
            <span>Уже есть аккаунт? </span>
            <Link to={props.allAppComponentsWithPageTitle.login.path}>Войти</Link>
        </p>
        </form>
    </div>
    )
};
