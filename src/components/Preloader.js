import React from 'react';
import { PreloaderUI } from '../ui_components/PreloaderUI.jsx';
import preloader from '../img/preloader.gif';
import { useStyles } from '../styles/Style';
import { useMakePageTitle } from '../hooks/hooks.js';

export const Preloader = () => {
    const classes = useStyles();
    useMakePageTitle(`Fireact Messenger. Загрузка сайта...`);

    return (
        <PreloaderUI classes={classes} preloader={preloader}></PreloaderUI>
    )
};
