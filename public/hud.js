import { socket, joinHUD } from "./shared-socket.js";

const params = new URLSearchParams(window.location.search);
const HUD_ID = params.get("id") || "leafone";

joinHUD(HUD_ID);

socket.on("hud-update", (data) => {
  if (data.nome) {
    document.getElementById("nome").innerText = data.nome;
    document.getElementById("nivel").innerText = data.nivel;
    document.getElementById("vida").innerText =
      `${data.vidaAtual}/${data.vidaMax}`;
    document.getElementById("mana").innerText =
      `${data.manaAtual}/${data.manaMax}`;

    animarVida(data.vidaAtual, data.vidaMax);
  }

  if (data.dado) {
    mostrarResultadoDado(data.dado);
  }
});

function animarVida(atual, max) {
  const barra = document.getElementById("vida-barra");
  const pct = (atual / max) * 100;
  barra.style.width = pct + "%";

  barra.classList.remove("hit");
  void barra.offsetWidth;
  barra.classList.add("hit");
}

function mostrarResultadoDado(dado) {
  const el = document.getElementById("dado-resultado");
  el.innerHTML = "";

  dado.resultados.forEach((r) => {
    const d = document.createElement("div");
    d.className = "dado";

    if (r === 1) d.classList.add("falha");
    if (r === Number(dado.tipo.replace("d", ""))) d.classList.add("critico");

    d.innerText = r;
    el.appendChild(d);
  });

  setTimeout(() => {
    el.innerHTML = "";
  }, 15000);
}

