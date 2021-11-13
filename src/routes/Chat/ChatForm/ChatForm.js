import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageInChatListWithThunkAction } from '../../../store/ChatList/Action';
import { getChatsListRootSelector } from '../../../store/ChatsList/Selectors';
import { getChatListMessagesSelector } from '../../../store/ChatList/Selectors';
// import { BOT_NAME } from '../../../data/consts';
import { Box, InputBase, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useStyles } from '../../../styles/Style';

export const ChartForm = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const refInput = useRef(null);

  const { chatId } = useParams();
  const chatsListRed = useSelector(getChatsListRootSelector);
  const [openContact] = chatsListRed.filter((item) => item.id === chatId);

  const chatListRed = useSelector(getChatListMessagesSelector);

  const dispatch = useDispatch();

  const onSaveValueFromInput = (event) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    setValue('');
  };

  // const sendMessage = (author, text, chatId) => {
  //   const somebodyMessage = {
  //     message: {author: author, text: text},
  //     chatId: chatId,
  //   };
  //   return somebodyMessage
  // };

  const onSubmit = (event) => {
    event.preventDefault(); //* Cancel page reload.
    if (value !== '') {
        // const userMessage = sendMessage(openContact.name, value, openContact.id);
        // dispatch(addMessageInChatListAction(userMessage));
        dispatch(addMessageInChatListWithThunkAction(openContact.name, value, openContact.id));
        scrollDown();
        resetValue();
    }
  };

const scrollDown = () => {
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight,
  );

  window.scrollTo(0, scrollHeight);
};

// const botResponse = () => {
//   const listLastElement = chatListRed[chatId][chatListRed[chatId].length - 1];
//   if (listLastElement.author !== 'bot') {
//     const botMessage = sendMessage('bot', `Ok, ${openContact.name}, принято!`, openContact.id);
//     dispatch(addMessageInChatListAction(botMessage))
//   };
// };

// useEffect(() => {
//   scrollDown();
//   if (Object.entries(chatListRed).length !== 0) {
//     const timerId = setTimeout(() => {
//       botResponse();
//     }, 1500);

//     return () => {clearTimeout(timerId)}
//   };
// }, [chatListRed]);

  // const focusOnInput = () => {
  //   if (Object.entries(chatListRed).length === 0 || chatListRed[chatId][chatListRed[chatId].length - 1].author !== BOT_NAME) {
  //     refInput.current.focus();
  //   }
  // };

  const focusOnInput = () => {
      refInput.current.focus();
  };

  useEffect((() => {
    focusOnInput();
  }),[chatListRed]); 

    return (
        <Box className={classes.form} component='form' onSubmit={onSubmit}>
          <InputBase className={classes.input} inputRef={refInput} placeholder="Сообщение" label="Сообщение" type="text" onChange={onSaveValueFromInput} value={value} />
          <IconButton type='submit'>
            <Send />
          </IconButton>
        </Box>
    )
};
