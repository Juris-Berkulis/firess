import React from 'react';
import { PreloaderUI } from '../ui_components/PreloaderUI.jsx';
import preloader from '../img/preloader.gif';
import { useStyles } from '../styles/Style';

export const Preloader = () => {
    const classes = useStyles();

    return (
        <PreloaderUI classes={classes} preloader={preloader}></PreloaderUI>
    )
};
