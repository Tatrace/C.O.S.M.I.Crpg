const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// arquivos estáticos
app.use(express.static("public"));

// ROTA RAIZ -> LOGIN
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

io.on("connection", socket => {

  socket.on("join", id => {
    socket.join(id);
    console.log("HUD conectado:", id);
  });

  socket.on("updateHud", data => {
    io.to(data.id).emit("hudUpdate", data);
  });

});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
