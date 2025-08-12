import React from "react";

import ContentMainWindow from "./ContentMainWindow";

import { Box } from "@mui/material";
import FiltersContainer from "./FiltersContainer";

function ContainerMainWindow() {
    return (
        <Box sx={{ display: "flex", p: 2, gap: 2 }}>
            <FiltersContainer />

            <ContentMainWindow />
        </Box>
    );
}

export default ContainerMainWindow;
