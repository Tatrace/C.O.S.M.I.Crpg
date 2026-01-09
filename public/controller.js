function aplicarStatus() {
  sendHudUpdate({
    vidaAtual: Number(document.getElementById("vidaAtual").value),
    vidaMax: Number(document.getElementById("vidaMax").value),
    manaAtual: Number(document.getElementById("manaAtual").value),
    manaMax: Number(document.getElementById("manaMax").value),
    nivel: Number(document.getElementById("nivel").value)
  });
}

function rolarDado() {
  const faces = 20;
  const resultado = Math.floor(Math.random() * faces) + 1;

  sendHudUpdate({
    dado: resultado,
    ts: Date.now()
  });
}
