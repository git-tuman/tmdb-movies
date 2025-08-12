import React, { memo } from "react";

import { CircularProgress, Pagination, Stack } from "@mui/material";
import { actionCreatorChangePage } from "../redux/reducerFilters";
import { store } from "../redux/store";
import { useSelector } from "react-redux";
import { selectorsDetailsListsMovies } from "../redux/selectors";

const PaginationPages = memo(() => {
    const totalPages = useSelector(selectorsDetailsListsMovies.total_pages);
    const page = useSelector(selectorsDetailsListsMovies.page);

    function handleChangePage(
        event: React.ChangeEvent<unknown>,
        newValue: number
    ) {
        store.dispatch(actionCreatorChangePage(newValue));

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    if (totalPages === undefined) {
        return <CircularProgress size={30} />;
    }

    return (
        <Stack sx={{ alignItems: "center" }}>
            <Pagination
                count={totalPages > 500 ? 500 : totalPages}
                page={page}
                color="primary"
                onChange={(event, value) => handleChangePage(event, value)}
            />
        </Stack>
    );
});

export default PaginationPages;
