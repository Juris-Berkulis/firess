import React, { useState, useEffect } from 'react';
import { Chat } from './routes/Chat/Chat';
import { ChatsList } from './routes/ChatsList/ChatsList';
import { Box } from '@material-ui/core';

export const App = () => {
  const [messageList, setMessageList] = useState([]);

  const nextKey = () => {
    const now = new Date().getTime();
    return now
  };

  const sendMessage = (objectMessage) => {
        const newMessagesList = [...messageList, objectMessage];
        setMessageList(newMessagesList);
  };

  const scrollDown = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight,
    );

    window.scrollTo(0, scrollHeight);
  };

  const botResponse = () => {
    const listLastElement = messageList[messageList.length - 1];
    if (listLastElement.author !== 'bot') {
      const moment = nextKey();
        const botMessage = {
            id: moment,
            author: 'bot',
            text: `Ok, ${listLastElement.author}, принято!`,
        };
        sendMessage(botMessage);
    };
  };

  useEffect(() => {
    scrollDown();
    if (messageList.length !== 0) {
      const timerId = setTimeout(() => {
        botResponse();
      }, 1500);

      return () => {clearTimeout(timerId)}
    };
  }, [messageList]);

  return (
    <Box display="flex" justifyContent="space-between" mx='10vw' p={1} bgcolor="trancend" color="white">
      <ChatsList></ChatsList>
      <Chat sendMessage={sendMessage} nextKey={nextKey} messageList={messageList}></Chat>
    </Box>
  );
};
