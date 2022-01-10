import { emailVerificationConfirmationWaitingIsFalse, emailVerificationConfirmationWaitingIsTrue } from './Action';

const initialState = {};

export const statusesInTheAppReducer = (state = initialState, action) => {
    switch(action.type) {
        case emailVerificationConfirmationWaitingIsTrue.type: {
            return {
                ...state, 
                isEmailVerificationConfirmationWaiting: true,
            }
        }
        case emailVerificationConfirmationWaitingIsFalse.type: {
            return {
                ...state, 
                isEmailVerificationConfirmationWaiting: false,
            }
        }
        default: {
            return state
        }
    }
};
