import { Genre } from "./reducerMovies";

export type DetailsMovie = {
    backdrop_path: string;
    budget: number;
    genres: Genre[];
    origin_country: string[];
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    title: string;
    vote_average: number;
    id: number;
};

type PersonCast = {
    name: string;
};

export type Cast = {
    cast: PersonCast[];
};

type State = {
    details: DetailsMovie | null;
    credits: Cast | null;
};

type Action = {
    type: string;
    payload: string;
};

const initialState: State = {
    details: null,
    credits: null,
};

const CHANGE_DETAILS_MOVIE = "CHANGE_DETAILS_MOVIE";
const CHANGE_CREDITS_MOVIE = "CHANGE_CREDITS_MOVIE";
const CLEAR_DETAILS_AND_CREDITS_MOVIE = "CLEAR_DETAILS_MOVIE";

export function actionCreatorChangeDetailsMovie(value: string) {
    return { type: CHANGE_DETAILS_MOVIE, payload: value };
}

export function actionCreatorChangeCreditsMovie(value: string) {
    return { type: CHANGE_CREDITS_MOVIE, payload: value };
}

export function actionCreatorClearDetailsAndCreditsMovie() {
    return { type: CLEAR_DETAILS_AND_CREDITS_MOVIE };
}

export function reducerDetailsMovie(state = initialState, action: Action) {
    switch (action.type) {
        case CHANGE_DETAILS_MOVIE:
            return Object.assign({}, state, { details: action.payload });

        case CHANGE_CREDITS_MOVIE:
            return Object.assign({}, state, { credits: action.payload });

        case CLEAR_DETAILS_AND_CREDITS_MOVIE:
            return initialState;

        default:
            return state;
    }
}
