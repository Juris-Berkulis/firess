import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { valueInChatsListInput } from '../../../store/AppSwitches/Action';
import { removeMessageInChatListWithThunkAction } from '../../../store/ChatList/Action';
import { addInChatsListWithThunkAction, removeFromChatsListWithThunkAction } from '../../../store/ChatsList/Action';
import { getChatsListChatsKindOfListSelector } from '../../../store/ChatsList/Selectors';
import { useStyles } from '../../../styles/Style';
import { ChangeChatsListUI } from '../../../ui_components/ChangeChatsListUI.jsx';

export const ChangeChatsList = () => {
  const classes = useStyles();
  const [valueName, setValueName] = useState('');
  const [nameAlreadyExists, setNameAlreadyExists] = useState(false);
  const [nameNotFound, setNameNotFound] = useState(false);
  const [chatsListRedNotEmpty, setChatsListRedNotEmpty] = useState(true);

  const nameAlreadyExistsForProps = nameAlreadyExists ? <p className={classes.textAttention}>Чат уже существует</p> : null;
  const nameNotFoundForProps = nameNotFound ? <p className={classes.textAttention}>Чат не найден</p> : null
  const chatsListRedNotEmptyProps = !chatsListRedNotEmpty ? <p className={classes.textAttention}>Нет похожих чатов</p> : null

  const dispatch = useDispatch();
  const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

  const onSaveNameFromInput = (event) => {
    setValueName(event.target.value);
    setNameAlreadyExists(false);
    setNameNotFound(false);

    if (chatsListRed.filter(chat => chat.name.includes(event.target.value.toLowerCase())).length) {
      setChatsListRedNotEmpty(true)
    } else {
      setChatsListRedNotEmpty(false)
    }
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
    setChatsListRedNotEmpty(true);
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
    setChatsListRedNotEmpty(true);
    if (chatsListRed.find((item) => item.name === valueName)) {
      setNameNotFound(false);
      const [delChatsListRed] = chatsListRed.filter((item) => item.name === valueName);
      dispatch(removeFromChatsListWithThunkAction(delChatsListRed.key, delChatsListRed.name));
      dispatch(removeMessageInChatListWithThunkAction(delChatsListRed.key));
      resetValue();
    } else {
      setNameNotFound(true);
    }
  };

  useEffect(() => {
    dispatch({
      type: valueInChatsListInput.type,
      payload: valueName,
    });
  }, [dispatch, valueName]);

  return (
    <ChangeChatsListUI classes={classes} onSubmit={onSubmit} onSaveNameFromInput={onSaveNameFromInput} valueName={valueName} nameAlreadyExistsForProps={nameAlreadyExistsForProps} nameNotFoundForProps={nameNotFoundForProps} deliteContact={deliteContact} chatsListRedNotEmptyProps={chatsListRedNotEmptyProps}></ChangeChatsListUI>
  )
};
