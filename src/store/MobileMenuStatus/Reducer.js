import { closeMobileMenuStatus, toggleMobileMenuStatus } from './Action';

const initialState = {
    isMobileMenuOpen: false,
};

export const mobileMenuReducer = (state = initialState, action) => {
    switch(action.type) {
        case toggleMobileMenuStatus.type: {
            return {
                ...state,
                isMobileMenuOpen: !state.isMobileMenuOpen,
            }
        }
        case closeMobileMenuStatus.type: {
            return {
                ...state,
                isMobileMenuOpen: false,
            }
        }
        default: {
            return state
        }
    }
};
