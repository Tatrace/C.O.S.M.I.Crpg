const SAVE_KEY = "COSMIC_STATE";

export function getState() {
  return JSON.parse(localStorage.getItem(SAVE_KEY)) || {
    name: "Nome",
    level: 6,
    vidaAtual: 109,
    vidaMax: 109,
    manaAtual: 15,
    manaMax: 15,
    diceResult: null,
    showBar: true
  };
}

export function setState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

