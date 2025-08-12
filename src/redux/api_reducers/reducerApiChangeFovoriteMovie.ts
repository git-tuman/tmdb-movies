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

const FETCH_CHANGE_FAVORITE_MOVIE = "FETCH_CHANGE_FAVORITE_MOVIE";
const FETCH_CHANGE_FAVORITE_SUCCESS = "FETCH_CHANGE_FAVORITE_SUCCESS";
const FETCH_CHANGE_FAVORITE_FAILURE = "FETCH_CHANGE_FAVORITE_FAILURE";

export function actionCreatorFetchChangeFavoriteMovieRequest() {
    return { type: FETCH_CHANGE_FAVORITE_MOVIE };
}

export function actionCreatorFetchChangeFavoriteMovieSuccess() {
    return { type: FETCH_CHANGE_FAVORITE_SUCCESS };
}

export function actionCreatorFetchChangeFavoriteMovieFailure(error: object) {
    return { type: FETCH_CHANGE_FAVORITE_FAILURE, payload: error };
}

export const reducerApiChangeFavoriteMovie = (
    state = initialState,
    action: Action
) => {
    switch (action.type) {
        case FETCH_CHANGE_FAVORITE_MOVIE:
            return Object.assign({}, state, { isLoading: true, error: null });

        case FETCH_CHANGE_FAVORITE_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
            });

        case FETCH_CHANGE_FAVORITE_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};
