import React from 'react';

export const PreloaderUI = (props) => {
    return (
        <div className={props.classes.preloader__field}>
            <div className={props.classes.preloader__center}>
                <h1 className={props.classes.preloader__title}>Загрузка сайта...</h1>
                <h2 className={props.classes.preloader__description}>Это может занять некоторое время</h2>
                <img className={props.classes.users_loader__img} src={props.preloader} alt='preloader' width='200px' />
            </div>
        </div>
    )
};
