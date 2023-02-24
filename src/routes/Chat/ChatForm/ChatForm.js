import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageInChatListWithThunkAction } from '../../../store/ChatList/Action';
import { getChatsListChatsKindOfDictSelector } from '../../../store/ChatsList/Selectors';
import { getChatListMessagesSelector } from '../../../store/ChatList/Selectors';
import { useStyles } from '../../../styles/Style';
import { ChartFormUI } from '../../../ui_components/ChatFormUI.jsx';
import { auth } from '../../../firebase/firebase';
import { autoEditInputText, getKeyForTheChatByChatId, isMobileDevice } from '../../../helper/helper';

export const ChartForm = () => {
  const classes = useStyles();

  const maxImgSizeForMessage = 26214400;

  const isMobileDeviceBoolean = isMobileDevice();

  const inputMinHeight = 32;
  const inputMaxHeight = 90;

  const [value, setValue] = useState('');
  const [inputHeight, setInputHeight] = useState(inputMinHeight);
  const [imgSrcForSendMessage, setImgSrcForSendMessage] = useState('');
  const [imgError, setImgError] = useState('');

  const refInput = useRef(null);
  const refImgBtn = useRef(null);

  const { chatId } = useParams();

  const chatsListChatsKindOfDictRed = useSelector(getChatsListChatsKindOfDictSelector);
  const openChatKey = getKeyForTheChatByChatId(chatsListChatsKindOfDictRed, chatId);
  const openContact = chatsListChatsKindOfDictRed[openChatKey];

  const chatListMessagesRed = useSelector(getChatListMessagesSelector);

  const author = (auth.currentUser !== null ? auth.currentUser.email : null);

  const dispatch = useDispatch();

  const resetInputHeight = () => {
    if (refInput) {
      setInputHeight(`${inputMinHeight}px`);
    }
  };

  const onSaveValueFromInput = (event) => {
    setValue(event.target.value);

    resetInputHeight();
  };

  useEffect(() => {
    if (refInput.current.scrollHeight < inputMaxHeight) {
      setInputHeight(`${refInput.current.scrollHeight}px`);
    } else {
      setInputHeight(`${inputMaxHeight}px`)
    }
  }, [value]);

  const resetValue = () => {
    setValue('');

    resetInputHeight();
  };

  const resetAttachPicture = () => {
    setImgError('');
    setImgSrcForSendMessage('');
    refImgBtn.current.value = '';
  };

  const onSubmit = (event) => {
    event.preventDefault(); //* Cancel page reload.
    if (value !== '' || imgSrcForSendMessage !== '') {
      const now = new Date();
      const messageUTCDateAndTime = now.toUTCString();
      const newMessage = autoEditInputText(value, classes);
      dispatch(addMessageInChatListWithThunkAction(openChatKey, openContact.name, openContact.id, newMessage, imgSrcForSendMessage, author, messageUTCDateAndTime));
      resetValue();
      resetAttachPicture();
    }
  };

  const focusOnInput = () => {
    refInput.current.focus();
  };

  const attachPictures = (event) => {
    const attachImages = event.target.files;

    if (attachImages.length > 0) {
      const attachImage = attachImages[0];

      const fileType = attachImage.type.split('/')[0];

      if (fileType === 'image' && attachImage.size <= maxImgSizeForMessage) {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
          const imgSrc = e.target.result;
  
          setImgSrcForSendMessage(imgSrc);
        }
  
        fileReader.readAsDataURL(attachImage);
      } else {
        resetAttachPicture();

        if (fileType !== 'image') {
          setImgError('Только картинки!');
        }

        if (attachImage.size > maxImgSizeForMessage) {
          setImgError(`Не более ${maxImgSizeForMessage / 1024}Кб.\nТекущий размер: ${(attachImage.size / 1024).toFixed(2)}Кб.`);
        }
      }
    }
  };

  useEffect(() => {
    focusOnInput();
  }, [chatListMessagesRed]); 

  useEffect(() => {
    return () => {
      setImgSrcForSendMessage('');
    }
  }, []);

  return (
    <ChartFormUI classes={classes} onSubmit={onSubmit} refInput={refInput} onSaveValueFromInput={onSaveValueFromInput} value={value} inputHeight={inputHeight} inputMinHeight={inputMinHeight} isMobileDeviceBoolean={isMobileDeviceBoolean} attachPictures={attachPictures} imgSrcForSendMessage={imgSrcForSendMessage} resetAttachPicture={resetAttachPicture} refImgBtn={refImgBtn} imgError={imgError}></ChartFormUI>
  )
};
