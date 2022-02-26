/**
import { addInChatsListAction, removeFromChatsListAction } from "./Action";
*/
import { chatsListReducer, initialState } from "./Reducer";

describe('check reducer', () => {
    it('check reducer without action', () => {
        const result = chatsListReducer();
        expect(result).toEqual(initialState);
    });

    /** 
    These reducer tests are no longer relevant as these reducers have been removed due to being replaced by other reducers:
    it("check reducer when adding a chat if chats weren't", () => {
        const result = chatsListReducer(undefined, addInChatsListAction({
                id: '12345678',
                name: 'newName',
            }));
        expect(result).toEqual({
            chats: {
                newName: {
                id: '12345678',
                name: 'newName',
                }
            }
        });
    });

    it('check reducer when remove a chat if this is last chat', () => {
        const result = chatsListReducer({
            chats: {
                newName: {
                id: '12345678',
                name: 'newName',
                },
            }
        }, removeFromChatsListAction('newName'));
        expect(result).toEqual({
            chats: {},
            deletedChatName: 'newName',
        });
    });

    it('check reducer when adding a chat if also chats are', () => {
        const result = chatsListReducer(
            {
                chats: {
                    newName1: {
                        id: '12345678',
                        name: 'newName1',
                    },
                },
                deletedChatName: 'delName',
            } , addInChatsListAction(
                {
                    id: '55555555',
                    name: 'newName2',
                }
            )
        );
        expect(result).toEqual({
            chats: {
                newName1: {
                    id: '12345678',
                    name: 'newName1',
                },
                newName2: {
                    id: '55555555',
                    name: 'newName2',
                },
            },
            deletedChatName: 'delName',
        });
    });

    it("check reducer when remove a chat if the chat isn't last", () => {
        const result = chatsListReducer({
            chats: {
                newName1: {
                id: '12345678',
                name: 'newName1',
                },
                newName2: {
                    id: '55555555',
                    name: 'newName2',
                    },
            },
            deletedChatName: 'delName3',
        }, removeFromChatsListAction('newName1'));
        expect(result).toEqual({
            chats: {
                newName2: {
                    id: '55555555',
                    name: 'newName2',
                    }
            },
            deletedChatName: 'newName1',
        });
    });
    */
});
