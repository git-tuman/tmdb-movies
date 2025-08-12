export type Genre = {
    name: string;
    id: number;
};

export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type DataMovies = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

type ListsDataMovies = {
    listAllGenres: Genre[] | null;
    listMovies: DataMovies | null;
    listFavoriteMovies: DataMovies | null;
};

type Action = {
    type: string;
    payload: string;
};

const initialListsDataMovies: ListsDataMovies = {
    listAllGenres: null,
    listMovies: null,
    listFavoriteMovies: null,
};

const CHANGE_LIST_ALL_GENRES = "CHANGE_LIST_ALL_GENRES";
const CHANGE_LIST_MOVIES = "CHANGE_LIST_MOVIES";
const CHANGE_LIST_FAVORITE_MOVIES = "CHANGE_LIST_FAVORITE_MOVIES";
const CLEAR_ALL_LISTS_MOVIES = "CLEAR_ALL_LISTS_MOVIES";

export function actionCreatorChangeListAllGenres(value: Genre[]) {
    return { type: CHANGE_LIST_ALL_GENRES, payload: value };
}

export function actionCreatorChangeListMovies(dataMovies: DataMovies) {
    return { type: CHANGE_LIST_MOVIES, payload: dataMovies };
}

export function actionCreatorChangeListFavoriteMovies(
    listFavoriteMovies: DataMovies
) {
    return { type: CHANGE_LIST_FAVORITE_MOVIES, payload: listFavoriteMovies };
}

export function actionCreatorClearAllListsMovies() {
    return { type: CLEAR_ALL_LISTS_MOVIES };
}

export function reducerMovies(state = initialListsDataMovies, action: Action) {
    switch (action.type) {
        case CHANGE_LIST_ALL_GENRES:
            return Object.assign({}, state, { listAllGenres: action.payload });

        case CHANGE_LIST_MOVIES:
            return Object.assign({}, state, { listMovies: action.payload });

        case CHANGE_LIST_FAVORITE_MOVIES:
            return Object.assign({}, state, {
                listFavoriteMovies: action.payload,
            });

        case CLEAR_ALL_LISTS_MOVIES:
            return initialListsDataMovies;

        default:
            return state;
    }
}
