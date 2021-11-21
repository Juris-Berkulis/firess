import React, { useEffect, useState } from 'react';
import { NAVIGATION as navigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStyles } from '../../styles/Style';
import { HeaderUI } from '../../ui_components/HeaderUI.jsx';
import { auth } from '../../firebase/firebase';

export const Header = () => {
    const classes = useStyles();

    const navigationForProps = navigation.map((item) => <Button className={classes.headerNavItem} to={item.href} component={Link} key={item.name}>{item.name}</Button>);

    const [authed, setAuthed] = useState(false);

    const logoutUser = () => {
        auth.signOut();
    };

    const showLogOutBtnForProps = (
        authed 
        ? 
        <Button className={classes.headerNavItem} onClick={logoutUser}>Выход</Button> 
        : 
        <>
            <Button className={classes.headerNavItem} to='/login' component={Link}>Вход</Button>
            <Button className={classes.headerNavItem} to='/signup' component={Link}>Регистрация</Button>
        </>
    );

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if (user) {
            setAuthed(true);
        } else {
            setAuthed(false);
        }
        })
    }, []);

    return (
        <HeaderUI classes={classes} navigationForProps={navigationForProps} showLogOutBtnForProps={showLogOutBtnForProps}></HeaderUI>
    )
};
