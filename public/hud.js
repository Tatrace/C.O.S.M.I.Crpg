console.log("HUD carregado");

const socket = io();

const params = new URLSearchParams(window.location.search);
const hudId = params.get("hud") || "leafone";

socket.emit("join", hudId);

socket.on("connect", () => {
  console.log("Conectado ao socket:", socket.id);
});

socket.on("hudUpdate", s => {
  console.log("HUD UPDATE:", s);

  document.getElementById("name").innerText = s.name ?? "";
  document.getElementById("levelHud").innerText = s.level ?? "";

  document.getElementById("vidaText").innerText =
    `${s.vidaAtual}/${s.vidaMax}`;

  document.getElementById("manaText").innerText =
    `${s.manaAtual}/${s.manaMax}`;

  const vidaFill = document.getElementById("vidaFill");
  const vidaBar = document.getElementById("vidaBar");

  vidaBar.style.display = s.showVidaBar ? "block" : "none";
  vidaFill.style.width =
    `${(s.vidaAtual / s.vidaMax) * 100}%`;

  const diceContainer = document.getElementById("diceContainer");
  diceContainer.innerHTML = "";

  if (s.dice?.rolls) {
    s.dice.rolls.forEach(v => {
      const d = document.createElement("div");
      d.className = "diceHex";
      d.textContent = v;
      diceContainer.appendChild(d);
    });
  }
});
