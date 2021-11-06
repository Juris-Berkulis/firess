import { toggleCheckedProfile } from './Action';

const initialState = {
    checked: false,
};

export const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case toggleCheckedProfile.type: {
            return {
                ...state,
                checked: !state.checked,
            }
        }
        default: {
            return state
        }
    }
};
