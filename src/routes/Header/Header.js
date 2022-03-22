import React, { useEffect } from 'react';
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
import { useChangeEmailVerificationStatus } from '../../hooks/hooks';
import { functionsForMocks } from '../../helper/forMocks/functions';
import { TECHNICAL_UID } from '../../TECHNICAL/TECHNICAL_CONSTS';

export const Header = () => {
    const classes = useStyles();

    const location = useLocation();

    const isMobileDeviceProps = isMobileDevice();

    const myUID = auth.currentUser !== null ? auth.currentUser.uid : null;

    const dispatch = useDispatch();
    const mobileMenuOpen = useSelector(getMobileMenuIsOpenSelector);
    
    const emailVerificationStatus = useChangeEmailVerificationStatus(location);

    const navigationForProps = (
        emailVerificationStatus 
        ? 
        (
            myUID === TECHNICAL_UID 
            ? navigation 
            : 
            navigation.filter((item) => item.name !== allAppComponentsWithPageTitle.usersApi.displayTitle)
        ).map((item) => <Button className={`${classes.headerNavItem} ${isMobileDeviceProps && !mobileMenuOpen ? classes.headerNavItemMobile : null}`} to={item.href} component={Link} key={item.name}>{item.name}</Button>) 
        : 
        null
    );

    const logoutUser = async () => {
        auth.signOut();
        if (auth.currentUser) {
            await functionsForMocks.userReload();
        }
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
        emailVerificationStatus 
        ? 
        <Button className={classes.headerNavItem} onClick={logoutUser}>{allAppComponentsWithPageTitle.logout.displayTitle}</Button> 
        : 
        <>
            <Button className={classes.headerNavItem} to={allAppComponentsWithPageTitle.login.path} component={Link}>{allAppComponentsWithPageTitle.login.displayTitle}</Button>
            <Button className={classes.headerNavItem} to={allAppComponentsWithPageTitle.signup.path} component={Link}>{allAppComponentsWithPageTitle.signup.displayTitle}</Button>
        </>
    );

    useEffect(() => {
        dispatch({
            type: closeMobileMenuStatus.type,
        })
    }, [location, dispatch]);

    return (
        <HeaderUI classes={classes} navigationForProps={navigationForProps} showLogOutBtnForProps={showLogOutBtnForProps} showBurgerMenuProps={showBurgerMenuProps} mobileMenuOpen={mobileMenuOpen}></HeaderUI>
    )
};
