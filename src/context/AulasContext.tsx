import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Aula } from '../pages/Aulas'

const defaultAulas: Aula[] = []

export const CurrentAulas = createContext({
  aulas: defaultAulas,
  editAulas: async (parametro: Aula[]) => null
})

export default function AulasContext({ children }: { children: any }) {
  const [aulas, setAulas] = useState<Aula[]>([])

  const editAulas = async (aula: Aula[]) => {
    setAulas(aula)
    /// 
    try {
      const jsonValue = JSON.stringify(aula)
      await AsyncStorage.setItem('@storage_aula', jsonValue)
    } catch (e) {
      // saving error
      throw new Error(e)
    }

    return null
  }

  return (
    <CurrentAulas.Provider value={{ aulas, editAulas }}>
      {children}
    </CurrentAulas.Provider>
  )
}

