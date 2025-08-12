import React from "react";

import HeaderMainWindow from "../shared/HeaderMainWindow";
import ContainerMainWindow from "./ContainerMainWindow";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TEXT_NO_LOGIN } from "../shared/constants";
import { useSelector } from "react-redux";
import { selectorsCredentials } from "../redux/selectors";

// что бы не было множественных запросов на сервер, сделал таймауты в
// некоторых useEffect, не думаю что это хорошо, поэтому исправить

function MainWindow() {
    const token = useSelector(selectorsCredentials.token);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <HeaderMainWindow />

            {token === "" && (
                <Box sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h5" color="#9e9e9e">
                        {TEXT_NO_LOGIN}
                    </Typography>
                </Box>
            )}

            {token !== "" && <ContainerMainWindow />}
        </Box>
    );
}

export default MainWindow;
