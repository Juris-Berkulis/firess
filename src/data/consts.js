export const appTitle = {
    name: 'ℱírεss ℳεssεngεr',
    delimiter: '. ',
};

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

export const APP_THEMES_NAMES = {
    theme_1: {
        nameEn: 'lightTheme',
        nameRu: 'Светлая',
    },
    theme_2: {
        nameEn: 'dartTheme',
        nameRu: 'Темная',
    },
    theme_3: {
        nameEn: 'greyTheme',
        nameRu: 'Серая',
    },
    theme_4: {
        nameEn: 'sunnyTheme',
        nameRu: 'Солнечно',
    },
};

const getTime =(hour, minute) => {
    return +hour * 60 * 60 * 1000 + +minute * 60 * 1000
};

export const appThemesSchedule = [
    {
        themeNameEn: APP_THEMES_NAMES.theme_3.nameEn,
        themeNameRu: APP_THEMES_NAMES.theme_3.nameRu,
        themeStartAt: getTime(0, 0),
    },
    {
        themeNameEn: APP_THEMES_NAMES.theme_2.nameEn,
        themeNameRu: APP_THEMES_NAMES.theme_2.nameRu,
        themeStartAt: getTime(6, 0),
    },
    {
        themeNameEn: APP_THEMES_NAMES.theme_1.nameEn,
        themeNameRu: APP_THEMES_NAMES.theme_1.nameRu,
        themeStartAt: getTime(8, 30),
    },
    {
        themeNameEn: APP_THEMES_NAMES.theme_4.nameEn,
        themeNameRu: APP_THEMES_NAMES.theme_4.nameRu,
        themeStartAt: getTime(12, 0),
    },
    {
        themeNameEn: APP_THEMES_NAMES.theme_1.nameEn,
        themeNameRu: APP_THEMES_NAMES.theme_1.nameRu,
        themeStartAt: getTime(12, 5),
    },
    {
        themeNameEn: APP_THEMES_NAMES.theme_2.nameEn,
        themeNameRu: APP_THEMES_NAMES.theme_2.nameRu,
        themeStartAt: getTime(20, 30),
    },
];
