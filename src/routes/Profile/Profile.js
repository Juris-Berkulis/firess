import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckedProfile } from '../../store/Profile/Action';
import { getProfileCheckedSelector } from '../../store/Profile/Selectors';
// import { useStyles } from '../../styles/Style';

export const Profile = () => {
    // const classes = useStyles();

    const dispatch = useDispatch();
    const isChecked = useSelector(getProfileCheckedSelector);

    return (
        <div>
            <h1>Профиль</h1>
            <input type='checkbox' checked={isChecked} onChange={() => {
                dispatch({
                    type: toggleCheckedProfile.type,
                })
            }} />
        </div>
    )
};
