const { aulas } = { "aulas": [{ "cod turma": "NB1BIR0004-15SB", "turma": "Bases Epistemológicas da Ciência Moderna B1-Noturno (São Bernardo)", "prof_pratica": "0", "prof_teoria": "Anastasia Guidi Itokazu", "teoria": ["segunda das 19:00 às 21:00, semanal", "quinta das 21:00 às 23:00, quinzenal I"], "pratica": [""], "tpi": "3-0-4", "turno": "noturno" }, { "cod turma": "NA3BCK0104-15SA", "turma": "Interações Atômicas e Moleculares A3-Noturno (Santo André)", "prof_pratica": "0", "prof_teoria": "Luana Sucupira Pedroza", "teoria": ["terça das 19:00 às 21:00, semanal", "sexta das 21:00 às 23:00, quinzenal II"], "pratica": [""], "tpi": "3-0-4", "turno": "noturno" }, { "cod turma": "NA3BIN0406-15SA", "turma": "Introdução à Probabilidade e à Estatística A3-Noturno (Santo André)", "prof_pratica": "0", "prof_teoria": "VALDECIR MARVULLE", "teoria": ["terça das 21:00 às 23:00, semanal", "quinta das 19:00 às 21:00, quinzenal II"], "pratica": [""], "tpi": "3-0-4", "turno": "noturno" }, { "cod turma": "DA1BCN0405-15SA", "turma": "Introdução às Equações Diferenciais Ordinárias A1-Matutino (Santo André)", "prof_pratica": "0", "prof_teoria": "Juliana Militao da Silva Berbert", "teoria": ["segunda das 08:00 às 10:00, semanal", "quinta das 10:00 às 12:00, semanal"], "pratica": [""], "tpi": "4-0-4", "turno": "diurno" }, { "cod turma": "NA1MCTB019-17SA", "turma": "Matemática Discreta A1-Noturno (Santo André)", "prof_pratica": "0", "prof_teoria": "Francisco Jose Gozzi", "teoria": ["segunda das 21:00 às 23:00, semanal", "quarta das 19:00 às 21:00, semanal"], "pratica": [""], "tpi": "4-0-4", "turno": "noturno" }] }

const soAulas = aulas.map((a) => [...a.teoria.filter(e => e !== ''), ...a.pratica.filter(e => e !== '')])



let quinzenal1 = [[], [], [], [], [], []]
let quinzenal2 = [[], [], [], [], [], []]


function diaSemana(parametro) {
  const segunda = /^segunda/gi
  const terca = /^terça/gi
  const quarta = /^quarta/gi
  const quinta = /^quinta/gi
  const sexta = /^sexta/gi
  const sabado = /^sábado/gi

  if (segunda.test(parametro)) {
    return 0;
  } else if (terca.test(parametro)) {
    return 1;
  } else if (quarta.test(parametro)) {
    return 2;
  } else if (quinta.test(parametro)) {
    return 3;
  } else if (sexta.test(parametro)) {
    return 4;
  } else if (sabado.test(parametro)) {
    return 5
  } else {
    return 5
  }
}

soAulas.map(aula => {
  const q1 = /quinzenal I$/gi
  const q2 = /quinzenal II$/gi

  aula.map((a) => {
    // q1, q2, semanal
    if (q1.test(a)) {
      // adc vetor q1
      quinzenal1[diaSemana(a)].push(a)
    } else if (q2.test(a)) {
      // adc vetor q2
      quinzenal2[diaSemana(a)].push(a)
    } else {
      // adc aos dois vetores
      quinzenal1[diaSemana(a)].push(a)
      quinzenal2[diaSemana(a)].push(a)
    }
  })
})

console.log(quinzenal1)

function diff_weeks() 
 {
  const dt2 = new Date();
  const dt1 = new Date(2021, 04, 24);

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24 * 7);
  return Math.floor(Math.abs(diff)) + 1;
 }

dt1 = new Date(2014,10,2);
dt2 = new Date(2014,10,11);
console.log(diff_weeks(dt1, dt2));

dt1 = new Date("June 13, 2014 08:11:00");
dt2 = new Date("October 19, 2014 11:13:00");
console.log(diff_weeks(dt1, dt2));
