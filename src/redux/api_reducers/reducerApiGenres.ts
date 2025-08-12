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

const FETCH_GENRES_REQUEST = "FETCH_GENRES_REQUEST";
const FETCH_GENRES_SUCCESS = "FETCH_GENRES_SUCCESS";
const FETCH_GENRES_FAILURE = "FETCH_GENRES_FAILURE";

export function actionCreatorFetchGenresRequest() {
    return { type: FETCH_GENRES_REQUEST };
}

export function actionCreatorFetchGenresSuccess() {
    return { type: FETCH_GENRES_SUCCESS };
}

export function actionCreatorFetchGenresFailure(error: object) {
    return { type: FETCH_GENRES_FAILURE, payload: error };
}

export const reducerApiGenres = (state = initialState, action: Action) => {
    switch (action.type) {
        case FETCH_GENRES_REQUEST:
            return Object.assign({}, state, { isLoading: true, error: null });

        case FETCH_GENRES_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
            });

        case FETCH_GENRES_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};
