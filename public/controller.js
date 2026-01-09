const socket = io();

function aplicar() {
  const payload = {
    id: "leafone", // 🔥 HUD alvo
    nome: document.getElementById("nome").value,
    nivel: document.getElementById("nivel").value,
    vida: document.getElementById("vida").value,
    vidaMax: document.getElementById("vidaMax").value,
    mana: document.getElementById("mana").value,
    manaMax: document.getElementById("manaMax").value
  };

  socket.emit("updateHud", payload);
}

function rolarDado() {
  const resultado = Math.floor(Math.random() * 20) + 1;

  socket.emit("updateHud", {
    id: "leafone",
    dado: resultado
  });
}
