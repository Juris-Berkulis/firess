import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInChatsListWithThunkAction, removeFromChatsListWithThunkAction } from '../../../store/ChatsList/Action';
import { getChatsListChatsKindOfListSelector } from '../../../store/ChatsList/Selectors';
import { useStyles } from '../../../styles/Style';
import { ChangeChatsListUI } from '../../../ui_components/ChangeChatsListUI.jsx';

export const ChangeChatsList = () => {
  const classes = useStyles();
  const [valueName, setValueName] = useState('');
  const [nameAlreadyExists, setNameAlreadyExists] = useState(false);
  const [nameNotFound, setNameNotFound] = useState(false);

  const nameAlreadyExistsForProps = nameAlreadyExists ? <p className={classes.textAttention}>Имя уже существует</p> : null;
  const nameNotFoundForProps = nameNotFound ? <p className={classes.textAttention}>Имя не найдено</p> : null

  const dispatch = useDispatch();
  const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

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
    const nowString = String(now);
    return nowString
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
        dispatch(addInChatsListWithThunkAction(newContact));
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
      // const newChatsListRed = chatsListRed.filter((item) => item.name !== valueName);
      const [delChatsListRed] = chatsListRed.filter((item) => item.name === valueName);
      console.log(delChatsListRed.key)
      dispatch(removeFromChatsListWithThunkAction(delChatsListRed.key, delChatsListRed.name));
      resetValue();
    } else {
      setNameNotFound(true);
    }
  };

  return (
    <ChangeChatsListUI classes={classes} onSubmit={onSubmit} onSaveNameFromInput={onSaveNameFromInput} valueName={valueName} nameAlreadyExistsForProps={nameAlreadyExistsForProps} nameNotFoundForProps={nameNotFoundForProps} deliteContact={deliteContact}></ChangeChatsListUI>
  )
};
