import React from 'react';
import { ChatList } from '../routes/Chat/ChatList/ChatList';
import { ChartForm } from '../routes/Chat/ChatForm/ChatForm';
import { Box } from '@material-ui/core';
import { ChatControlPanel } from '../routes/Chat/ChatControlPanel/ChatControlPanel';
import { YouAreDeniedAccessToTheChat } from '../routes/Chat/YouAreDeniedAccessToTheChat/YouAreDeniedAccessToTheChat';

export const ChatUI = (props) => {
    return (
        <Box className={`${props.classes.chat} ${props.isMobileDeviceBoolean ? props.classes.chatMobileDevice : null} ${props.appThemeSel && props.appThemeSel.themeNameEn ? (props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_2.nameEn ? props.classes.chat_darkTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_3.nameEn ? props.classes.chat_greyTheme : props.appThemeSel.themeNameEn === props.APP_THEMES_NAMES.theme_4.nameEn ? props.classes.chat_sunnyTheme : null) : null}`}>
            <div className={props.classes.chatUpPart}>
                <ChatControlPanel></ChatControlPanel>
            </div>
            <div className={props.classes.chatDownPart}>
                {
                    (
                        !props.privateChat 
                        || 
                        props.canIReadThisChatBoolean
                    ) 
                    ? 
                    <>
                        <ChatList inputValue={props.inputValue} setInputValue={props.setInputValue} editableMessage={props.editableMessage} setEditableMessage={props.setEditableMessage} focusOnInput={props.focusOnInput} refOpenChat={props.refOpenChat} scrollDown={props.scrollDown}></ChatList>
                        <ChartForm inputValue={props.inputValue} setInputValue={props.setInputValue} editableMessage={props.editableMessage} setEditableMessage={props.setEditableMessage} refInput={props.refInput} focusOnInput={props.focusOnInput} scrollDown={props.scrollDown}></ChartForm>
                    </>
                    : 
                    <YouAreDeniedAccessToTheChat></YouAreDeniedAccessToTheChat>
                }
            </div>
        </Box>
    )
};
