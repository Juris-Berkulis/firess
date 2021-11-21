import React from 'react';
import { Link } from 'react-router-dom';

export const LoginUI = (props) => {
    return (
    <div>
        <form onSubmit={props.handleSubmit}>
        <p>Заполните форму ниже, чтобы войти в свою учетную запись.</p>
        <div>
            <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={props.handleEmailChange}
            value={props.email}
            />
        </div>
        <div>
            <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={props.handlePassChange}
            value={props.password}
            />
        </div>
        <div>
            {props.error && <p>{props.error}</p>}
            <button type="submit">Войти</button>
        </div>
        <hr />
        <p>
            <span>Нет аккаунта? </span>
            <Link to="/signup">Регистрация</Link>
        </p>
        </form>
    </div>
    )
};
