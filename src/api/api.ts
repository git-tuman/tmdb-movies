import {
    actionCreatorFetchCredentialsFailure,
    actionCreatorFetchCredentialsRequest,
    actionCreatorFetchCredentialsSuccess,
} from "../redux/api_reducers/reducerApiCredentials";
import {
    actionCreatorFetchDetailsMovieFailure,
    actionCreatorFetchDetailsMovieRequest,
    actionCreatorFetchDetailsMovieSuccess,
} from "../redux/api_reducers/reducerApiDetailsMovie";
import {
    actionCreatorFetchFavoriteMoviesFailure,
    actionCreatorFetchFavoriteMoviesRequest,
    actionCreatorFetchFavoriteMoviesSuccess,
} from "../redux/api_reducers/reducerApiFavoriteMovies";
import {
    actionCreatorFetchGenresFailure,
    actionCreatorFetchGenresRequest,
    actionCreatorFetchGenresSuccess,
} from "../redux/api_reducers/reducerApiGenres";
import {
    actionCreatorFetchCreditsMovieFailure,
    actionCreatorFetchCreditsMovieRequest,
    actionCreatorFetchCreditsMovieSuccess,
} from "../redux/api_reducers/reducerApiCreditsMovie";
import { store } from "../redux/store";
import {
    actionCreatorChangeAccountId,
    actionCreatorChangeToken,
    actionCreatorChangeUsername,
} from "../redux/reducerCredentials";
import {
    actionCreatorChangeCreditsMovie,
    actionCreatorChangeDetailsMovie,
} from "../redux/reducerDetailsMovie";
import {
    actionCreatorChangeListAllGenres,
    actionCreatorChangeListFavoriteMovies,
    actionCreatorChangeListMovies,
} from "../redux/reducerMovies";
import { actionCreatorFetchChangeFavoriteMovieRequest } from "../redux/api_reducers/reducerApiChangeFovoriteMovie";
import {
    actionCreatorFetchMoviesByFiltersFailure,
    actionCreatorFetchMoviesByFiltersRequest,
    actionCreatorFetchMoviesByFiltersSuccess,
} from "../redux/api_reducers/reducerApiMoviesByFilters";
import {
    actionCreatorFetchMoviesByTitleFailure,
    actionCreatorFetchMoviesByTitleRequest,
    actionCreatorFetchMoviesByTitleSuccess,
} from "../redux/api_reducers/reducerApiMoviesByTitle";

const baseUrl = "https://api.themoviedb.org/3";

const getTokenFromStore = () => {
    return store.getState().credentials.token;
};

const getDefaultGETOptions = () => {
    return {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${getTokenFromStore()}`,
        },
    };
};

const getAccountIdFromStore = () => {
    return store.getState().credentials.account_id;
};

export function fetchCredentials(token: string) {
    return function (dispatch: Function) {
        dispatch(actionCreatorFetchCredentialsRequest());

        const link = `${baseUrl}/account/account_id`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        return fetch(link, options)
            .then((response) => response.json())
            .then(
                (json) => {
                    dispatch(actionCreatorChangeToken(token));
                    dispatch(actionCreatorChangeUsername(json.username));
                    dispatch(actionCreatorChangeAccountId(json.id.toString()));

                    dispatch(actionCreatorFetchCredentialsSuccess());
                },
                (error) => {
                    dispatch(actionCreatorFetchCredentialsFailure(error));
                }
            );
    };
}

export function fetchGenres() {
    return function (dispatch: Function) {
        dispatch(actionCreatorFetchGenresRequest());

        const link = `${baseUrl}/genre/movie/list?language=ru`;
        const options = getDefaultGETOptions();

        return fetch(link, options)
            .then((response) => response.json())
            .then(
                (json) => {
                    dispatch(actionCreatorChangeListAllGenres(json.genres));

                    dispatch(actionCreatorFetchGenresSuccess());
                },
                (error) => {
                    dispatch(actionCreatorFetchGenresFailure(error));
                }
            );
    };
}

export function fetchFavoriteMovies() {
    return function (dispatch: Function) {
        dispatch(actionCreatorFetchFavoriteMoviesRequest());

        const account_id = getAccountIdFromStore();

        const link = `${baseUrl}/account/${account_id}/favorite/movies`;
        const options = getDefaultGETOptions();

        return fetch(link, options)
            .then((response) => response.json())
            .then(
                (json) => {
                    dispatch(actionCreatorChangeListFavoriteMovies(json));

                    dispatch(actionCreatorFetchFavoriteMoviesSuccess());
                },
                (error) => {
                    dispatch(actionCreatorFetchFavoriteMoviesFailure(error));
                }
            );
    };
}

export function fetchDetailsMovie(movie_id: string) {
    return function (dispatch: Function) {
        dispatch(actionCreatorFetchDetailsMovieRequest());

        const link = `${baseUrl}/movie/${movie_id}?language=ru`;
        const options = getDefaultGETOptions();

        return fetch(link, options)
            .then((response) => response.json())
            .then(
                (json) => {
                    dispatch(actionCreatorChangeDetailsMovie(json));

                    dispatch(actionCreatorFetchDetailsMovieSuccess());
                },
                (error) => {
                    dispatch(actionCreatorFetchDetailsMovieFailure(error));
                }
            );
    };
}

export function fetchCreditsMovie(movie_id: string) {
    return function (dispatch: Function) {
        dispatch(actionCreatorFetchCreditsMovieRequest());

        const link = `${baseUrl}/movie/${movie_id}/credits?language=ru`;
        const options = getDefaultGETOptions();

        return fetch(link, options)
            .then((response) => response.json())
            .then(
                (json) => {
                    dispatch(actionCreatorChangeCreditsMovie(json));

                    dispatch(actionCreatorFetchCreditsMovieSuccess());
                },
                (error) => {
                    dispatch(actionCreatorFetchCreditsMovieFailure(error));
                }
            );
    };
}

export function fetchChangeFavoriteMovie(
    movie_id: number,
    favoriteValue: boolean
) {
    return function (dispatch: Function) {
        dispatch(actionCreatorFetchChangeFavoriteMovieRequest());

        const account_id = getAccountIdFromStore();

        const link = `${baseUrl}/account/${account_id}/favorite`;
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${getTokenFromStore()}`,
            },
            body: JSON.stringify({
                media_type: "movie",
                media_id: movie_id,
                favorite: favoriteValue,
            }),
        };

        return fetch(link, options)
            .then((response) => response.json())
            .then(
                (json) => {
                    dispatch(actionCreatorFetchCreditsMovieSuccess());
                },
                (error) => {
                    dispatch(actionCreatorFetchCreditsMovieFailure(error));
                }
            );
    };
}

export function fetchMoviesByFilters() {
    return function (dispatch: Function) {
        dispatch(actionCreatorFetchMoviesByFiltersRequest());

        const filters = store.getState().filters;

        function getSortOption() {
            switch (filters.sortOption) {
                case "Популярности":
                    return "popularity";

                case "Рейтингу":
                    return "vote_average";

                default:
                    throw Error("Unknown option: " + filters.sortOption);
            }
        }

        const link = `${baseUrl}/discover/movie?language=ru&sort_by=${getSortOption()}.desc&vote_count.gte=300&primary_release_date.gte=${
            filters.sortYears[0]
        }-01-01&primary_release_date.lte=${
            filters.sortYears[1]
        }-12-31&with_genres=${filters.selectedGenres}&page=${filters.page}`;
        const options = getDefaultGETOptions();

        return fetch(link, options)
            .then((response) => response.json())
            .then(
                (json) => {
                    dispatch(actionCreatorChangeListMovies(json));

                    dispatch(actionCreatorFetchMoviesByFiltersSuccess());
                },
                (error) => {
                    dispatch(actionCreatorFetchMoviesByFiltersFailure(error));
                }
            );
    };
}

export function fetchMoviesByTitle() {
    return function (dispatch: Function) {
        dispatch(actionCreatorFetchMoviesByTitleRequest());

        const filters = store.getState().filters;
        const link = `${baseUrl}/search/movie?query=${filters.titleMovie}&language=ru&page=${filters.page}`;
        const options = getDefaultGETOptions();

        return fetch(link, options)
            .then((response) => response.json())
            .then(
                (json) => {
                    dispatch(actionCreatorChangeListMovies(json));

                    dispatch(actionCreatorFetchMoviesByTitleSuccess());
                },
                (error) => {
                    dispatch(actionCreatorFetchMoviesByTitleFailure(error));
                }
            );
    };
}
