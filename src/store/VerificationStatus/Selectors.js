export const getStatusesInTheAppRootSelector = (state) => state.statusesInTheApp;
export const getStatusesInTheAppIsEmailVerificationConfirmationWaitingSelector = (state) => getStatusesInTheAppRootSelector(state).isEmailVerificationConfirmationWaiting || null;
