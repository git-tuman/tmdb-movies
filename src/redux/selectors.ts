import { RootState } from "./store";

export const selectorsCredentials = {
    email: (state: RootState) => state.credentials.email,
    token: (state: RootState) => state.credentials.token,
    username: (state: RootState) => state.credentials.username,
    account_id: (state: RootState) => state.credentials.account_id,
};

export const selectorsFilter = {
    titleMovie: (state: RootState) => state.filters.titleMovie,
    sortOption: (state: RootState) => state.filters.sortOption,
    sortYears: (state: RootState) => state.filters.sortYears,
    selectedGenres: (state: RootState) => state.filters.selectedGenres,
    page: (state: RootState) => state.filters.page,
    allFilters: (state: RootState) => state.filters,
};

export const selectorsListsMovies = {
    listAllGenres: (state: RootState) => state.listsMovies.listAllGenres,
    listMovies: (state: RootState) => state.listsMovies.listMovies,
    listFavoriteMovies: (state: RootState) =>
        state.listsMovies.listFavoriteMovies,
    allListsMovies: (state: RootState) => state.listsMovies,
};

export const selectorsDetailsListsMovies = {
    page: (state: RootState) => state.listsMovies.listMovies?.page,
    results: (state: RootState) => state.listsMovies.listMovies?.results,
    total_pages: (state: RootState) =>
        state.listsMovies.listMovies?.total_pages,
    total_results: (state: RootState) =>
        state.listsMovies.listMovies?.total_results,
};

export const selectorsListsFavoriteMovies = {
    page: (state: RootState) => state.listsMovies.listFavoriteMovies?.page,
    results: (state: RootState) =>
        state.listsMovies.listFavoriteMovies?.results,
    total_pages: (state: RootState) =>
        state.listsMovies.listFavoriteMovies?.total_pages,
    total_results: (state: RootState) =>
        state.listsMovies.listFavoriteMovies?.total_results,
};

export const selectorsFetchListFavoriteMovies = {
    isLoading: (state: RootState) => state.apiFavoriteMovies.isLoading,
    error: (state: RootState) => state.apiChangeFavoriteMovie.error,
};

export const selectorsDetailsMovie = {
    details: (state: RootState) => state.detailsMovie.details,
    credits: (state: RootState) => state.detailsMovie.credits,
};
