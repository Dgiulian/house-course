import cookies from "js-cookie";

export const getTokenCookie = () => cookies.get("token");
export const setTokenCookie = (token: string) => {
  fetch("/api/login", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
};
export const removeTokenCookie = () => {
  fetch("/api/logout", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
};
