type Action = {
    type: string;
    payload: object;
};

type State = {
    isLoading: boolean;
    error: null | object;
};

const initialState: State = {
    isLoading: false,
    error: null,
};

const FETCH_CREDENTIALS_REQUEST = "FETCH_CREDENTIALS_REQUEST";
const FETCH_CREDENTIALS_SUCCESS = "FETCH_CREDENTIALS_SUCCESS";
const FETCH_CREDENTIALS_FAILURE = "FETCH_CREDENTIALS_FAILURE";

export function actionCreatorFetchCredentialsRequest() {
    return { type: FETCH_CREDENTIALS_REQUEST };
}

export function actionCreatorFetchCredentialsSuccess() {
    return { type: FETCH_CREDENTIALS_SUCCESS };
}

export function actionCreatorFetchCredentialsFailure(error: object) {
    return { type: FETCH_CREDENTIALS_FAILURE, payload: error };
}

export const reducerApiCredentials = (state = initialState, action: Action) => {
    switch (action.type) {
        case FETCH_CREDENTIALS_REQUEST:
            return Object.assign({}, state, { isLoading: true, error: null });

        case FETCH_CREDENTIALS_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
            });

        case FETCH_CREDENTIALS_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};
