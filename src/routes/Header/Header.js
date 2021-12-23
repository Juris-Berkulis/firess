import React, { useEffect, useState } from 'react';
import { NAVIGATION as navigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStyles } from '../../styles/Style';
import { HeaderUI } from '../../ui_components/HeaderUI.jsx';
import { auth } from '../../firebase/firebase';
import { allAppComponentsWithPageTitle } from '../../data/consts';
import { isMobileDevice } from '../../helper/helper';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMobileMenuIsOpenSelector } from '../../store/MobileMenuStatus/Selectors';
import { closeMobileMenuStatus, toggleMobileMenuStatus } from '../../store/MobileMenuStatus/Action';

export const Header = () => {
    const classes = useStyles();

    const location = useLocation();

    const isMobileDeviceProps = isMobileDevice();

    const [authed, setAuthed] = useState(false);

    const dispatch = useDispatch();
    const mobileMenuOpen = useSelector(getMobileMenuIsOpenSelector);
    
    const navigationForProps = navigation.map((item) => <Button className={`${classes.headerNavItem} ${isMobileDeviceProps && !mobileMenuOpen ? classes.headerNavItemMobile : null}`} to={item.href} component={Link} key={item.name}>{item.name}</Button>);

    const logoutUser = () => {
        auth.signOut();
    };

    const showMobileMenu = () => {
        dispatch({
            type: toggleMobileMenuStatus.type,
        })
    };

    const showBurgerMenuProps = (
        isMobileDeviceProps
        ?
        (
            !mobileMenuOpen 
            ? 
            <Button className={`${classes.headerNavItem}`} onClick={showMobileMenu}>Меню</Button> 
            : 
            <Button className={`${classes.headerNavItem}`} onClick={showMobileMenu}>Закрыть</Button>
        )
        :
        null
    );

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

    useEffect(() => {
        dispatch({
            type: closeMobileMenuStatus.type,
        })
    }, [location, dispatch]);

    return (
        <HeaderUI classes={classes} navigationForProps={navigationForProps} showLogOutBtnForProps={showLogOutBtnForProps} showBurgerMenuProps={showBurgerMenuProps} mobileMenuOpen={mobileMenuOpen}></HeaderUI>
    )
};
