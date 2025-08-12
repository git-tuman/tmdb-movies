export type Filter = {
    titleMovie: string;
    sortOption: string;
    sortYears: number[];
    selectedGenres: number[];
    page: number;
};

type Action = {
    type: string;
    payload: string | number | number[];
};

export const sortOptionsList: string[] = ["Популярности", "Рейтингу"];
const currentYear = new Date().getFullYear();

const initialFilters: Filter = {
    titleMovie: "",
    sortOption: sortOptionsList[0],
    sortYears: [1950, currentYear],
    selectedGenres: [],
    page: 1,
};

const CLEAR_FILTERS = "CLEAR_FILTERS";
const CHANGE_TITLE_MOVIE = "CHANGE_TITLE_MOVIE";
const CHANGE_SORT_OPTION = "CHANGE_SORT_OPTION";
const CHANGE_SORT_YEARS = "CHANGE_SORT_YEARS";
const CHANGE_SELECTED_GENRES = "CHANGE_GENRES";
const CHANGE_PAGE = "CHANGE_PAGE";

export function actionCreatorChangeTitleMovie(value: string) {
    return { type: CHANGE_TITLE_MOVIE, payload: value };
}

export function actionCreatorChangeSortOption(value: string) {
    return { type: CHANGE_SORT_OPTION, payload: value };
}

export function actionCreatorChangeSortYears(value: number[]) {
    return { type: CHANGE_SORT_YEARS, payload: value };
}

export function actionCreatorChangeSelectedGenres(value: number[]) {
    return { type: CHANGE_SELECTED_GENRES, payload: value };
}

export function actionCreatorChangePage(value: number) {
    return { type: CHANGE_PAGE, payload: value };
}

export function actionCreatorClearFilters() {
    return { type: CLEAR_FILTERS };
}

export function reducerFilter(state = initialFilters, action: Action) {
    switch (action.type) {
        case CHANGE_TITLE_MOVIE:
            return Object.assign({}, state, {
                page: 1,
                titleMovie: action.payload,
            });

        case CHANGE_SORT_OPTION:
            return Object.assign({}, state, {
                page: 1,
                sortOption: action.payload,
            });

        case CHANGE_SORT_YEARS:
            return Object.assign({}, state, {
                page: 1,
                sortYears: action.payload,
            });

        case CHANGE_SELECTED_GENRES:
            return Object.assign({}, state, {
                page: 1,
                selectedGenres: action.payload,
            });

        case CHANGE_PAGE:
            return Object.assign({}, state, { page: action.payload });

        case CLEAR_FILTERS:
            return initialFilters;

        default:
            return state;
    }
}
