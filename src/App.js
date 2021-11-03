import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from './routes/Header/Header';
import { Home } from './routes/Home/Home';
import { Profile } from './routes/Profile/Profile';
import { ChatsList } from './routes/ChatsList/ChatsList';
import { Chat } from './routes/Chat/Chat';
import { Error404 } from './routes/Error404/Error404';
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
    <Switch>
      <>
        <Header></Header>
        <Box mx='10vw' p={1}>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/profile'>
            <Profile></Profile>
          </Route>
          <Route path='/messenger'>
            <Box display="flex" justifyContent="space-between" bgcolor="trancend" color="white">
              <ChatsList></ChatsList>
              <Route path='/messenger/error404'>
                <Error404></Error404>
              </Route>
              <Route path='/messenger/:chatId'>
                <Chat sendMessage={sendMessage} nextKey={nextKey} messageList={messageList}></Chat>
              </Route>
            </Box>
          </Route>
        </Box>
      </>
    </Switch>
  );
};
