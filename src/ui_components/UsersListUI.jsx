import React from 'react';

export const UsersListUI = (props) => {
    return (
        <div className={props.classes.users_list__wrapper}>
            <ul className={`${props.classes.users_list__items} ${props.screenHeightLessThan450 ? props.classes.users_list__items__screen_height_less_than_450 : null}`}>{props.dataUI}</ul>
        </div>
    )
};
