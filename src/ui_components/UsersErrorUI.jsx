import React from 'react';

export const UsersErrorUI = (props) => {
    return (
        <div className={props.classes.users_error__field}>
            <div className={props.classes.users_error__wrapper_text}>
                <h1 className={props.classes.users_error__text}>Упс, данные не найдены!</h1>
            </div>
        </div>
    )
};
