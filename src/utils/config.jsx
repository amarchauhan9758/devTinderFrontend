import io from "socket.io-client";
import { BASE_URL } from "./globalApi";

export const createSocketConnection = () => {
  return io(BASE_URL);
};
