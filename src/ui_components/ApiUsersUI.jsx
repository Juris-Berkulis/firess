import React from 'react';

export const ApiUsersUI = (props) => {
    return (
        <div>
            <h1 className={props.classes.api_users__title}>Юзеры по API</h1>
            <button className={props.classes.api_users__btn} onClick={props.getData}>Перезагрузить</button>
            {props.dataForProps}
            {props.isLoadingForProps}
            {props.isErrorForProps}
        </div>
    )
};
