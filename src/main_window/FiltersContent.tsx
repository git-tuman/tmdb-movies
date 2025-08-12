import React, { memo, useEffect } from "react";
import {
    actionCreatorChangeSelectedGenres,
    actionCreatorChangeSortOption,
    actionCreatorChangeSortYears,
    actionCreatorChangeTitleMovie,
    actionCreatorClearFilters,
    sortOptionsList,
} from "../redux/reducerFilters";

import {
    Autocomplete,
    Box,
    Checkbox,
    CircularProgress,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
    DETAILS,
    PLACEHOLDER_INPUT_GENRES,
    TITLE_FILTERS,
    TITLE_INPUT_LABEL_GENRES,
    TITLE_INPUT_LABEL_SORT,
    TITLE_INPUT_LABEL_TITLE_FILM,
} from "../shared/constants";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { Genre } from "../redux/reducerMovies";
import { selectorsFilter, selectorsListsMovies } from "../redux/selectors";
import { fetchGenres } from "../api/api";

const HeaderFilters = memo(() => {
    function handleClearFilter() {
        store.dispatch(actionCreatorClearFilters());
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography variant="h5">{TITLE_FILTERS}</Typography>

            <IconButton onClick={handleClearFilter}>
                <ClearIcon />
            </IconButton>
        </Box>
    );
});

const SearchFieldMovieTitle = memo(() => {
    const titleMovie = useSelector(selectorsFilter.titleMovie);

    function handleChangeTitleMovie(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        store.dispatch(actionCreatorChangeTitleMovie(event.target.value));
    }

    return (
        <TextField
            variant="standard"
            label={TITLE_INPUT_LABEL_TITLE_FILM}
            value={titleMovie}
            onChange={(event) => handleChangeTitleMovie(event)}
        />
    );
});

const FilterSort = memo(() => {
    const sortOption = useSelector(selectorsFilter.sortOption);

    const sorting = sortOptionsList;

    return (
        <FormControl variant="standard" fullWidth>
            <InputLabel>{TITLE_INPUT_LABEL_SORT}</InputLabel>

            <Select value={sortOption}>
                {sorting.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                        onClick={() => {
                            store.dispatch(actionCreatorChangeSortOption(item));
                        }}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});

const FilterYears = memo(() => {
    const sortYears = useSelector(selectorsFilter.sortYears);

    function handleChangeYears(event: Event, newValue: number[]) {
        store.dispatch(actionCreatorChangeSortYears(newValue));
    }

    return (
        <Box sx={{ display: "grid", gap: 4 }}>
            <Typography variant="body1">
                {DETAILS.YEAR}: {sortYears[0]} - {sortYears[1]}
            </Typography>

            <Slider
                size="small"
                min={1950}
                max={new Date().getFullYear()}
                value={sortYears}
                onChange={(event, value) =>
                    handleChangeYears(event, value as number[])
                }
                valueLabelDisplay="auto"
                disableSwap
            ></Slider>
        </Box>
    );
});

const FilterGenres = memo(() => {
    const listAllGenres = useSelector(selectorsListsMovies.listAllGenres);
    const selectedGenres = useSelector(selectorsFilter.selectedGenres);

    function handleChangeSelectedGenre(
        event: React.SyntheticEvent<Element, Event>,
        newValue: Genre[]
    ) {
        const idsGenres = newValue.map((genre) => genre.id);

        store.dispatch(actionCreatorChangeSelectedGenres(idsGenres));
    }

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    if (listAllGenres === null) {
        return <CircularProgress size={30} />;
    }

    return (
        <Autocomplete
            fullWidth
            multiple
            options={listAllGenres}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => handleChangeSelectedGenre(event, value)}
            value={listAllGenres.filter((genre: Genre) =>
                selectedGenres.includes(genre.id)
            )}
            renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;

                return (
                    <li key={key} {...optionProps}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField
                    variant="standard"
                    {...params}
                    label={TITLE_INPUT_LABEL_GENRES}
                    placeholder={PLACEHOLDER_INPUT_GENRES}
                />
            )}
        />
    );
});

function FiltersContent() {
    const titleMovie = useSelector(selectorsFilter.titleMovie);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            store.dispatch(fetchGenres());
        }, 300);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <Box sx={{ display: "grid", gap: 4 }}>
            <HeaderFilters />

            <SearchFieldMovieTitle />

            {titleMovie === "" && (
                <>
                    <FilterSort />

                    <FilterYears />

                    <FilterGenres />
                </>
            )}
        </Box>
    );
}

export default FiltersContent;
