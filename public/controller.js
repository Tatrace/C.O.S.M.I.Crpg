const socket = io();

// HUD alvo
const HUD_ID = "leafone";

// entra na sala
socket.emit("join", HUD_ID);

function aplicarHUD() {
  socket.emit("updateHud", {
    id: HUD_ID,
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
    id: HUD_ID,
    dice: { rolls: [r] }
  });
}
