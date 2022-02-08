export const appTitle = {
    name: 'Firess Messenger',
    delimiter: '. ',
}

export const mobileScreenWidth = 1000;

export const allAppComponentsWithPageTitle = {
    home: {
        pageTitle: 'Домашняя страница',
        displayTitle: 'Дом',
        path: '/',
        pathCheck: /^$/,
    },
    profile: {
        pageTitle: 'Профиль',
        displayTitle: 'Профиль',
        path: '/profile',
        pathCheck: /^$/,
    },
    messenger: {
        pageTitle: 'Мессенджер',
        displayTitle: 'Мессенджер',
        path: '/messenger',
        pathCheck: /^$/,
    },
    usersApi: {
        pageTitle: 'Юзеры по API',
        displayTitle: 'Юзеры по API',
        path: '/usersapi',
        pathCheck: /^$/,
    },
    signup: {
        pageTitle: 'Регистрация',
        displayTitle: 'Регистрация',
        path: '/signup',
        pathCheck: /^$/,
    },
    login: {
        pageTitle: 'Вход',
        displayTitle: 'Вход',
        path: '/login',
        pathCheck: /^$/,
    },
    logout: {
        pageTitle: '',
        displayTitle: 'Выход',
        path: '',
        pathCheck: /^$/,
    },
    preloader: {
        pageTitle: 'Загрузка сайта...',
        displayTitle: '',
        path: '',
        pathCheck: /^$/,
    },
    error404: {
        pageTitle: '404: Чат не найден',
        displayTitle: '',
        path: '/messenger/error404',
        pathCheck: /^$/,
    },
    openChat: {
        pageTitle: (chatId) => {
            return `Чат: ${chatId}`
        },
        displayTitle: '',
        path: '/messenger/:chatId',
        pathCheck: /^\/messenger\/\d{13}$/,
    },
};

export const startValueForTimer = 91;

export const MAXIMUM_NUMBER_OF_CHARACTERS_FOR_A_CHAT_NAME = 50;
