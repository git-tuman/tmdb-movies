export type Credentials = {
    email: string;
    token: string;
    username: string;
    account_id: string;
};

type Action = {
    type: string;
    payload: string;
};

const initialCredentials: Credentials = {
    email: "",
    token: "",
    username: "",
    account_id: "",
};

const CHANGE_EMAIL = "CHANGE_EMAIL";
const CHANGE_TOKEN = "CHANGE_TOKEN";
const CHANGE_USERNAME = "CHANGE_USERNAME";
const CHANGE_ACCOUNT_ID = "CHANGE_ACCOUNT_ID";
const CLEAR_CREDENTIALS = "CLEAR_CREDENTIALS";

export function actionCreatorChangeEmail(value: string) {
    return { type: CHANGE_EMAIL, payload: value };
}

export function actionCreatorChangeToken(value: string) {
    return { type: CHANGE_TOKEN, payload: value };
}

export function actionCreatorChangeUsername(value: string) {
    return { type: CHANGE_USERNAME, payload: value };
}

export function actionCreatorChangeAccountId(value: string) {
    return { type: CHANGE_ACCOUNT_ID, payload: value };
}

export function actionCreatorDeleteCredentials() {
    return { type: CLEAR_CREDENTIALS };
}

export function reducerCrendentials(
    state = initialCredentials,
    action: Action
) {
    switch (action.type) {
        case CHANGE_EMAIL:
            return Object.assign({}, state, { email: action.payload });

        case CHANGE_TOKEN:
            return Object.assign({}, state, { token: action.payload });

        case CHANGE_USERNAME:
            return Object.assign({}, state, { username: action.payload });

        case CHANGE_ACCOUNT_ID:
            return Object.assign({}, state, { account_id: action.payload });

        case CLEAR_CREDENTIALS:
            return initialCredentials;

        default:
            return state;
    }
}
