import { Box } from "@mui/material";
import React, { memo } from "react";

import PaginationPages from "./PaginationPages";
import FiltersContent from "./FiltersContent";

const FiltersContainer = memo(() => {
    return (
        <Box
            boxShadow={1}
            sx={{
                display: "grid",
                gap: 8,
                p: 2,
                width: "20%",
                minWidth: 200,
                borderRadius: 1,
                flexDirection: "column",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                    boxShadow: 6,
                },
            }}
        >
            <Box sx={{ alignContent: "start" }}>
                <FiltersContent />
            </Box>

            <Box sx={{ alignContent: "end" }}>
                <PaginationPages />
            </Box>
        </Box>
    );
});

export default FiltersContainer;
