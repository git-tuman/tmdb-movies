import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ContainerDetailsPage from "./details_film_window/DetailsFilmWindow";
import MainWindow from "./main_window/MainWindow";
import LoginWindow from "./login_window/LoginWindow";

import { Provider } from "react-redux";
import {
  actionCreatorChangeAccountId,
  actionCreatorChangeEmail,
  actionCreatorChangeToken,
  actionCreatorChangeUsername,
  Credentials,
} from "./redux/reducerCredentials";
import {
  getAllCookies,
  getTokenFromCookies,
  setObjInCookies,
} from "./shared/cookies";
import { store } from "./redux/store";

const changeAllCredentials = (data: Credentials) => {
  store.dispatch(actionCreatorChangeEmail(data.email));
  store.dispatch(actionCreatorChangeToken(data.token));
  store.dispatch(actionCreatorChangeUsername(data.username));
  store.dispatch(actionCreatorChangeAccountId(data.account_id));
};

const getCredentialsFromCookie = () => {
  const token = getTokenFromCookies();

  if (token !== undefined) {
    const allCookies = getAllCookies();

    const credentials = {
      email: allCookies.email,
      token: allCookies.token,
      username: allCookies.username,
      account_id: allCookies.account_id,
    };

    // снова продлеваю жизнь куки если
    // пользователь успел зайти за сутки
    setObjInCookies(credentials);

    changeAllCredentials(credentials);
  }
};

getCredentialsFromCookie();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/tmdb-movies" replace />} />
          <Route path="/tmdb-movies" element={<MainWindow />} />
          <Route
            path="/tmdb-movies/:movie_id"
            element={<ContainerDetailsPage />}
          />
          <Route path="/tmdb-movies/login" element={<LoginWindow />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
