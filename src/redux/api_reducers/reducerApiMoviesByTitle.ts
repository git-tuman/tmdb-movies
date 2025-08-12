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

const FETCH_MOVIES_BY_TITLE_REQUEST = "FETCH_MOVIES_BY_TITLE_REQUEST";
const FETCH_MOVIES_BY_TITLE_SUCCESS = "FETCH_MOVIES_BY_TITLE_SUCCESS";
const FETCH_MOVIES_BY_TITLE_FAILURE = "FETCH_MOVIES_BY_TITLE_FAILURE";

export function actionCreatorFetchMoviesByTitleRequest() {
    return { type: FETCH_MOVIES_BY_TITLE_REQUEST };
}

export function actionCreatorFetchMoviesByTitleSuccess() {
    return { type: FETCH_MOVIES_BY_TITLE_SUCCESS };
}

export function actionCreatorFetchMoviesByTitleFailure(error: object) {
    return { type: FETCH_MOVIES_BY_TITLE_FAILURE, payload: error };
}

export const reducerApiMoviesByTitle = (
    state = initialState,
    action: Action
) => {
    switch (action.type) {
        case FETCH_MOVIES_BY_TITLE_REQUEST:
            return Object.assign({}, state, { isLoading: true, error: null });

        case FETCH_MOVIES_BY_TITLE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
            });

        case FETCH_MOVIES_BY_TITLE_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};
