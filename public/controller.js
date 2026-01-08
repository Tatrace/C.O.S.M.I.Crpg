function aplicarStatus() {
  const nome = document.getElementById("nome").value;
  const nivel = Number(document.getElementById("nivel").value);

  const vidaAtual = Number(document.getElementById("vidaAtual").value);
  const vidaMax = Number(document.getElementById("vidaMax").value);

  const manaAtual = Number(document.getElementById("manaAtual").value);
  const manaMax = Number(document.getElementById("manaMax").value);

  enviarHUD({
    nome,
    nivel,
    vidaAtual,
    vidaMax,
    manaAtual,
    manaMax
  });
}

function rolarDado() {
  const tipo = document.getElementById("tipoDado").value;
  const qtd = Number(document.getElementById("qtdDado").value);

  const resultados = [];
  for (let i = 0; i < qtd; i++) {
    resultados.push(Math.floor(Math.random() * Number(tipo.slice(1))) + 1);
  }

  enviarDado({
    tipo,
    resultados,
    critico: resultados.includes(20),
    falha: resultados.includes(1)
  });
}

