import { sendToHUD } from "./shared-socket.js";

const HUD_ID = "leafone"; // 🔥 TROQUE PARA CADA PERSONAGEM

function getValue(id) {
  return Number(document.getElementById(id).value);
}

document.getElementById("aplicar").addEventListener("click", () => {
  const data = {
    nome: document.getElementById("nome").value,
    nivel: getValue("nivel"),
    vidaAtual: getValue("vidaAtual"),
    vidaMax: getValue("vidaMax"),
    manaAtual: getValue("manaAtual"),
    manaMax: getValue("manaMax"),
  };

  sendToHUD(HUD_ID, data);
});

document.getElementById("rolar").addEventListener("click", () => {
  const tipo = document.getElementById("dado").value;
  const qtd = Number(document.getElementById("quantidade").value);

  const resultados = [];
  const faces = Number(tipo.replace("d", ""));

  for (let i = 0; i < qtd; i++) {
    resultados.push(1 + Math.floor(Math.random() * faces));
  }

  sendToHUD(HUD_ID, {
    dado: {
      tipo,
      resultados,
      critico: resultados.includes(faces),
      falha: resultados.includes(1),
    },
  });
});

