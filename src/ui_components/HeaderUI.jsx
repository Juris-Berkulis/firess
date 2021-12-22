import React from 'react';
import { Toolbar } from '@material-ui/core';

export const HeaderUI = (props) => {
    return (
        <Toolbar className={`${props.classes.headerNav} ${props.mobileMenuOpen ? props.classes.headerNavMobileOpen : null}`} component="nav">
            {props.showBurgerMenuProps}
            {props.navigationForProps}
            {props.showLogOutBtnForProps}
        </Toolbar>
    )
};
