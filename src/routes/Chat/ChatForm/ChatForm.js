import React, { useState, useEffect, useRef } from 'react';
import { Box, InputBase, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useStyles } from '../../../styles/Style';

export const ChartForm = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const refInput = useRef(null);

  const onSaveValueFromInput = (event) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    setValue('');
  };

  const onSubmit = (event) => {
    event.preventDefault(); //* Cancel page reload.
    if (value !== '') {
        const moment = props.nextKey();
        const userMessage = {
            id: moment,
            author: 'User',
            text: value,
        };
        props.sendMessage(userMessage);
        resetValue();
    }
  };

  const focusOnInput = () => {
    if (props.messageList.length === 0 || props.messageList[props.messageList.length - 1].author !== 'bot') {
      refInput.current.focus();
    }
  };

  useEffect((() => {
    focusOnInput();
  }),[props.messageList]); 

    return (
        <Box className={classes.form} component='form' onSubmit={onSubmit}>
          <InputBase className={classes.input} inputRef={refInput} placeholder="Сообщение" label="Сообщение" type="text" onChange={onSaveValueFromInput} value={value} />
          <IconButton type='submit'>
            <Send />
          </IconButton>
        </Box>
    )
};
