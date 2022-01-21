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
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const errorForProps = error ? <p className={`${classes.chatsListActionResaltInfo} ${classes.chatsListActionResaltInfo_attention}`}>{error}</p> : null
  const successForProps = success ? <p className={`${classes.chatsListActionResaltInfo} ${classes.chatsListActionResaltInfo_success}`}>{success}</p> : null

  const dispatch = useDispatch();
  const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);

  const onSaveNameFromInput = (event) => {
    setValueName(event.target.value);
    setError(false);
    setSuccess(false);

    if (!chatsListRed.filter(chat => chat.name.includes(event.target.value.toLowerCase())).length) {
      setError('Нет похожих чатов');
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
    setError(false);
    setSuccess(false);
    if (valueName !== '') {
      if (!(chatsListRed.find((item) => item.name === valueName))) {
        const newContact = addContact(valueName);
        dispatch(addInChatsListWithThunkAction(newContact));
        const newChat = valueName;
        setSuccess(`Чат "${newChat}" добавлен`);
        resetValue();
      } else {
        setError('Чат уже существует');
      }
    } else {
      setError('Введите название чата');
    }
  };

  const deliteContact = () => {
    setError(false);
    setSuccess(false);
    if (valueName !== '') {
      if (chatsListRed.find((item) => item.name === valueName)) {
        const [delChatsListRed] = chatsListRed.filter((item) => item.name === valueName);
        dispatch(removeFromChatsListWithThunkAction(delChatsListRed.key, delChatsListRed.name));
        dispatch(removeMessageInChatListWithThunkAction(delChatsListRed.key));
        const deleteChat = valueName;
        setSuccess(`Чат "${deleteChat}" удален`);
        resetValue();
      } else {
        setError('Чат не найден');
      }
    } else {
      setError('Введите название чата');
    }
  };

  useEffect(() => {
    dispatch({
      type: valueInChatsListInput.type,
      payload: valueName,
    });
  }, [dispatch, valueName]);

  return (
    <ChangeChatsListUI classes={classes} onSubmit={onSubmit} onSaveNameFromInput={onSaveNameFromInput} valueName={valueName} deliteContact={deliteContact} errorForProps={errorForProps} successForProps={successForProps}></ChangeChatsListUI>
  )
};
