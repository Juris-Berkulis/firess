import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAXIMUM_NUMBER_OF_CHARACTERS_FOR_A_CHAT_NAME } from '../../../data/consts';
import { isMobileDevice } from '../../../helper/helper';
import { aquariumStatus, valueInChatsListInput } from '../../../store/AppSwitches/Action';
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
  const isMobileDeviceBoolean = isMobileDevice();

  const onSaveNameFromInput = (event) => {
    setValueName(event.target.value);
    setError(false);
    setSuccess(false);

    const newChatsListRed = chatsListRed.filter(chat => chat.name.toLowerCase().includes(event.target.value.toLowerCase())).length;

    if (!newChatsListRed) {
      setError('Нет похожих чатов');
    } else if (newChatsListRed && event.target.value !== '') {
      setSuccess(`Совпадений: ${newChatsListRed}`);
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

  const validChatNameLength = (chatName, maxLength) => {
    if (chatName.length <= maxLength) {
      return true
    }
    
    setError(`Максимум ${maxLength} символов`);
    return false
  };

  const validCharactersInTheChatName = (chatName) => {
    const regExp = /^[0-9a-zа-яё_\s(),.[\]{}\-@]+$/i;
    if (regExp.test(chatName)) {
      return true
    }

    setError('Только "цифры, буквы, скобки, @, пробел, _, -, . и ,"');
    return false
  };

  const validStartOfString = (chatName) => {
    const regExp = /^[0-9a-zа-яё\-_]/i;
    if (regExp.test(chatName)) {
      return true
    }

    setError('Нельзя начинать со спец. символов');
    return false
  };

  const validEndOfString = (chatName) => {
    const regExp = /[^,]$/i;
    if (regExp.test(chatName)) {
      return true
    }

    setError('Запятая в конце');
    return false
  };

  const removeSpacesAtTheBeginningAndAtTheEndOfTheString = (chatName) => {
    return chatName.replace(/^\s+|\s+$/g, '')
  };

  const combineSameCharacters = (chatName) => {
    chatName = chatName.replace(/\s+/g, ' ');
    chatName = chatName.replace(/,+/g, ',');
    
    return removeSpacesAtTheBeginningAndAtTheEndOfTheString(chatName)
  };

  const autoClearSuccessAndError = () => {
    const timerId = setTimeout(() => {
      setError(false);
      setSuccess(false);
      
      return clearTimeout(timerId)
    }, 5000);
  }

  const onSubmit = (event) => {
    event.preventDefault(); //* Cancel page reload.
    setError(false);
    setSuccess(false);
    if (valueName !== '') {
      if (
        validChatNameLength(valueName, MAXIMUM_NUMBER_OF_CHARACTERS_FOR_A_CHAT_NAME) 
        && 
        validCharactersInTheChatName(valueName) 
        && 
        validStartOfString(valueName) 
        && 
        validEndOfString(valueName)
      ) {
        const newValueName = combineSameCharacters(valueName);
        if (!(chatsListRed.find((item) => item.name === newValueName))) {
          const newContact = addContact(newValueName);
          dispatch(addInChatsListWithThunkAction(newContact));
          setSuccess(`Чат "${newValueName}" добавлен`);
          resetValue();
        } else {
          setError('Чат уже существует');
        }
      }
    } else {
      setError('Введите название чата');
    }

    autoClearSuccessAndError();
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

    autoClearSuccessAndError();
  };

  const openAquarium = () => {
    dispatch({
        type: aquariumStatus.type,
        payload: true,
    });
};

  useEffect(() => {
    dispatch({
      type: valueInChatsListInput.type,
      payload: valueName,
    });
  }, [dispatch, valueName]);

  return (
    <ChangeChatsListUI classes={classes} onSubmit={onSubmit} onSaveNameFromInput={onSaveNameFromInput} valueName={valueName} deliteContact={deliteContact} errorForProps={errorForProps} successForProps={successForProps} openAquarium={openAquarium} isMobileDeviceBoolean={isMobileDeviceBoolean}></ChangeChatsListUI>
  )
};
