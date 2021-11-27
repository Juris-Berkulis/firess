import React from 'react';
import { useMakePageTitle } from '../../hooks/hooks';

export const Home = () => {
    useMakePageTitle('Fireact Messenger. Домашняя страница');

    return (
        <div>
            <h1>Домашняя страница</h1>
        </div>
    )
};
