import React from 'react';
import { NAVIGATION as navigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStyles } from '../../styles/Style';
import { HeaderUI } from '../../ui_components/HeaderUI.jsx';

export const Header = () => {
    const classes = useStyles();

    const navigationForProps = navigation.map((item) => <Button className={classes.headerNavItem} to={item.href} component={Link} key={item.name}>{item.name}</Button>);

    return (
        <HeaderUI classes={classes} navigationForProps={navigationForProps}></HeaderUI>
    )
};
