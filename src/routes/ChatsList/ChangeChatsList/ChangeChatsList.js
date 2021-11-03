import React, { useState } from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import { PersonAdd, DeleteForever } from '@material-ui/icons';
import { useStyles } from '../../../styles/Style';

export const ChangeChatsList = (props) => {
  const classes = useStyles();
  const [valueName, setValueName] = useState('');
  const [nameAlreadyExists, setNameAlreadyExists] = useState(false);
  const [nameNotFound, setNameNotFound] = useState(false);

  const onSaveNameFromInput = (event) => {
    setValueName(event.target.value);
  };

  const resetValue = () => {
    setValueName('');
  };

  const newContactId = () => {
    const now = new Date().getTime();
    return now
  };

  const addContact = (newName) => {
    const now = newContactId();
    const newContact = {
      id: now,
      name: newName,
    };
    return newContact
  };

  const onSubmit = (event) => {
    event.preventDefault(); //* Cancel page reload.
    setNameNotFound(false);
    if (valueName !== '') {
      if (!(props.stateChatsList.find((item) => item.name === valueName))) {
        setNameAlreadyExists(false);
        const newContact = addContact(valueName);
        props.setStateChatsList([...props.stateChatsList, newContact]);
        resetValue();
      } else {
        setNameAlreadyExists(true);
      }
    }
  };

  const deliteContact = () => {
    setNameAlreadyExists(false);
    if (props.stateChatsList.find((item) => item.name === valueName)) {
      setNameNotFound(false);
      props.setStateChatsList(props.stateChatsList.filter((item) => item.name !== valueName))
      resetValue();
    } else {
      setNameNotFound(true);
    }
  };

    return (
        <Box className={classes.changeContactNameForm} component='form' onSubmit={onSubmit}>
            <InputBase className={classes.changeContactNameInput} placeholder="Имя" label="Имя" type="text" onChange={onSaveNameFromInput} value={valueName} />
            {nameAlreadyExists ? <p className={classes.textAttention}>Имя уже существует</p> : null}
            {nameNotFound ? <p className={classes.textAttention}>Имя не найдено</p> : null}
            <div className={classes.changeContactNameButtons}>
                <IconButton type='submit'><PersonAdd className={classes.changeContactNameIcon} /></IconButton>
                <IconButton onClick={deliteContact}><DeleteForever className={classes.changeContactNameIcon} /></IconButton>
            </div>
        </Box>
    )
};
