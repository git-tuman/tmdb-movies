import React from "react";

import { Box, Typography } from "@mui/material";
import {
    ALMOST_TRANSPARENT_COLOR,
    TITLE_CREDITS,
    TITLE_GENRE,
} from "../shared/constants";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { selectorsDetailsMovie } from "../redux/selectors";

function OtherDetailsElems() {
    const credits = useSelector(selectorsDetailsMovie.credits);

    const details = useSelector(selectorsDetailsMovie.details);

    if (credits === null || details === null) {
        return <></>;
    }

    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <Box
                sx={{
                    display: "grid",
                    gap: 2,
                    width: "50%",
                    height: "min-content",
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: ALMOST_TRANSPARENT_COLOR,
                    boxShadow: 1,
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                        boxShadow: 6,
                    },
                }}
            >
                <Typography variant="h4">{TITLE_CREDITS}</Typography>

                <Box>
                    {credits.cast.map((cast, index) => {
                        return (
                            index < 5 && (
                                <Typography key={index} variant="h5">
                                    {cast.name}
                                </Typography>
                            )
                        );
                    })}
                </Box>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gap: 2,
                    width: "50%",
                    height: "min-content",
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: ALMOST_TRANSPARENT_COLOR,
                    boxShadow: 1,
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                        boxShadow: 6,
                    },
                }}
            >
                <Typography variant="h4">{TITLE_GENRE}</Typography>

                <Box>
                    {details.genres.map((genre, index) => {
                        return (
                            <Typography key={index} variant="h5">
                                {genre.name}
                            </Typography>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
}

export default OtherDetailsElems;
