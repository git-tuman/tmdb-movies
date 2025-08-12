import Cookies from "js-cookie";

export const getTokenFromCookies = () => Cookies.get("token");
export const getAccountIdFromCookies = () => Cookies.get("account_id");
export const getAllCookies = () => Cookies.get();

export const setCookie = (key: string, value: string | number) => {
    value = value.toString();

    Cookies.set(key, value, {
        sameSite: "Strict",
        expires: 1,
    });
};

export const setObjInCookies = (obj: { [key: string]: string | number }) => {
    Object.entries(obj).forEach(([key, value]) => {
        setCookie(key, value);
    });
};

export const deleteCookie = (key: string) => {
    Cookies.remove(key);
};

export const deleteAllCookies = () => {
    const allCookies = Cookies.get();

    Object.keys(allCookies).forEach((key) => {
        Cookies.remove(key);
    });
};
