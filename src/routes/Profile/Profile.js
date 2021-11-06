import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckedProfile } from '../../store/Profile/Action';
// import { useStyles } from '../../styles/Style';

export const Profile = () => {
    // const classes = useStyles();

    const dispatch = useDispatch();
    const isChecked = useSelector((state) => state.checked)

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
