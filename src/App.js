import React, { useState, useEffect } from 'react';
import './styles/App.css';

export const App = () => {
  const [messageList, setMessageList] = useState([]);
  const [value, setValue] = useState('');
  const [key, setKey] = useState(0);

  const onSaveValueFromInput = (event) => {
    setValue(event.target.value);
  };

  const nextKey = () => {
    setKey(key + 1);
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
        nextKey();
        const userMessage = {
            id: key,
            author: 'User',
            text: value,
        };
        sendMessage(userMessage);
        resetValue();
    }
  };

  useEffect(() => {
      if (messageList != false) {
        const timerId = setTimeout(() => {
            const listLastElement = messageList[messageList.length - 1];
            if (listLastElement.author !== 'bot') {
                nextKey();
                const botMessage = {
                    id: key,
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
    <div className='app'>
      <form className='app__form' onSubmit={onSubmit}>
        <input className='app__form_input' type="text" onChange={onSaveValueFromInput} value={value} />
        <button className='app__form_btn'>Отправить</button>
      </form>
      <ul className='app__ul'>
          {
            messageList.map((item) => <li className='app__ul_li' key={item.id}>{item.author}: {item.text}</li>)
          }
      </ul>
    </div>
  );
};
