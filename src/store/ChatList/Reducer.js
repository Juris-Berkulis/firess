import { CHANGE_MESSAGES_LIST, DROP_MESSAGES_IN_STATE } from './Action';

const initialState = {
    messages: {},
};

export const chatListReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_MESSAGES_LIST: {
            return {
                messages: {
                    [action.payload.openChatKey]: action.payload.snapshotVal
                }
            }
        }
        case DROP_MESSAGES_IN_STATE: {
            return {
                messages: {}
            }
        }
        default: {
            return state
        }
    }
};
