import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, Button } from '@material-ui/core';
import { useStyles } from '../../styles/Style';

export const navigation = [
    {
        name: 'Дом',
        href: '/',
    },
    {
        name: 'Профиль',
        href: '/profile',
    },
    {
        name: 'Мессенджер',
        href: '/messenger',
    },
];

export const Header = () => {
    const classes = useStyles();

    return (
        <Toolbar className={classes.headerNav} component="nav">
            {
                navigation.map((item) => <Button className={classes.headerNavItem} to={item.href} component={Link} key={item.name}>{item.name}</Button>)
            }
        </Toolbar>
    )
};
