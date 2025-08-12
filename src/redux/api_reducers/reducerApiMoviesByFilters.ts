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

const FETCH_MOVIES_BY_FILTERS_REQUEST = "FETCH_MOVIES_BY_FILTERS_REQUEST";
const FETCH_MOVIES_BY_FILTERS_SUCCESS = "FETCH_MOVIES_BY_FILTERS_SUCCESS";
const FETCH_MOVIES_BY_FILTERS_FAILURE = "FETCH_MOVIES_BY_FILTERS_FAILURE";

export function actionCreatorFetchMoviesByFiltersRequest() {
    return { type: FETCH_MOVIES_BY_FILTERS_REQUEST };
}

export function actionCreatorFetchMoviesByFiltersSuccess() {
    return { type: FETCH_MOVIES_BY_FILTERS_SUCCESS };
}

export function actionCreatorFetchMoviesByFiltersFailure(error: object) {
    return { type: FETCH_MOVIES_BY_FILTERS_FAILURE, payload: error };
}

export const reducerApiMoviesByFilters = (
    state = initialState,
    action: Action
) => {
    switch (action.type) {
        case FETCH_MOVIES_BY_FILTERS_REQUEST:
            return Object.assign({}, state, { isLoading: true, error: null });

        case FETCH_MOVIES_BY_FILTERS_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
            });

        case FETCH_MOVIES_BY_FILTERS_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};
