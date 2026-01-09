listenHudUpdates((data) => {

  if (data.vidaAtual !== undefined) {
    document.getElementById("vidaTexto").innerText =
      `${data.vidaAtual}/${data.vidaMax}`;

    const pct = (data.vidaAtual / data.vidaMax) * 100;
    document.getElementById("vidaBar").style.width = pct + "%";
  }

  if (data.manaAtual !== undefined) {
    document.getElementById("manaTexto").innerText =
      `${data.manaAtual}/${data.manaMax}`;
  }

  if (data.nivel !== undefined) {
    document.getElementById("nivel").innerText = data.nivel;
  }

  if (data.dado) {
    const el = document.getElementById("dado");
    el.innerText = data.dado;
    el.classList.add("dado-anim");

    setTimeout(() => {
      el.innerText = "";
      el.classList.remove("dado-anim");
    }, 15000);
  }
});
