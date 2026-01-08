let dadoTimeout = null;

window.updateHUD = function (data) {
  document.getElementById("hudNome").innerText = data.nome;
  document.getElementById("vidaTxt").innerText =
    `${data.vidaAtual}/${data.vidaMax}`;
  document.getElementById("manaTxt").innerText =
    `${data.manaAtual}/${data.manaMax}`;

  const vidaPerc = (data.vidaAtual / data.vidaMax) * 100;
  document.getElementById("vidaBar").style.width = vidaPerc + "%";

  document.getElementById("hud").classList.add("shake");
  setTimeout(() => {
    document.getElementById("hud").classList.remove("shake");
  }, 300);
};

window.mostrarDado = function (dice) {
  const el = document.getElementById("diceResult");
  el.innerHTML = dice.resultados.join(" ");

  el.className = "dice show";
  if (dice.critico) el.classList.add("critico");
  if (dice.falha) el.classList.add("falha");

  clearTimeout(dadoTimeout);
  dadoTimeout = setTimeout(() => {
    el.className = "dice";
  }, 15000);
};

