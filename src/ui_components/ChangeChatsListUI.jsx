import React from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import { PersonAdd, DeleteForever } from '@material-ui/icons';

export const ChangeChatsListUI = (props) => {
    return (
        <Box className={props.classes.changeContactNameForm} component='form' onSubmit={props.onSubmit}>
            <InputBase className={props.classes.changeContactNameInput} placeholder="Название чата" label="Название чата" type="text" onChange={props.onSaveNameFromInput} value={props.valueName} />
            {props.errorForProps}
            {props.successForProps}
            <div className={props.classes.changeContactNameButtons}>
                <IconButton type='submit'>
                <PersonAdd className={props.classes.changeContactNameIcon} />
                </IconButton>
                <IconButton onClick={props.deliteContact}>
                <DeleteForever className={props.classes.changeContactNameIcon} />
                </IconButton>
            </div>
        </Box>
    )
};
