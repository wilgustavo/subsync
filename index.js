const moment = require('moment');

const fs = require('fs');
const readline = require('readline');

const rs = fs.createReadStream('./pruebas/mm.srt');

const rl = readline.createInterface({
  input: rs
});

rl.on('line', line => {
  console.log(procesarLinea(line));
});

function procesarLinea(linea) {
  const regex = /^(\d{2}:\d{2}:\d{2},\d{3})\s-->\s(\d{2}:\d{2}:\d{2},\d{3})/;
  const match = regex.exec(linea);
  if (match) {
    return `${ajustarTiempo(match[1], 1000)} --> ${ajustarTiempo(match[2], 1000)}`;
  }

  return linea;
}

function ajustarTiempo(tiempo, delta) {
  const mascara = 'HH:mm:ss,SSS';
  return moment(tiempo, mascara).add(delta, 'ms').format(mascara);
}