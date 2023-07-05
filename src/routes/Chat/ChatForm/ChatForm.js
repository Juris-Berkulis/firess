import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageInChatListWithThunkAction } from '../../../store/ChatList/Action';
import { getChatsListChatsKindOfDictSelector } from '../../../store/ChatsList/Selectors';
import { useStyles } from '../../../styles/Style';
import { ChartFormUI } from '../../../ui_components/ChatFormUI.jsx';
import { auth } from '../../../firebase/firebase';
import { autoEditInputText, getKeyForTheChatByChatId, isMobileDevice } from '../../../helper/helper';

export const ChartForm = ({
  refInput, 
  inputValue, 
  setInputValue, 
  editableMessage, 
  setEditableMessage, 
  focusOnInput, 
  scrollDown
}) => {
  const classes = useStyles();

  const maxImgSizeForMessage = 1048576;

  const isMobileDeviceBoolean = isMobileDevice();

  const inputMinHeight = 32;
  const inputMaxHeight = 90;

  const [inputHeight, setInputHeight] = useState(inputMinHeight);
  const [imgSrcForSendMessage, setImgSrcForSendMessage] = useState('');
  const [imgError, setImgError] = useState('');

  const refImgBtn = useRef(null);

  const { chatId } = useParams();

  const chatsListChatsKindOfDictRed = useSelector(getChatsListChatsKindOfDictSelector);
  const openChatKey = getKeyForTheChatByChatId(chatsListChatsKindOfDictRed, chatId);
  const openContact = chatsListChatsKindOfDictRed[openChatKey];

  const author = (auth.currentUser !== null ? auth.currentUser.email : null);

  const dispatch = useDispatch();

  const resetInputHeight = () => {
    if (refInput) {
      setInputHeight(`${inputMinHeight}px`);
    }
  };

  const onSaveValueFromInput = (event) => {
    setInputValue(event.target.value);

    resetInputHeight();
  };

  useEffect(() => {
    if (refInput.current.scrollHeight < inputMaxHeight) {
      setInputHeight(`${refInput.current.scrollHeight}px`);
    } else {
      setInputHeight(`${inputMaxHeight}px`)
    }
  }, [inputValue, refInput]);

  const resetValue = () => {
    setInputValue('');

    resetInputHeight();
  };

  const resetAttachPicture = () => {
    setImgError('');
    setImgSrcForSendMessage('');
    refImgBtn.current.value = '';
  };

  const onSubmit = (event) => {
    event.preventDefault(); //* Cancel page reload.
    if (inputValue.trim() !== '' || imgSrcForSendMessage !== '') {
      let message = null;

      if (editableMessage) {
        editableMessage.text = autoEditInputText(inputValue, classes);

        message = editableMessage;

        setEditableMessage(null);
      } else {
        const now = new Date();
        const messageUTCDateAndTime = now.toUTCString();
        const newMessage = autoEditInputText(inputValue, classes);
        const messageId = `${now.getTime()}--${author.split('.').join(',')}`;

        message = {
          contactKey: openChatKey, 
          contactName: openContact.name, 
          contactId: openContact.id, 
          text: newMessage, 
          imgSrc: imgSrcForSendMessage, 
          author, 
          messageUTCDateAndTime, 
          messageId,
        };
      }

      dispatch(addMessageInChatListWithThunkAction(message));
      resetValue();
      resetAttachPicture();
    }

    focusOnInput();
    scrollDown();
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
          setImgError(`Не более ${maxImgSizeForMessage / 1024 / 1024}Мб.\nТекущий размер: ${(attachImage.size / 1024 / 1024).toFixed(2)}Мб.`);
        }
      }
    }
  };

  useEffect(() => {
    focusOnInput();
  }, [focusOnInput]);

  useEffect(() => {
    return () => {
      setImgSrcForSendMessage('');
    }
  }, []);

  return (
    <ChartFormUI classes={classes} onSubmit={onSubmit} refInput={refInput} onSaveValueFromInput={onSaveValueFromInput} value={inputValue} inputHeight={inputHeight} inputMinHeight={inputMinHeight} isMobileDeviceBoolean={isMobileDeviceBoolean} attachPictures={attachPictures} imgSrcForSendMessage={imgSrcForSendMessage} resetAttachPicture={resetAttachPicture} refImgBtn={refImgBtn} imgError={imgError}></ChartFormUI>
  )
};
