import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HeaderMainWindow from "../shared/HeaderMainWindow";
import TitleFilm from "./TitleFilm";
import ButtonPreviousPage from "./ButtonPreviousPage";
import DescriptionElem from "./DescriptionElem";
import DetailsElem from "./DetailsElem";
import OtherDetailsElems from "./OtherDetailsElems";

import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import { BASE_URL_IMAGE, SIZE_ORIGINAL_IMAGE } from "../shared/constants";
import { useSelector } from "react-redux";
import { refreshListFavoriteMovies } from "../shared/FavoriteButton";
import {
  selectorsCredentials,
  selectorsDetailsMovie,
  selectorsListsMovies,
} from "../redux/selectors";
import { store } from "../redux/store";
import { fetchCreditsMovie, fetchDetailsMovie } from "../api/api";
import { actionCreatorClearDetailsAndCreditsMovie } from "../redux/reducerDetailsMovie";

function ContentDetailsPage() {
  const listFavoriteMovies = useSelector(
    selectorsListsMovies.listFavoriteMovies
  );

  useEffect(() => {
    if (listFavoriteMovies === null) {
      refreshListFavoriteMovies();
    }
  }, [listFavoriteMovies]);

  const details = useSelector(selectorsDetailsMovie.details);

  const credits = useSelector(selectorsDetailsMovie.credits);

  const navigate = useNavigate();

  function handleClickBtnPreviousPage() {
    store.dispatch(actionCreatorClearDetailsAndCreditsMovie());
    navigate(`/tmdb-movies`);
  }

  if (listFavoriteMovies === null || details === null || credits === null) {
    return (
      <>
        <HeaderMainWindow />

        <LinearProgress color="inherit" />
      </>
    );
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${BASE_URL_IMAGE}${SIZE_ORIGINAL_IMAGE}${details.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <HeaderMainWindow filmName={details.title} />

      <Box
        sx={{
          display: "flex",
          p: 2,
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={BASE_URL_IMAGE + SIZE_ORIGINAL_IMAGE + details.poster_path}
          sx={{
            width: "30%",
            height: "30%",
            borderRadius: "8px",
            boxShadow: 1,
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: 6,
            },
          }}
          loading="lazy"
        />

        <Box sx={{ width: "70%" }}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <TitleFilm />

            <ButtonPreviousPage callback={handleClickBtnPreviousPage} />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "50%",
                }}
              >
                <DescriptionElem />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "50%",
                }}
              >
                <DetailsElem />

                <OtherDetailsElems />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function ContainerDetailsPage() {
  const token = useSelector(selectorsCredentials.token);

  const { movie_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (token !== "") {
        if (movie_id) {
          store.dispatch(fetchDetailsMovie(movie_id));

          store.dispatch(fetchCreditsMovie(movie_id));
        }
      } else {
        navigate("/tmdb-movies/login");
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [token, movie_id, navigate]);

  return <ContentDetailsPage />;
}

export default ContainerDetailsPage;
