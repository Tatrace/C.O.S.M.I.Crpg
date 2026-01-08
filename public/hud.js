import { socket, joinHud } from "./shared-socket.js";

const hudId = joinHud();

// elementos
const vidaText = document.getElementById("vida-text");
const manaText = document.getElementById("mana-text");
const vidaBar = document.getElementById("vida-bar");
const manaBar = document.getElementById("mana-bar");
const dadoBox = document.getElementById("dado-resultado");

socket.on("hud-update", data => {
  const { vidaAtual, vidaMax, manaAtual, manaMax, nivel } = data;

  vidaText.textContent = `${vidaAtual}/${vidaMax}`;
  manaText.textContent = `${manaAtual}/${manaMax}`;

  vidaBar.style.width = `${(vidaAtual / vidaMax) * 100}%`;
  manaBar.style.width = `${(manaAtual / manaMax) * 100}%`;

  // animação de dano
  vidaBar.classList.add("hit");
  setTimeout(() => vidaBar.classList.remove("hit"), 300);
});

socket.on("dice-result", roll => {
  dadoBox.innerHTML = "";

  roll.resultados.forEach(r => {
    const el = document.createElement("div");
    el.className = "dice";
    el.textContent = r;
    dadoBox.appendChild(el);
  });

  if (roll.critico) dadoBox.classList.add("crit");
  if (roll.falha) dadoBox.classList.add("fail");

  setTimeout(() => {
    dadoBox.innerHTML = "";
    dadoBox.classList.remove("crit", "fail");
  }, 15000);
});
