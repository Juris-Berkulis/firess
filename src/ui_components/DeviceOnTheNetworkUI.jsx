import React from 'react';

export const DeviceOnTheNetworkUI = (props) => {
    return (
        <div className={props.classes.deviceOnTheNetwork__wrapper} title={props.deviceOnTheNetworkSel ? 'В сети' : 'Не в сети'}>
            <div className={`${props.classes.deviceOnTheNetwork__lamp} ${props.deviceOnTheNetworkSel ? props.classes.deviceOnTheNetwork__lamp_connectNetwork_1 : props.classes.deviceOnTheNetwork__lamp_disconnectNetwork}`}></div>
            <div className={`${props.classes.deviceOnTheNetwork__lamp} ${props.deviceOnTheNetworkSel ? props.classes.deviceOnTheNetwork__lamp_connectNetwork_2 : props.classes.deviceOnTheNetwork__lamp_disconnectNetwork}`}></div>
            <div className={`${props.classes.deviceOnTheNetwork__lamp} ${props.deviceOnTheNetworkSel ? props.classes.deviceOnTheNetwork__lamp_connectNetwork_3 : props.classes.deviceOnTheNetwork__lamp_disconnectNetwork}`}></div>
        </div>
    )
};
