const initialState = {
    isError: false,
    isLoading: false,
    data: [],
};

export const usersApiFactory = (dataName, apiUrl) => {
    //* action:
    const actionTypes = {
        SET_ERROS: `SET_ERROR_${dataName}`,
        SET_LOADING: `SET_LOADING${dataName}`,
        SET_DATA: `SET_DATA${dataName}`,
    };

    const actions = {
        setError: (status) => ({
            type: actionTypes.SET_ERROS,
            payload: status,
        }),
        setLoading: (status) => ({
            type: actionTypes.SET_LOADING,
            payload: status,
        }),
        setData: (users) => ({
            type: actionTypes.SET_DATA,
            payload: users,
        }),
    };

    actions.getDataWithThunk = async (dispatch) => {
        dispatch(actions.setLoading(true));
        dispatch(actions.setError(false));
        dispatch(actions.setData([]));

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Ошибка запроса данных по API!');
            }
            const result = await response.json();
            dispatch(actions.setData(result));
        } catch (err) {
            console.error(err);
            dispatch(actions.setError(true));
        } finally {
            dispatch(actions.setLoading(false));
        };
    }

    //* reducer:
    const reducer = (state = initialState, action) => {
        switch(action.type) {
            case actionTypes.SET_LOADING: {
                return {
                    ...state, isLoading: action.payload
                }
            }
            case actionTypes.SET_ERROS: {
                return {
                    ...state, isError: action.payload
                }
            }
            case actionTypes.SET_DATA: {
                return {
                    ...state, data: action.payload
                }
            }
            default: {
                return state
            }
        }
    };

    //* selectors:
    const getRootSelector = (state) => state[dataName];
    const getDataSelector = (state) => getRootSelector(state).data;
    const getLoadingSelector = (state) => getRootSelector(state).isLoading;
    const getErrorSelector = (state) => getRootSelector(state).isError;

    return {
        actionTypes,
        actions,
        reducer,
        selectors: {
            getFromStore: getRootSelector,
            getData: getDataSelector,
            getLoading: getLoadingSelector,
            getError: getErrorSelector,
        }
    }
}
