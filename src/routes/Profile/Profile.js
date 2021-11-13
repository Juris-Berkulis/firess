import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckedProfile } from '../../store/Profile/Action';
import { getProfileCheckedSelector } from '../../store/Profile/Selectors';
import { ProfileUI } from '../../ui_components/ProfileUI.jsx';

export const Profile = () => {
    const componentTitle = 'Профиль';
    const dispatch = useDispatch();
    const isChecked = useSelector(getProfileCheckedSelector);

    const toggleChecked = () => {
        dispatch({
            type: toggleCheckedProfile.type,
        })
    };

    return (
        <ProfileUI componentTitle={componentTitle} isChecked={isChecked} toggleChecked={toggleChecked}></ProfileUI>
    )
};
