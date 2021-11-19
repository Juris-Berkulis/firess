import React from 'react';

export const UsersListUI = (props) => {
    return (
        <div className={props.classes.users_list__wrapper}>
            <ul className={props.classes.users_list__items}>{props.dataUI}</ul>
        </div>
    )
};
