import React from 'react';
import { APP_THEMES_NAMES } from '../../data/consts';
import { isMobileDevice } from '../../helper/helper';
import { useStyles } from '../../styles/Style';
import { HomeUI } from '../../ui_components/HomeUI';

export const Home = () => {
    const classes = useStyles();

    const isMobileDeviceBoolean = isMobileDevice();

    return (
        <HomeUI classes={classes} isMobileDeviceBoolean={isMobileDeviceBoolean} APP_THEMES_NAMES={APP_THEMES_NAMES}></HomeUI>
    )
};
