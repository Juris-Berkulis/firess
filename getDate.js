//* Конфигурация: "https://learn.javascript.ru/intl".

const date = new Date();

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

console.log(`\n========== ${date.toLocaleString("ru", options)} ==========\n`);
