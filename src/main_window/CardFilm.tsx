import React from "react";
import { useNavigate } from "react-router-dom";

import FavoriteButton from "../shared/FavoriteButton";

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import {
  BASE_URL_IMAGE,
  COLOR_GOLD,
  COLOR_GRAY,
  DETAILS,
  SIZE_POSTER_IMAGE,
} from "../shared/constants";
import { Movie } from "../redux/reducerMovies";

function CardFilm({ film }: { film: Movie }) {
  const posterUrl = `${BASE_URL_IMAGE}${SIZE_POSTER_IMAGE}${film.poster_path}`;

  const navigate = useNavigate();

  function handleClickCardMovie() {
    navigate(`/tmdb-movies/${film.id}`);
  }

  return (
    <Card
      onClick={handleClickCardMovie}
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: 6,
        },
        height: 350,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: "65%",
          objectFit: "cover",
        }}
        src={posterUrl}
        alt={film.title}
        loading="lazy"
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
            }}
          >
            {film.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {DETAILS.RATES}: {film.vote_average.toFixed(1)}{" "}
          </Typography>
        </Box>
        <Box>
          <FavoriteButton
            id={film.id}
            colorActive={COLOR_GOLD}
            colorDeactive={COLOR_GRAY}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default CardFilm;
