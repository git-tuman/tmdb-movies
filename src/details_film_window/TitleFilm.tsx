import React, { useEffect } from "react";

import FavoriteButton, {
    refreshListFavoriteMovies,
} from "../shared/FavoriteButton";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import {
    ALMOST_TRANSPARENT_COLOR,
    COLOR_GOLD,
    COLOR_WHITE,
    SIZE_LARGE,
} from "../shared/constants";
import { useSelector } from "react-redux";
import { selectorsDetailsMovie } from "../redux/selectors";

function TitleFilm() {
    const details = useSelector(selectorsDetailsMovie.details);

    if (details === null) {
        return <></>;
    }

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
            }}
        >
            <Typography variant="h3">
                {details.title} ({new Date(details.release_date).getFullYear()})
            </Typography>

            <FavoriteButton
                id={details.id}
                colorActive={COLOR_GOLD}
                colorDeactive={COLOR_WHITE}
                customSize={SIZE_LARGE}
                customSxBtn={{
                    transition: "box-shadow 0.3s ease",
                    backgroundColor: ALMOST_TRANSPARENT_COLOR,
                    "&:hover": {
                        backgroundColor: ALMOST_TRANSPARENT_COLOR,
                        boxShadow: 6,
                    },
                }}
            />
        </Box>
    );
}

export default TitleFilm;
