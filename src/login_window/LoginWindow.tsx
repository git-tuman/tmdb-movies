import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";
import { FORMS_TEXTS, INITIAL_VALUES_INPUT } from "../shared/constants";
import { actionCreatorChangeEmail } from "../redux/reducerCredentials";
import { deleteCookie, setCookie } from "../shared/cookies";
import { store } from "../redux/store";
import { selectorsCredentials } from "../redux/selectors";
import { fetchCredentials } from "../api/api";

function LoginWindow() {
    const email = useSelector(selectorsCredentials.email);

    const navigate = useNavigate();

    function handleExitEmailForm() {
        navigate("/");
    }

    function handleEntryEmail(email: string) {
        store.dispatch(actionCreatorChangeEmail(email));

        setCookie("email", email);
    }

    function handleExitTokenForm() {
        store.dispatch(actionCreatorChangeEmail(""));

        deleteCookie("email");
    }

    function handleEntryToken(
        token: string,
        setIsErrorInput: (isErrorInput: boolean) => void
    ) {
        store.dispatch(fetchCredentials(token)).then(() => {
            const state = store.getState();
            const error = state.apiCredentials.error;

            if (error !== null) {
                setIsErrorInput(true);
            } else {
                setCookie("token", token);
                setCookie("username", state.credentials.username);
                setCookie("account_id", state.credentials.account_id);

                navigate("/");
            }
        });
    }

    return (
        <>
            {!email && (
                <AuthModal
                    formText={FORMS_TEXTS.GET_TOKEN_FORM}
                    callbackExit={handleExitEmailForm}
                    callbackEntry={handleEntryEmail}
                    valueInput={INITIAL_VALUES_INPUT.EMAIL}
                />
            )}
            {email && (
                <AuthModal
                    formText={FORMS_TEXTS.SET_TOKEN_FORM}
                    callbackExit={handleExitTokenForm}
                    callbackEntry={handleEntryToken}
                    valueInput={INITIAL_VALUES_INPUT.TOKEN}
                />
            )}
        </>
    );
}

export default LoginWindow;
