import React from 'react';
import { Toolbar } from '@material-ui/core';

export const HeaderUI = (props) => {
    return (
        <Toolbar className={props.classes.headerNav} component="nav">
            {props.navigationForProps}
            {props.showLogOutBtnForProps}
        </Toolbar>
    )
};
