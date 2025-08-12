import React from "react";

import { Box, Typography } from "@mui/material";

// библиотека для конвертирования стран формата iso в полноформат
import countries from "i18n-iso-countries";
import ru from "i18n-iso-countries/langs/ru.json";
import {
    ALMOST_TRANSPARENT_COLOR,
    DETAILS,
    TITLE_DETAILS,
} from "../shared/constants";
import { useSelector } from "react-redux";
import { selectorsDetailsMovie } from "../redux/selectors";

countries.registerLocale(ru);

function getCountryName(country: string[]) {
    return countries.getName(country[0], "ru") || country[0];
}

function DetailElem({ title, value }: { title: string; value: any }) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h5">{value}</Typography>
        </Box>
    );
}

function DetailsElem() {
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
            <Typography variant="h4">{TITLE_DETAILS}</Typography>

            <Box>
                <DetailElem
                    key={DETAILS.RATES}
                    title={DETAILS.RATES}
                    value={details.vote_average.toFixed(1)}
                />
                <DetailElem
                    key={DETAILS.COUNTRY}
                    title={DETAILS.COUNTRY}
                    value={getCountryName(details.origin_country)}
                />
                <DetailElem
                    key={DETAILS.YEAR}
                    title={DETAILS.YEAR}
                    value={new Date(details.release_date).getFullYear()}
                />
                <DetailElem
                    title={DETAILS.BUDGET}
                    value={"$" + details.budget}
                />
                <DetailElem
                    title={DETAILS.TIME.TITLE}
                    value={
                        Math.floor(details.runtime / 60) +
                        DETAILS.TIME.HOUR +
                        " " +
                        (details.runtime % 60) +
                        DETAILS.TIME.MINUTE
                    }
                />
            </Box>
        </Box>
    );
}

export default DetailsElem;
