import React from 'react';

export const ChatControlPanelUI = (props) => {
    return (
        <div className={props.classes.chatControlPanel}>
            <div className={`${props.classes.chatControlPanelLeftPart} ${props.isMobileDeviceBoolean ? props.classes.chatControlPanelLeftPart_mobileDevice : null}`}>
                {
                    (
                        props.openContact.chatPassword 
                        && 
                        props.openContact.chatPassword !== ''
                    ) 
                    ? 
                    <div className={props.classes.chatControlPanelIconsWrapper}>
                        <span className={props.classes.chatControlPanelIcon}>
                            {
                                Object.values(props.openContact.theyCanReadThisChat).find((itemUID) => itemUID === props.myUID) 
                                ? 
                                <span className={props.classes.chatControlPanelIPrivatChatIcon}>&#128273;</span>
                                : 
                                <span className={props.classes.chatControlPanelIPrivatChatIcon}>&#128274;</span>
                            }
                        </span>
                    </div>
                    : 
                    null
                }
                <p className={`${props.classes.chatControlPanelName} ${props.isMobileDeviceBoolean ? props.classes.chatControlPanelName_mobileDevice : null}`}>{props.openContact.name}</p>
            </div>
            <div className={props.classes.chatControlPanelRightPart}>
                {
                    (
                        props.myUID !== null 
                        && 
                        props.openContact.chatAuthor === props.myUID
                    )
                    ? 
                    <>
                        <div className={props.classes.chatControlPanelMenu}>
                            <button className={`${props.classes.chatControlPanelBtn} ${props.isMobileDeviceBoolean ? props.classes.chatControlPanelBtn_mobileDevice : null}`} onClick={props.openPopUpWindow}>&#128465;</button>
                        </div>
                        <div className={props.classes.chatControlPanelMenu}>
                            <button className={`${props.classes.chatControlPanelBtn} ${props.isMobileDeviceBoolean ? props.classes.chatControlPanelBtn_mobileDevice : null} ${props.classes.chatControlPanelBtn__changeChatPassword}`} onClick={props.openPopUpWindowForChangeChatPassword}>&#9998;</button>
                        </div>
                    </>
                    : 
                    null
                }
                <button className={`${props.classes.chatControlPanelBtn} ${props.isMobileDeviceBoolean ? props.classes.chatControlPanelBtn_mobileDevice : null}`} onClick={props.closeChat}>&#10060;</button>
            </div>
        </div>
    )
};
