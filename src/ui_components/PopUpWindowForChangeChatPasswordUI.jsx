import React from 'react';

export const PopUpWindowForChangeChatPasswordUI = (props) => {
    return (
        <div className={`${props.classes.popUpWindow} ${props.isMobileDeviceBoolean ? props.classes.popUpWindow_mobileDevice : null}`}>
            <p className={`${props.classes.popUpWindowQuestion} ${props.isMobileDeviceBoolean ? props.classes.popUpWindowQuestion_mobileDevice : null}`}>Установить пароль для чата?{props.chatPassword ? ` Внимание! Всем пользователям этого чата придется вводить пароль заново. Прежний пароль: ${props.chatPassword}` : null}</p>
            <input className={`${props.classes.popUpWindowInput} ${props.classes.popUpWindowForChangeChatPasswor_input} ${props.isMobileDeviceBoolean ? props.classes.popUpWindowForChangeChatPasswor_input_mobileDevice : null}`} inputref={props.refInput} placeholder="Пароль" label="Пароль" type="text" onChange={props.onSavePasswordValueFromInput} value={props.passwordValue} />
            {
                props.errorPassword 
                ? 
                <div className={props.classes.popUpWindowForChangeChatPasswor_errorWrapper}>
                    <p className={props.classes.popUpWindowForChangeChatPasswor_errorText}>{props.errorPassword}</p>
                </div>
                : 
                null
            }
            <div className={props.classes.popUpWindowAction}>
                <button className={`${props.classes.popUpWindowBtn} ${props.isMobileDeviceBoolean ? props.classes.popUpWindowBtn_mobileDevice : null}`} onClick={props.changeChatPassword}>Установить</button>
                <button className={`${props.classes.popUpWindowBtn} ${props.isMobileDeviceBoolean ? props.classes.popUpWindowBtn_mobileDevice : null}`} onClick={props.closePopUpWindowForChangeChatPassword}>Отмена</button>
            </div>
        </div>
    )
};
