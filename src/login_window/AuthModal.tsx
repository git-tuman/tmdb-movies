import React, { useState, useRef } from "react";

import {
    Box,
    Button,
    FormHelperText,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { FORMS_TEXTS } from "../shared/constants";

type ModalWindowProps = {
    formText: typeof FORMS_TEXTS.GET_TOKEN_FORM;
    callbackExit: () => void;
    callbackEntry: Function;
    valueInput: string;
};

function AuthModal({
    formText,
    callbackExit,
    callbackEntry,
    valueInput,
}: ModalWindowProps) {
    const inputRef = useRef<string | null>(valueInput);
    const [isErrorInput, setIsErrorInput] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputRef.current = event.target.value;
        setIsErrorInput(false);
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        callbackEntry(inputRef.current, setIsErrorInput);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1e88e5",
                width: "100%",
                height: "100vh",
            }}
        >
            <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={10}
                sx={{
                    display: "grid",
                    gap: 2,
                    width: "30%",
                    minWidth: 300,
                    maxWidth: 500,
                    p: 4,
                }}
            >
                <Typography variant="h5">{formText.MAIN_TITLE}</Typography>
                <TextField
                    fullWidth
                    variant="standard"
                    label={formText.LABEL_FIELD}
                    defaultValue={inputRef.current}
                    onChange={handleChange}
                    required
                    color={isErrorInput ? "error" : "primary"}
                    error={isErrorInput}
                />
                {isErrorInput && (
                    <FormHelperText error sx={{ p: 0, m: 0 }}>
                        Невалидный токен или TMDB не доступен в вашем регионе.
                    </FormHelperText>
                )}
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button onClick={callbackExit}>
                        {formText.NAME_BTN_EXIT}
                    </Button>
                    <Button type="submit">{formText.NAME_BTN_ENTRY}</Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default AuthModal;
