import React from 'react';
import { useSelector } from 'react-redux';
import { getAppSwitchesDeviceOnTheNetworkSelector } from '../../store/AppSwitches/Selectors';
import { useStyles } from '../../styles/Style';
import { DeviceOnTheNetworkUI } from '../../ui_components/DeviceOnTheNetworkUI';

export const DeviceOnTheNetwork = () => {
    const classes = useStyles();

    const deviceOnTheNetworkSel = useSelector(getAppSwitchesDeviceOnTheNetworkSelector);

    return (
        <DeviceOnTheNetworkUI classes={classes} deviceOnTheNetworkSel={deviceOnTheNetworkSel}></DeviceOnTheNetworkUI>
    )
};
