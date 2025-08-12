import React, { useEffect, useState } from "react";

import CardFilm from "./CardFilm";

import { Box, CircularProgress, Typography } from "@mui/material";
import { TEXT_ERROR_LOADING } from "../shared/constants";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { refreshListFavoriteMovies } from "../shared/FavoriteButton";
import { selectorsFilter, selectorsListsMovies } from "../redux/selectors";
import { fetchMoviesByFilters, fetchMoviesByTitle } from "../api/api";

const CardsMovies = () => {
    const [errorLoading, setErrorLoading] = useState(false);

    const listMovies = useSelector(selectorsListsMovies.listMovies);
    const listFavoriteMovies = useSelector(
        selectorsListsMovies.listFavoriteMovies
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (listFavoriteMovies === null) {
                refreshListFavoriteMovies();
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [listFavoriteMovies]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrorLoading(true);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    if (listMovies === null && listFavoriteMovies === null && errorLoading) {
        return (
            <Box>
                {errorLoading && (
                    <Typography variant="h5" color="#9e9e9e">
                        {TEXT_ERROR_LOADING}
                    </Typography>
                )}
            </Box>
        );
    }

    if (listMovies === null || listFavoriteMovies === null) {
        return <CircularProgress size={30} />;
    }

    const listFilms = listMovies.results;

    return (
        <>
            {listFilms.map((film) => (
                <CardFilm key={film.id} film={film} />
            ))}
        </>
    );
};

const ContentMainWindow = () => {
    const filters = useSelector(selectorsFilter.allFilters);

    useEffect(() => {
        function getDataListMovies() {
            if (filters.titleMovie === "") {
                store.dispatch(fetchMoviesByFilters());
            } else {
                store.dispatch(fetchMoviesByTitle());
            }
        }

        const timeoutId = setTimeout(getDataListMovies, 1000);

        return () => clearTimeout(timeoutId);
    }, [filters]);

    return (
        <Box
            sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(3, 1fr)",
                width: "80%",
                height: "100%",
            }}
        >
            <CardsMovies />
        </Box>
    );
};

export default ContentMainWindow;
