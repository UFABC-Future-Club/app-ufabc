import { Aula } from "../pages/Aulas"

function diaSemana(parametro: string): number {
  const segunda = /^segunda/gi
  const terca = /^terça/gi
  const quarta = /^quarta/gi
  const quinta = /^quinta/gi
  const sexta = /^sexta/gi
  const sabado = /^sábado/gi

  if (segunda.test(parametro)) {
    return 1;
  } else if (terca.test(parametro)) {
    return 2;
  } else if (quarta.test(parametro)) {
    return 3;
  } else if (quinta.test(parametro)) {
    return 4;
  } else if (sexta.test(parametro)) {
    return 5;
  } else if (sabado.test(parametro)) {
    return 6
  } else {
    return 6
  }
}

function semanaAtual(): number {
  const dt2 = new Date();
  // yyyy-mm-dd
  const dt1 = new Date('2021-05-25');

  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60 * 24 * 7);
  return Math.floor(Math.abs(diff)) + 1;
}

export function separarAulas(aulas: Aula[]): string[] {
  const apenasAulas = aulas.map((a) => [...a.teoria.filter(e => e !== ''), ...a.pratica.filter(e => e !== '')])

  let quinzenal1: string[][] = [[], [], [], [], [], [], []]
  let quinzenal2: string[][] = [[], [], [], [], [], [], []]

  apenasAulas.map(aula => {
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

  const indice = new Date().getDay();
  // Quinzenal
  const semana = semanaAtual()

  if (semana % 2 == 0) {
    return quinzenal2[indice]
  }

  return quinzenal1[indice]
}

