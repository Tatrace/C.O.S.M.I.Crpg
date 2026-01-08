import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;

// servir arquivos estáticos
app.use(express.static("public"));

// estado global por HUD ID
const hudState = {};

// socket
io.on("connection", socket => {
  console.log("🟢 Conectado:", socket.id);

  socket.on("join-hud", hudId => {
    socket.join(hudId);

    // envia estado atual ao conectar
    if (hudState[hudId]) {
      socket.emit("hud-update", hudState[hudId]);
    }
  });

  socket.on("update-hud", ({ hudId, data }) => {
    hudState[hudId] = {
      ...hudState[hudId],
      ...data
    };

    io.to(hudId).emit("hud-update", hudState[hudId]);
  });

  socket.on("roll-result", ({ hudId, roll }) => {
    io.to(hudId).emit("dice-result", roll);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Desconectado:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("🔥 Server rodando na porta", PORT);
});

// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ===== SERVIR ARQUIVOS ESTÁTICOS =====
app.use(express.static(path.join(__dirname, "public")));

// ===== ROTA RAIZ (IMPORTANTE) =====
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// ===== SOCKET.IO =====
io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado:", socket.id);

  socket.on("hud:update", (data) => {
    socket.broadcast.emit("hud:update", data);
  });

  socket.on("dice:roll", (data) => {
    socket.broadcast.emit("dice:roll", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado:", socket.id);
  });
});

// ===== PORTA (RENDER) =====
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("🔥 Servidor rodando na porta", PORT);
});

