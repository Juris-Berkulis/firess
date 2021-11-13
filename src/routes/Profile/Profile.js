import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckedProfile } from '../../store/Profile/Action';
import { getProfileCheckedSelector } from '../../store/Profile/Selectors';
import { ProfileUI } from '../../ui_components/ProfileUI.jsx';
// import { useStyles } from '../../styles/Style';

export const Profile = () => {
    // const classes = useStyles();

    const componentTitle = 'Профиль';
    const dispatch = useDispatch();
    const isChecked = useSelector(getProfileCheckedSelector);

    const toggleChecked = () => {
        dispatch({
            type: toggleCheckedProfile.type,
        })
    };

    return (
        // <div>
        //     <h1>Профиль</h1>
        //     <input type='checkbox' checked={isChecked} onChange={() => {
        //         dispatch({
        //             type: toggleCheckedProfile.type,
        //         })
        //     }} />
        // </div>
        <ProfileUI componentTitle={componentTitle} isChecked={isChecked} toggleChecked={toggleChecked}></ProfileUI>
    )
};
