import { Aula } from "../pages/Aulas"

function diaSemana(parametro: string): number {
  const diasRegex = [/^segunda/gi, /^terça/gi, /^quarta/gi, /^quinta/gi, /^sexta/gi, /^sábado/gi]
  const filteredDia = (diasRegex.filter(dia => dia.test(parametro)))[0]
  const indiceDia = diasRegex.indexOf(filteredDia) + 1

  return indiceDia ? indiceDia : 6
}

function semanaAtual(): number {
  let diff = (new Date().getTime() - new Date('2021-05-25').getTime()) / 1000;
  diff /= (60 * 60 * 24 * 7);
  return Math.floor(Math.abs(diff)) + 1;
}

export function separarAulas(aulas: Aula[]): string[] {
  const apenasAulas = aulas.map((a) => [...a.teoria.filter(e => e !== ''), ...a.pratica.filter(e => e !== '')])

  const indiceDiaSemana = new Date().getDay();
  const numeroSemana = semanaAtual()

  let regexQuinzena: RegExp = /quinzenal I$/gi

  if (numeroSemana % 2 == 0) {
    regexQuinzena = /quinzenal II$/gi
  }

  let quinzenal: string[][] = [[], [], [], [], [], [], []]

  apenasAulas.map(aula => {
    aula.map((a) => {
      if (regexQuinzena.test(a) || /semanal$/gi.test(a)) {
        quinzenal[diaSemana(a)].push(a)
      }
    })
  })

  return quinzenal[indiceDiaSemana]
}