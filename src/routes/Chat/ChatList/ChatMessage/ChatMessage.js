import { useState } from "react";
import { isMobileDevice } from "../../../../helper/helper";
import { ChatMessageUI } from "../../../../ui_components/ChatMessageUI";
import { useStyles } from "../../../../styles/Style";
import { useSelector } from "react-redux";
import { getStatusesInTheAppappThemeIsSelector } from "../../../../store/AppSwitches/Selectors";
import { auth } from "../../../../firebase/firebase";
import { APP_THEMES_NAMES } from "../../../../data/consts";

export const ChatMessage = ({
    item, 
    index, 
    convertStringLinksToWorkingLinks, 
    getLocalDateAndTime, 
    chatListRed, 
    editMessage, 
    deleteMessage,
}) => {
    const classes = useStyles();

    const myEmail = (auth.currentUser !== null ? auth.currentUser.email : null);

    const isMobileDeviceBoolean = isMobileDevice();

    const appThemeSel = useSelector(getStatusesInTheAppappThemeIsSelector);

    const [isShowMessageOptions, setIsShowMessageOptions] = useState(false);

    return (
        <ChatMessageUI 
            classes={classes} 
            item={item} 
            index={index} 
            myEmail={myEmail} 
            isShowMessageOptions={isShowMessageOptions} 
            setIsShowMessageOptions={setIsShowMessageOptions} 
            isMobileDeviceBoolean={isMobileDeviceBoolean} 
            appThemeSel={appThemeSel} 
            convertStringLinksToWorkingLinks={convertStringLinksToWorkingLinks} 
            getLocalDateAndTime={getLocalDateAndTime} 
            chatListRed={chatListRed} 
            editMessage={editMessage} 
            deleteMessage={deleteMessage}
            APP_THEMES_NAMES={APP_THEMES_NAMES}
        ></ChatMessageUI>
    )
};
