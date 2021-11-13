import React from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';

export const ChartFormUI = (props) => {
    return (
        <Box className={props.classes.form} component='form' onSubmit={props.onSubmit}>
            <InputBase className={props.classes.input} inputRef={props.refInput} placeholder="Сообщение" label="Сообщение" type="text" onChange={props.onSaveValueFromInput} value={props.value} />
            <IconButton type='submit'>
            <Send />
            </IconButton>
        </Box>
    )
};
