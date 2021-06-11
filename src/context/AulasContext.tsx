import React, { useState, createContext } from 'react'
import { Aula } from '../pages/Aulas'

const defaultAulas: Aula[] = []

export const CurrentAulas = createContext({
  aulas: defaultAulas,
  editAulas: (parametro: Aula[]) => null
})

export default function AulasContext({ children }: { children: any }) {
  const [aulas, setAulas] = useState<Aula[]>([])

  const editAulas = (aula: Aula[]) => {
    setAulas(aula)

    return null
  }

  return (
    <CurrentAulas.Provider value={{ aulas, editAulas }}>
      {children}
    </CurrentAulas.Provider>
  )
}

