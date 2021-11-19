import React from 'react';
import { useStyles } from '../../../styles/Style.js';
import { UsersErrorUI } from '../../../ui_components/UsersErrorUI.jsx';

export const UsersError = () => {
    const classes = useStyles();

    return (
        <UsersErrorUI classes={classes}></UsersErrorUI>
    )
};
