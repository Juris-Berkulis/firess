export const getStatusesInTheAppRootSelector = (state) => state.statusesInTheApp;
export const getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector = (state) => getStatusesInTheAppRootSelector(state).isEmailVerificationConfirmationWaiting || null;
export const getStatusesInTheAppCountdownForLetterRequestIsNumberSelector = (state) => getStatusesInTheAppRootSelector(state).countdownForLetterRequestIsNumber || null;
export const getStatusesInTheAppLastAuthorizationDateAndTimeSelector = (state) => getStatusesInTheAppRootSelector(state).lastAuthorizationDateAndTime || null;
export const getStatusesInTheAppValueInChatsListInputIsSelector = (state) => getStatusesInTheAppRootSelector(state).valueInChatsListInputIs || '';
export const getStatusesInTheAppIsAquariumOpenSelector = (state) => getStatusesInTheAppRootSelector(state).isAquariumOpen || null;
export const getStatusesInTheAppisDarkThemeSelector = (state) => getStatusesInTheAppRootSelector(state).isDarkTheme;
