import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';

export const ChartFormUI = (props) => {
    return (
        <Box className={props.classes.form} component='form' onSubmit={props.onSubmit}>
            <textarea className={`${props.classes.input} ${props.isMobileDeviceBoolean ? props.classes.input_mobileDevice : null}`} style={{height: (props.inputHeight)}} ref={props.refInput} placeholder="Сообщение" label="Сообщение" type="text" onChange={props.onSaveValueFromInput} value={props.value} />
            <IconButton type='submit' style={{height: `${props.inputMinHeight}px`, padding: `${(props.inputMinHeight - 24) / 2}px 1vw`, fontSize: '24px'}}>
            <Send />
            </IconButton>
        </Box>
    )
};
