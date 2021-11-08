import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInChatsListAction, removeFromChatsListAction } from '../../../store/ChatsList/Action';
import { Box, InputBase, IconButton } from '@material-ui/core';
import { PersonAdd, DeleteForever } from '@material-ui/icons';
import { useStyles } from '../../../styles/Style';

export const ChangeChatsList = (props) => {
  const classes = useStyles();
  const [valueName, setValueName] = useState('');
  const [nameAlreadyExists, setNameAlreadyExists] = useState(false);
  const [nameNotFound, setNameNotFound] = useState(false);

  const dispatch = useDispatch();
  const chatsListRed = useSelector((state) => state.chatsListReducer);

  const onSaveNameFromInput = (event) => {
    setValueName(event.target.value);
    setNameAlreadyExists(false);
    setNameNotFound(false);
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
      if (!(chatsListRed.find((item) => item.name === valueName))) {
        setNameAlreadyExists(false);
        const newContact = addContact(valueName);
        dispatch(addInChatsListAction(newContact));
        resetValue();
      } else {
        setNameAlreadyExists(true);
      }
    }
  };

  const deliteContact = () => {
    setNameAlreadyExists(false);
    if (chatsListRed.find((item) => item.name === valueName)) {
      setNameNotFound(false);
      const newChatsListRed = chatsListRed.filter((item) => item.name !== valueName);
      dispatch(removeFromChatsListAction(newChatsListRed));
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
              <IconButton type='submit'>
                <PersonAdd className={classes.changeContactNameIcon} />
              </IconButton>
              <IconButton onClick={deliteContact}>
                <DeleteForever className={classes.changeContactNameIcon} />
              </IconButton>
            </div>
        </Box>
    )
};
