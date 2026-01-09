const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const PORT = process.env.PORT || 3000;

// arquivos públicos
app.use(express.static(path.join(__dirname, "public")));

// rota raiz
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// socket
io.on("connection", (socket) => {
  console.log("🟢 Conectado:", socket.id);

  socket.on("hud:update", (payload) => {
    io.emit(`hud:${payload.id}`, payload.data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Desconectado:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🔥 Rodando na porta ${PORT}`);
});
