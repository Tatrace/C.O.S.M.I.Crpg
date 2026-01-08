const socket = io();

/* ==========================
   HUD ID (URL ?hud=xxx)
========================== */
function getHudId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("hud");
}

const hudId = getHudId();

if (!hudId) {
  console.error("HUD sem ID!");
}

/* ==========================
   ENTRA NA SALA
========================== */
socket.emit("joinRoom", hudId);

/* ==========================
   ATUALIZA HUD
========================== */
socket.on("hud:update", (estado) => {
  document.getElementById("hud").classList.remove("hidden");

  document.getElementById("nome").textContent = estado.nome;
  document.getElementById("nivel").textContent = estado.nivel;

  document.getElementById("vidaTexto").textContent =
    `${estado.vidaAtual}/${estado.vidaMax}`;

  document.getElementById("manaTexto").textContent =
    `${estado.manaAtual}/${estado.manaMax}`;

  const pctVida = Math.max(
    0,
    Math.min(100, (estado.vidaAtual / estado.vidaMax) * 100)
  );

  const vidaBarra = document.getElementById("vidaBarra");
  vidaBarra.style.width = pctVida + "%";

  /* Tremida quando perde vida */
  vidaBarra.classList.remove("damage");
  if (estado.dano) {
    vidaBarra.classList.add("damage");
  }

  /* Resultado do dado */
  if (estado.dadoResultado !== undefined) {
    mostrarDado(estado.dadoResultado, estado.tipoDado);
  }
});

/* ==========================
   DADO COM AUTO-SUMIR
========================== */
let dadoTimeout = null;

function mostrarDado(valor, tipo) {
  const el = document.getElementById("dadoResultado");

  el.textContent = valor;
  el.className = "dado";

  if (tipo === "critico") el.classList.add("critico");
  if (tipo === "falha") el.classList.add("falha");

  clearTimeout(dadoTimeout);

  dadoTimeout = setTimeout(() => {
    el.textContent = "";
    el.className = "dado";
  }, 15000);
}

