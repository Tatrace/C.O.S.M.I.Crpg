const socket = io();

function aplicarHUD() {
  socket.emit("updateHud", {
    id: "leafone", // HUD alvo
    name: nome.value,
    level: nivel.value,
    vidaAtual: vidaAtual.value,
    vidaMax: vidaMax.value,
    manaAtual: manaAtual.value,
    manaMax: manaMax.value,
    showVidaBar: true,
    dice: { rolls: [] }
  });
}

function rolarDado() {
  const r = Math.floor(Math.random() * 20) + 1;

  socket.emit("updateHud", {
    id: "leafone",
    dice: { rolls: [r] }
  });
}
