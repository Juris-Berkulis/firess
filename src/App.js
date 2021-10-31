import React, { useState, useEffect, useRef } from 'react';
import { List, ListItem, Box, InputBase, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Send } from '@material-ui/icons';
import {CHAT_LIST as chatList} from './data/chat list'

const useStyles = makeStyles({
  allChatsListItem: {
    marginBottom: '0.1vh',
    color: '#dddddd',
    fontSize: '36px',
  },
  chat: {
    width: '60vw',
    minHeight: '77vh',
    margin: '0',
    backgroundColor: '#88bbdd',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '5vh 5vw',
    borderRadius: '5vw',
  },
  form: {
    height: '5vh',
    width: '100%',
    minHeight: '25px',
    display: 'flex',
    borderBottom: '1px solid #333333'
  },
  input: {
    width: '20px',
    flexGrow: 1,
    borderRight: 'none',
    outline: 'none',
  },
  chatList: {
    width: '100%',
  },
  chatListItem: {
    marginTop: '1vh',
    color: '#555555',
    fontSize: '24px',
  },
});

export const App = () => {
  const classes = useStyles();

  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');

  const refInput = useRef(null);

  const onSaveValueFromInput = (event) => {
    setValue(event.target.value);
  };

  const nextKey = () => {
    const now = new Date().getTime();
    return now
  };

  const sendMessage = (objectMessage) => {
        const newMessagesList = [...messageList, objectMessage];
        setMessageList(newMessagesList);
  };

  const resetValue = () => {
    setValue('');
  };

  const onSubmit = (event) => {
    event.preventDefault(); //* Cancel page reload.
    if (value !== '') {
        const moment = nextKey();
        const userMessage = {
            id: moment,
            author: 'User',
            text: value,
        };
        sendMessage(userMessage);
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

  useEffect((() => {
    scrollDown();
  }), [messageList]);

  useEffect((() => {
    if (messageList.length === 0 || messageList[messageList.length - 1].author !== 'bot') {
      refInput.current.focus();
    }
  }),[messageList]);

  useEffect(() => {
      if (messageList.length !== 0) {
        const timerId = setTimeout(() => {
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
        }, 1500);

        return () => {clearTimeout(timerId)}
      };
  }, [messageList]);

  return (
    <Box display="flex" justifyContent="space-between" mx='10vw' p={1} bgcolor="trancend" color="white">
      <List component="nav">
        {
          chatList.map((item) => <ListItem className={classes.allChatsListItem} button key={item.id}>{item.name}</ListItem>)
        }
      </List>
      <Box className={classes.chat}>
        <List className={classes.chatList}>
          {
            messageList.map((item) => <ListItem className={classes.chatListItem} key={item.id}>{item.author}: {item.text}</ListItem>)
          }
        </List>
        <Box className={classes.form} component='form' onSubmit={onSubmit}>
          <InputBase className={classes.input} inputRef={refInput} placeholder="Сообщение" label="Сообщение" type="text" onChange={onSaveValueFromInput} value={value} />
          <IconButton type='submit'><Send /></IconButton>
        </Box>
      </Box>
    </Box>
  );
};
