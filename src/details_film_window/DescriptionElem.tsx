import React from "react";

import { Box, Typography } from "@mui/material";
import {
    ALMOST_TRANSPARENT_COLOR,
    TITLE_DESCRIPTION,
} from "../shared/constants";
import { useSelector } from "react-redux";
import { selectorsDetailsMovie } from "../redux/selectors";

function DescriptionElem() {
    const details = useSelector(selectorsDetailsMovie.details);

    if (details === null) {
        return <></>;
    }

    return (
        <Box
            sx={{
                display: "grid",
                gap: 2,
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
            <Typography variant="h4">{TITLE_DESCRIPTION}</Typography>

            <Typography variant="h5">{details.overview}</Typography>
        </Box>
    );
}

export default DescriptionElem;
