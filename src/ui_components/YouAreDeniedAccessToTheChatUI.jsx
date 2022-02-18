import React from 'react';

export const YouAreDeniedAccessToTheChatUI = (props) => {
    return (
        <div className={props.classes.youAreDeniedAccessToTheChat_field}>
            <div className={props.classes.youAreDeniedAccessToTheChat_wrapper}>
                <div className={props.classes.youAreDeniedAccessToTheChat_wrapperInfo}>
                    <p className={`${props.classes.youAreDeniedAccessToTheChat_textInfo} ${props.classes.youAreDeniedAccessToTheChat_textInfo__first} ${props.classes.popUpWindowQuestion} ${props.isMobileDeviceBoolean ? props.classes.popUpWindowQuestion_mobileDevice : null}`}>Это приватный чат!</p>
                    <p className={`${props.classes.youAreDeniedAccessToTheChat_textInfo} ${props.classes.popUpWindowQuestion} ${props.isMobileDeviceBoolean ? props.classes.popUpWindowQuestion_mobileDevice : null}`}>Введите пароль:</p>
                </div>
                <input className={`${props.classes.youAreDeniedAccessToTheChat_input} ${props.isMobileDeviceBoolean ? props.classes.youAreDeniedAccessToTheChat_wrapper_input_mobileDevice : null}`} inputref={props.refInput} placeholder="Пароль" label="Пароль" type="text" onChange={props.onSavePasswordValueFromInput} value={props.passwordValue} />
                {
                    props.error
                    ? 
                    <div className={props.classes.youAreDeniedAccessToTheChat_errorWrapper}>
                        <p className={props.classes.youAreDeniedAccessToTheChat_errorText}>{props.error}</p>
                    </div>
                    :
                    null
                }
                <div className={props.classes.popUpWindowAction}>
                    <button className={`${props.classes.youAreDeniedAccessToTheChat_btn} ${props.classes.popUpWindowBtn} ${props.isMobileDeviceBoolean ? props.classes.popUpWindowBtn_mobileDevice : null}`} onClick={props.registerToChat}>Ввести пароль</button>
                    <button className={`${props.classes.youAreDeniedAccessToTheChat_btn} ${props.classes.popUpWindowBtn} ${props.isMobileDeviceBoolean ? props.classes.popUpWindowBtn_mobileDevice : null}`} onClick={props.resetPasswordInInput}>Сбросить</button>
                </div>
            </div>
        </div>
    )
};
