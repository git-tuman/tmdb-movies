import { combineReducers } from "redux";
import { reducerCrendentials } from "./reducerCredentials";
import { reducerFilter } from "./reducerFilters";
import { configureStore } from "@reduxjs/toolkit";
import { reducerMovies } from "./reducerMovies";
import { createLogger } from "redux-logger";
import { reducerApiCredentials } from "./api_reducers/reducerApiCredentials";
// import { reducerApiGenres } from "./api_reducers/reducerApiGenres";
import { reducerApiFavoriteMovies } from "./api_reducers/reducerApiFavoriteMovies";
import { reducerApiDetailsMovie } from "./api_reducers/reducerApiDetailsMovie";
import { reducerApiCreditsMovie } from "./api_reducers/reducerApiCreditsMovie";
import { reducerDetailsMovie } from "./reducerDetailsMovie";
import { reducerApiChangeFavoriteMovie } from "./api_reducers/reducerApiChangeFovoriteMovie";
// import { reducerApiMoviesByTitle } from "./api_reducers/reducerApiMoviesByTitle";
// import { reducerApiMoviesByFilters } from "./api_reducers/reducerApiMoviesByFilters";

export const rootReducer = combineReducers({
    apiCredentials: reducerApiCredentials,
    // apiGenres: reducerApiGenres,
    apiFavoriteMovies: reducerApiFavoriteMovies,
    apiDetailsMovie: reducerApiDetailsMovie,
    apiCreditsMovie: reducerApiCreditsMovie,
    apiChangeFavoriteMovie: reducerApiChangeFavoriteMovie,
    // apiMoviesByFilters: reducerApiMoviesByFilters,
    // apiMoviesByTitle: reducerApiMoviesByTitle,
    credentials: reducerCrendentials,
    filters: reducerFilter,
    listsMovies: reducerMovies,
    detailsMovie: reducerDetailsMovie,
});

const logger = createLogger({
    level: "log",
    collapsed: true,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
