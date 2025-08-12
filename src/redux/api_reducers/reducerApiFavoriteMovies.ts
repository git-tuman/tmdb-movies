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

const FETCH_FAVORITE_MOVIES_REQUEST = "FETCH_FAVORITE_MOVIES_REQUEST";
const FETCH_FAVORITE_MOVIES_SUCCESS = "FETCH_FAVORITE_MOVIES_SUCCESS";
const FETCH_FAVORITE_MOVIES_FAILURE = "FETCH_FAVORITE_MOVIES_FAILURE";

export function actionCreatorFetchFavoriteMoviesRequest() {
    return { type: FETCH_FAVORITE_MOVIES_REQUEST };
}

export function actionCreatorFetchFavoriteMoviesSuccess() {
    return { type: FETCH_FAVORITE_MOVIES_SUCCESS };
}

export function actionCreatorFetchFavoriteMoviesFailure(error: object) {
    return { type: FETCH_FAVORITE_MOVIES_FAILURE, payload: error };
}

export const reducerApiFavoriteMovies = (
    state = initialState,
    action: Action
) => {
    switch (action.type) {
        case FETCH_FAVORITE_MOVIES_REQUEST:
            return Object.assign({}, state, { isLoading: true, error: null });

        case FETCH_FAVORITE_MOVIES_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
            });

        case FETCH_FAVORITE_MOVIES_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};
