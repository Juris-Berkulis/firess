import React from 'react';
import { useStyles } from '../../../styles/Style.js';
import { UsersLoaderUI } from '../../../ui_components/UsersLoaderUI.jsx';
import preloader from '../../../img/preloader.gif';

export const UsersLoader = (props) => {
    const classes = useStyles();

    return (
        <UsersLoaderUI classes={classes} preloader={preloader} ismobileDeviceProps={props.ismobileDeviceProps}></UsersLoaderUI>
    )
};
