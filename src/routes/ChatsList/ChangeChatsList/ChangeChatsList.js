import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APP_THEMES_NAMES, MAXIMUM_NUMBER_OF_CHARACTERS_FOR_A_CHAT_NAME, allAppComponentsWithPageTitle } from '../../../data/consts';
import { auth } from '../../../firebase/firebase';
import { getKeyForTheChatByChatName, isMobileDevice } from '../../../helper/helper';
import { aquariumStatus, isStrictSearchAction, onlySelectedChats, valueInChatsListInput } from '../../../store/AppSwitches/Action';
import { getStatusesInTheAppappThemeIsSelector, getStatusesInTheAppChatsCountSelectedSelector, getStatusesInTheAppIsStrictSearchSelector, getStatusesInTheAppOnlySelectedChatsBooleanSelector } from '../../../store/AppSwitches/Selectors';
import { removeAllMessagesInDeleteChatWithThunkAction } from '../../../store/ChatList/Action';
import { addInChatsListWithThunkAction, deleteSecretIntoAboutDeletedChatWithThunkAction, removeFromChatsListWithThunkAction } from '../../../store/ChatsList/Action';
import { getChatsListChatsKindOfDictSelector, getChatsListChatsKindOfListSelector } from '../../../store/ChatsList/Selectors';
import { useStyles } from '../../../styles/Style';
import { ChangeChatsListUI } from '../../../ui_components/ChangeChatsListUI.jsx';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const ChangeChatsList = () => {
  const classes = useStyles();
  const [valueName, setValueName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const history = useHistory();
  const myUID = auth.currentUser !== null ? auth.currentUser.uid : null;
  const errorForProps = error ? <p className={`${classes.chatsListActionResaltInfo} ${classes.chatsListActionResaltInfo_attention}`}>{error}</p> : null
  const successForProps = success ? <p className={`${classes.chatsListActionResaltInfo} ${classes.chatsListActionResaltInfo_success}`}>{success}</p> : null

  const dispatch = useDispatch();

  const chatsListChatsKindOfDictRed = useSelector(getChatsListChatsKindOfDictSelector);
  const chatsListRed = useSelector(getChatsListChatsKindOfListSelector);
  const appThemeSel = useSelector(getStatusesInTheAppappThemeIsSelector);
  const onlySelectedChatsSel = useSelector(getStatusesInTheAppOnlySelectedChatsBooleanSelector);
  const chatsCountSelectedSel = useSelector(getStatusesInTheAppChatsCountSelectedSelector);
  const isStrictSearchSel = useSelector(getStatusesInTheAppIsStrictSearchSelector);

  const isMobileDeviceBoolean = isMobileDevice();

  const refInput = useRef(null);

  const showSimilarChatsCount = useCallback(() => {
    if (chatsCountSelectedSel === 0) {
      setError('Нет похожих чатов');
    } else if (chatsCountSelectedSel !== 0) {
      setSuccess(`Совпадений: ${chatsCountSelectedSel}`);
    }
  }, [chatsCountSelectedSel]);

  const onSaveNameFromInput = (event) => {
    setValueName(event.target.value);
    setError(false);
    setSuccess(false);

    if (event.target.value !== '') {
      showSimilarChatsCount();
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
    const chatAuthor = auth.currentUser !== null ? auth.currentUser.uid : null;
    const newContact = {
      id: now,
      chatAuthor: chatAuthor,
      name: newName,
      theyLikeThisChat: {
        [myUID]: myUID,
      },
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

  const onSubmit = (event) => {
    event.preventDefault();
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
          setSuccess(`Чат "${newValueName}" создан`);
          resetValue();
          history.push(`${allAppComponentsWithPageTitle.messenger.path}/${newContact.id}`);
        } else {
          setError('Чат уже существует');
        }
      }
    } else {
      setError('Введите название чата');
    }
  };

  const deliteContact = () => {
    setError(false);
    setSuccess(false);
    if (valueName !== '') {
      const delChatsListRedKey = getKeyForTheChatByChatName(chatsListChatsKindOfDictRed, valueName);
      if (delChatsListRedKey) {
        if ((chatsListChatsKindOfDictRed[delChatsListRedKey]['chatAuthor'] && chatsListChatsKindOfDictRed[delChatsListRedKey]['chatAuthor'] === auth.currentUser.uid) || !chatsListChatsKindOfDictRed[delChatsListRedKey]['chatAuthor']) {
          dispatch(removeFromChatsListWithThunkAction(delChatsListRedKey));
          dispatch(removeAllMessagesInDeleteChatWithThunkAction(delChatsListRedKey));
          dispatch(deleteSecretIntoAboutDeletedChatWithThunkAction(chatsListChatsKindOfDictRed[delChatsListRedKey]['id']));
          const deleteChat = valueName;
          setSuccess(`Чат "${deleteChat}" удален`);
          resetValue();
        } else {
          setError('Чаты могут удалять только их авторы');
        }
      } else {
        setError('Чат не найден');
      }
    } else {
      setError('Введите название чата');
    }
  };

  const openAquarium = () => {
    dispatch({
        type: aquariumStatus.type,
        payload: true,
    });
  };

  const changeStatusOnAllChatsOrOnlySelectedChats = () => {
    dispatch({
      type: onlySelectedChats.type,
      payload: !onlySelectedChatsSel,
    });
  };

  const focusOnInput = () => {
    refInput.current.focus();
  };

  const changeChatsSearchMode = () => {
    dispatch({
      type: isStrictSearchAction.type,
      payload: !isStrictSearchSel,
    });

    focusOnInput();
  };

  const isStrictSearchForProps = valueName ? <div onClick={() => changeChatsSearchMode()} className={`${classes.changeChatsSearchMode} ${success && !error && classes.changeChatsSearchMode_success} ${!success && error && classes.changeChatsSearchMode_attention}`}>{isStrictSearchSel ? 'Строгий поиск' : 'Не строгий поиск'}</div> : null;

  useEffect(() => {
    dispatch({
      type: valueInChatsListInput.type,
      payload: valueName,
    });
  }, [dispatch, valueName]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (valueName === '') {
        setError(false);
        setSuccess(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timerId)
    }
  }, [valueName]);

  useEffect(() => {
    if (valueName !== '') {
      setError(false);
      setSuccess(false);

      showSimilarChatsCount();
    }
  }, [chatsCountSelectedSel, showSimilarChatsCount, valueName]);

  return (
    <ChangeChatsListUI classes={classes} onSubmit={onSubmit} onSaveNameFromInput={onSaveNameFromInput} valueName={valueName} deliteContact={deliteContact} errorForProps={errorForProps} successForProps={successForProps} openAquarium={openAquarium} isMobileDeviceBoolean={isMobileDeviceBoolean} appThemeSel={appThemeSel} APP_THEMES_NAMES={APP_THEMES_NAMES} onlySelectedChatsSel={onlySelectedChatsSel} changeStatusOnAllChatsOrOnlySelectedChats={changeStatusOnAllChatsOrOnlySelectedChats} isStrictSearchForProps={isStrictSearchForProps} refInput={refInput}></ChangeChatsListUI>
  )
};
