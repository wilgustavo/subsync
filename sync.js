const moment = require("moment");

function sync(linea, tiempo = 0) {
  const regex = /^(\d{2}:\d{2}:\d{2},\d{3})\s-->\s(\d{2}:\d{2}:\d{2},\d{3})/;
  const match = regex.exec(linea);
  if (match) {
    return ajustarLinea(match[1], match[2], tiempo);
  }

  return linea;
}

function ajustarLinea(desde, hasta, ms) {
  return `${ajustarTiempo(desde, ms)} --> ${ajustarTiempo(hasta, ms)}`;
}

function ajustarTiempo(tiempo, delta) {
  const mascara = "HH:mm:ss,SSS";
  return moment(tiempo, mascara)
    .add(delta, "ms")
    .format(mascara);
}

module.exports = sync;
