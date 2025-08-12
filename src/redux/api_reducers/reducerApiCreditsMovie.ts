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

const FETCH_CREDITS_MOVIE_REQUEST = "FETCH_CREDITS_MOVIE_REQUEST";
const FETCH_CREDITS_MOVIE_SUCCESS = "FETCH_CREDITS_MOVIE_SUCCESS";
const FETCH_CREDITS_MOVIE_FAILURE = "FETCH_CREDITS_MOVIE_FAILURE";

export function actionCreatorFetchCreditsMovieRequest() {
    return { type: FETCH_CREDITS_MOVIE_REQUEST };
}

export function actionCreatorFetchCreditsMovieSuccess() {
    return { type: FETCH_CREDITS_MOVIE_SUCCESS };
}

export function actionCreatorFetchCreditsMovieFailure(error: object) {
    return { type: FETCH_CREDITS_MOVIE_FAILURE, payload: error };
}

export const reducerApiCreditsMovie = (
    state = initialState,
    action: Action
) => {
    switch (action.type) {
        case FETCH_CREDITS_MOVIE_REQUEST:
            return Object.assign({}, state, { isLoading: true, error: null });

        case FETCH_CREDITS_MOVIE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
            });

        case FETCH_CREDITS_MOVIE_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};
