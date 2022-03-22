import React from 'react';

export const ProfileUI = (props) => {
    return (
        <div>
            <h1>{props.componentTitle}</h1>
            <input type='checkbox' checked={props.isChecked} onChange={props.toggleChecked} />
            <p>
                <span>Мой Email: </span>
                {props.myEmailForProps}
            </p>
            <p>Страница еще не готова! Развитие этой страницы предполагается в дальнейшем.</p>
            {
                props.eventForPWAInstallationSel 
                ? 
                <div id="installContainer">
                    <button id="butInstall" type="button" onClick={props.installApp}>Установить</button>
                </div>
                : 
                null
            }
        </div>
    )
};
