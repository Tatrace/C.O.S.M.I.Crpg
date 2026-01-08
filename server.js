import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, "public")));

let state = {
  name: "Leafone",
  level: 6,
  vida: { atual: 36, max: 100 },
  mana: { atual: 15, max: 15 },
  dado: null,
  showVidaBar: true
};

io.on("connection", socket => {
  socket.emit("state:update", state);

  socket.on("state:update", newState => {
    state = { ...state, ...newState };
    io.emit("state:update", state);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});
