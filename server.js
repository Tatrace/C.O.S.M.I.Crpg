const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Pasta pública
app.use(express.static(path.join(__dirname, "public")));

// ROTA PRINCIPAL → LOGIN
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// (opcional) rotas diretas úteis
app.get("/controller", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "controller.html"));
});

app.get("/hud", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hud.html"));
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
