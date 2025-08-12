import React, { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Box, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  ALMOST_TRANSPARENT_COLOR,
  DEFAULT_COLOR_HEADER,
  TITLE_HEADER_MAIN_WINDOW,
} from "./constants";
import { useSelector } from "react-redux";
import { actionCreatorDeleteCredentials } from "../redux/reducerCredentials";
import { deleteAllCookies } from "./cookies";
import { store } from "../redux/store";
import { selectorsCredentials } from "../redux/selectors";

const HeaderMainWindow = memo(
  ({ filmName = null }: { filmName?: string | null }) => {
    const username = useSelector(selectorsCredentials.username);

    const location = useLocation();
    const navigate = useNavigate();

    const customBackgroundColor =
      location.pathname === "/tmdb-movies"
        ? DEFAULT_COLOR_HEADER
        : ALMOST_TRANSPARENT_COLOR;

    return (
      <Box
        sx={{
          display: "flex",
          backgroundColor: customBackgroundColor,
          p: 2,
          justifyContent: "space-between",
          boxShadow: 1,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <Typography variant="h5" color="white">
          {TITLE_HEADER_MAIN_WINDOW}
          {filmName !== null && " - " + filmName}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {username !== "" && (
            <Typography variant="h5" color="white">
              {username}
            </Typography>
          )}

          <IconButton
            sx={{
              padding: 0,
            }}
            size="small"
            onClick={() => {
              store.dispatch(actionCreatorDeleteCredentials());

              deleteAllCookies();

              navigate("/tmdb-movies/login");
            }}
          >
            <AccountCircleIcon sx={{ color: "white", width: 32, height: 32 }} />
          </IconButton>
        </Box>
      </Box>
    );
  }
);

export default HeaderMainWindow;
