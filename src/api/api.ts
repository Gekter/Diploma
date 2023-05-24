import axios from "axios";
import { io } from "socket.io-client";

const instanse = axios.create({
  timeout: 10000,
  baseURL: process.env.REACT_APP_API_URL,
});

export const socket = io(
  process.env.REACT_APP_SOCKET_URL || "ws://localhost:3011",
  {
    withCredentials: true,
    transports: ["websocket", "polling", "flashsocket"],
  }
);

socket.io.on("open", () => {});

export default instanse;
