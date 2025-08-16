// export const BASE_URL = "/api";
export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://devtinderbackend-qzeu.onrender.com";
