import { ListItem } from '@material-ui/core';

export const ChatMessageUI = ({classes, item, index, myEmail, isShowMessageOptions, setIsShowMessageOptions, isMobileDeviceBoolean, appThemeSel, convertStringLinksToWorkingLinks, getLocalDateAndTime, chatListRed, editMessage, deleteMessage, APP_THEMES_NAMES, editableMessage, toggleMessageOptions}) => {
    return (
        <ListItem className={`${classes.chatListItem} ${item.author === myEmail ? classes.chatListItemMe : classes.chatListItemSomebody}`}>
            <div className={`${classes.chatListItemMessage} ${editableMessage === item ? classes.chatListItemMessageEditable : ''} ${item.author === myEmail ? classes.chatListItemMessageMe : `${classes.chatListItemMessageSomebody} ${appThemeSel && appThemeSel.themeNameEn ? (appThemeSel.themeNameEn === APP_THEMES_NAMES.theme_2.nameEn ? classes.chatListItemMessageSomebody_darkTheme : appThemeSel.themeNameEn === APP_THEMES_NAMES.theme_3.nameEn ? classes.chatListItemMessageSomebody_greyTheme : appThemeSel.themeNameEn === APP_THEMES_NAMES.theme_4.nameEn ? classes.chatListItemMessageSomebody_sunnyTheme : null) : null}`}`}>
                <p className={`${classes.chatListItemMessageAuthor} ${isMobileDeviceBoolean ? classes.chatListItemMessageAuthorMobileDevice : null}`}>[{item.author}]:</p>
                {
                    item.imgSrc
                    &&
                    <div className={classes.chatListItemMessageImgWrapper}>
                        <img className={classes.chatListItemMessageImg} src={item.imgSrc} alt='img'></img>
                    </div>
                }
                <div className={`${classes.chatListItemMessageTextWrapper}`}>
                    <p className={`${classes.chatListItemMessageText} ${isMobileDeviceBoolean ? classes.chatListItemMessageTextMobileDevice : null}`} dangerouslySetInnerHTML={{__html: convertStringLinksToWorkingLinks(item.text)}}></p>
                </div>
                <p className={`${classes.chatListItemMessageDateAndTime} ${isMobileDeviceBoolean ? classes.chatListItemMessageDateAndTimeMobileDevice : null}`}>{item.messageUTCDateAndTime ? getLocalDateAndTime(item.messageUTCDateAndTime) : 'Нет данных'}</p>
                {
                    index === chatListRed.length - 1
                    &&
                    item.author === myEmail
                    &&
                    item.messageId
                    &&
                    <div className={`${classes.chatListItemMessageIconsWrapper}`}>
                        {
                            isShowMessageOptions
                            &&
                            <>
                                <div className={`${classes.chatListItemMessageIcon} ${classes.chatListItemMessageIconEdit}`} onClick={() => editMessage(item)}>&#9998;</div>
                                <div className={`${classes.chatListItemMessageIcon} ${classes.chatListItemMessageIconCross}`} onClick={() => deleteMessage(item)}>&#10060;</div>
                            </>
                        }
                        <div className={`${classes.chatListItemMessageIcon}`} onClick={toggleMessageOptions}>М</div>
                    </div>
                }
            </div>
        </ListItem>
    )
};
