import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../firebase/firebase';
import { eventForPWAInstallation } from '../../store/AppSwitches/Action';
import { getStatusesInTheAppEventForPWAInstallationSelector } from '../../store/AppSwitches/Selectors';
import { toggleCheckedProfile } from '../../store/Profile/Action';
import { getProfileCheckedSelector } from '../../store/Profile/Selectors';
import { ProfileUI } from '../../ui_components/ProfileUI.jsx';

export const Profile = () => {
    const componentTitle = 'Профиль';
    const dispatch = useDispatch();
    const isChecked = useSelector(getProfileCheckedSelector);
    const eventForPWAInstallationSel = useSelector(getStatusesInTheAppEventForPWAInstallationSelector);

    const myEmail = (auth.currentUser !== null ? auth.currentUser.email : null);

    const myEmailForProps = isChecked ? <span>{myEmail}</span> : <span>Скрыто</span>;

    const toggleChecked = () => {
        dispatch({
            type: toggleCheckedProfile.type,
        })
    };

    const installApp = async () => {
        if (eventForPWAInstallationSel) {
            //* Show the install prompt:
            eventForPWAInstallationSel.prompt();
            //* Wait for the user to respond to the prompt (You can optionally return an object that has an "outcome" method that displays the user's response from the "prompt" modal window):
            await eventForPWAInstallationSel.userChoice;
            //* 1. Hide the app-provided install promp ; 2. We've used the instalation prompt, and we don't need in it more:
            dispatch({
                type: eventForPWAInstallation.type,
                payload: null,
            });
        }
    };

    return (
        <ProfileUI componentTitle={componentTitle} isChecked={isChecked} toggleChecked={toggleChecked} myEmailForProps={myEmailForProps} installApp={installApp} eventForPWAInstallationSel={eventForPWAInstallationSel}></ProfileUI>
    )
};
