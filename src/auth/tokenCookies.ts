import cookies from "js-cookie";

export const getTokenCookie = () => cookies.get("token");
export const setTokenCookie = (value: string) =>
  cookies.set("token", value, { expires: 1 / 24 });
export const removeTokenCookie = () => cookies.remove("token");
