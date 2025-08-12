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

const FETCH_DETAILS_MOVIE_REQUEST = "FETCH_DETAILS_MOVIE_REQUEST";
const FETCH_DETAILS_MOVIE_SUCCESS = "FETCH_DETAILS_MOVIE_SUCCESS";
const FETCH_DETAILS_MOVIE_FAILURE = "FETCH_DETAILS_MOVIE_FAILURE";

export function actionCreatorFetchDetailsMovieRequest() {
    return { type: FETCH_DETAILS_MOVIE_REQUEST };
}

export function actionCreatorFetchDetailsMovieSuccess() {
    return { type: FETCH_DETAILS_MOVIE_SUCCESS };
}

export function actionCreatorFetchDetailsMovieFailure(error: object) {
    return { type: FETCH_DETAILS_MOVIE_FAILURE, payload: error };
}

export const reducerApiDetailsMovie = (
    state = initialState,
    action: Action
) => {
    switch (action.type) {
        case FETCH_DETAILS_MOVIE_REQUEST:
            return Object.assign({}, state, { isLoading: true, error: null });

        case FETCH_DETAILS_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
            });

        case FETCH_DETAILS_MOVIE_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};
