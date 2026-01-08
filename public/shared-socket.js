import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

export const socket = io();

export function joinHUD(hudId) {
  socket.emit("join-hud", hudId);
}

export function sendToHUD(hudId, data) {
  socket.emit("hud-update", { hudId, data });
}

