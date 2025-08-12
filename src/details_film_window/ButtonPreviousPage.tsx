import React from "react";

import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ALMOST_TRANSPARENT_COLOR } from "../shared/constants";

function ButtonPreviousPage({ callback }: { callback: () => void }) {
    return (
        <Box>
            <IconButton
                onClick={() => callback()}
                sx={{
                    transition: "box-shadow 0.3s ease",
                    backgroundColor: ALMOST_TRANSPARENT_COLOR,
                    "&:hover": {
                        backgroundColor: ALMOST_TRANSPARENT_COLOR,
                        boxShadow: 6,
                    },
                }}
            >
                <ArrowBackIcon fontSize="large" sx={{ color: "white" }} />
            </IconButton>
        </Box>
    );
}

export default ButtonPreviousPage;
