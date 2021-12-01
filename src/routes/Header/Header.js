import React, { useEffect, useState } from 'react';
import { NAVIGATION as navigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStyles } from '../../styles/Style';
import { HeaderUI } from '../../ui_components/HeaderUI.jsx';
import { auth } from '../../firebase/firebase';
import { allAppComponentsWithPageTitle } from '../../data/consts';

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
        <Button className={classes.headerNavItem} onClick={logoutUser}>{allAppComponentsWithPageTitle.logout.displayTitle}</Button> 
        : 
        <>
            <Button className={classes.headerNavItem} to={allAppComponentsWithPageTitle.login.path} component={Link}>{allAppComponentsWithPageTitle.login.displayTitle}</Button>
            <Button className={classes.headerNavItem} to={allAppComponentsWithPageTitle.signup.path} component={Link}>{allAppComponentsWithPageTitle.signup.displayTitle}</Button>
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
