import { 
    appTheme,
    aquariumStatus,
    chatsCount,
    countdownForLetterRequest, 
    emailVerificationConfirmationWaitingIsFalse, 
    emailVerificationConfirmationWaitingIsTrue, 
    eventForPWAInstallation, 
    lastAuthorization,
    onlySelectedChats,
    valueInChatsListInput
} from './Action';

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
        case countdownForLetterRequest.type: {
            return {
                ...state, 
                countdownForLetterRequestIsNumber: action.payload,
            }
        }
        case lastAuthorization.type: {
            return {
                ...state,
                lastAuthorizationDateAndTime: action.payload,
            }
        }
        case valueInChatsListInput.type: {
            return {
                ...state,
                valueInChatsListInputIs: action.payload,
            }
        }
        case aquariumStatus.type: {
            return {
                ...state,
                isAquariumOpen: action.payload,
            }
        }
        case appTheme.type: {
            return {
                ...state,
                appThemeIs: action.payload,
            }
        }
        case onlySelectedChats.type: {
            return {
                ...state,
                onlySelectedChatsBoolean: action.payload,
            }
        }
        case chatsCount.type: {
            return {
                ...state,
                chatsCountSelected: action.payload,
            }
        }
        case eventForPWAInstallation.type: {
            return {
                ...state,
                eventForPWAInstallationCase: action.payload,
            }
        }
        default: {
            return state
        }
    }
};
