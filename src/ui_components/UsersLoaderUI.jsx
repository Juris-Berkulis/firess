import React from 'react';

export const UsersLoaderUI = (props) => {
    return (
        <div className={props.classes.users_loader__field}>
            <div className={props.classes.users_loader__center}>
                <h2 className={props.classes.users_loader__text}>Загрузка данных...</h2>
                <img className={`${props.classes.users_loader__img} ${props.ismobileDeviceProps ? props.classes.users_loader__img__mobile_device : null}`} src={props.preloader} alt='preloader' width='200px' />
            </div>
        </div>
    )
};
