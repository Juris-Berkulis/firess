import React from 'react';
import { useMakePageTitle } from '../../hooks/hooks';

export const Error404 = () => {
    useMakePageTitle('Fireact Messenger. 404: Страница не найдена');

    return (
        <div>
            <h1>Ошибка 404</h1>
            <h2>Упс! Что-то пошло не так!</h2>
            <h4>Страница не найдена.</h4>
        </div>
    )
};
