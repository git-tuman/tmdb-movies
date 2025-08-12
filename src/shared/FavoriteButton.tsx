import React, { memo, useState } from "react";

import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { SIZE_LARGE, SIZE_MEDIUM, SIZE_SMALL } from "./constants";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { selectorsListsFavoriteMovies } from "../redux/selectors";
import { fetchChangeFavoriteMovie, fetchFavoriteMovies } from "../api/api";

type FavoriteBtn = {
    id: number;
    colorActive: string;
    colorDeactive: string;
    customSize?:
        | typeof SIZE_SMALL
        | typeof SIZE_MEDIUM
        | typeof SIZE_LARGE
        | null;
    customSxBtn?: any | null;
};

export const refreshListFavoriteMovies = () => {
    store.dispatch(fetchFavoriteMovies());
};

const FavoriteButton = memo(
    ({
        id,
        colorActive,
        colorDeactive,
        customSize = null,
        customSxBtn = null,
    }: FavoriteBtn) => {
        const listFavoriteMovies = useSelector(
            selectorsListsFavoriteMovies.results
        );

        const [isFavoriteMovie, setIsFavoriteMovie] = useState(
            listFavoriteMovies !== undefined
                ? listFavoriteMovies.some((movie) => movie.id === id)
                : false
        );

        function handleClickFavoriteIcon(
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) {
            event.preventDefault();
            event.stopPropagation();

            const initialActiveStatusBtn = isFavoriteMovie;

            setIsFavoriteMovie(!initialActiveStatusBtn);

            store
                .dispatch(fetchChangeFavoriteMovie(id, !isFavoriteMovie))
                .then(() => {
                    const error = store.getState().apiChangeFavoriteMovie.error;

                    if (error !== null) {
                        setIsFavoriteMovie(initialActiveStatusBtn);
                    } else {
                        refreshListFavoriteMovies();
                    }
                });
        }

        const sizeBtn = customSize !== null ? customSize : SIZE_MEDIUM;

        return (
            <IconButton
                onClick={(event) => handleClickFavoriteIcon(event)}
                size={sizeBtn}
                sx={customSxBtn}
            >
                <StarBorderIcon
                    sx={{
                        color: isFavoriteMovie ? colorActive : colorDeactive,
                    }}
                />
            </IconButton>
        );
    }
);

export default FavoriteButton;
