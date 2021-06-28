import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native';
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Title } from '../components/Title'
import { Row } from '../components/Row'
import { Button } from '../components/Button'
import { CurrentAulas } from '../context/AulasContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Aula } from './Aulas';

export const largura = Dimensions.get('window').width
export const altura = Dimensions.get('window').height

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

function separarAulas(aulas: Aula[]): string[] {
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

export default function App() {
  const { aulas, editAulas } = useContext(CurrentAulas);

  useEffect(() => {
    // logica
    const obterAulas = async () => {
      const aulasSalvas = await AsyncStorage.getItem('@storage_aula') || ""

      if (aulasSalvas !== "") {
        const jsonAulas: Aula[] = JSON.parse(aulasSalvas)

        editAulas(jsonAulas)
      }
    }

    obterAulas()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <Title>Próximas aulas</Title>
        <Row style={{ width: largura }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ width: ((largura) * aulas.length) - 72 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false} >

            {separarAulas(aulas).map(aula => (
              <Card key={Math.random()} style={{ width: largura - 64 }}>
                <Text>{aula}</Text>
              </Card>
            ))}

          </ScrollView>
        </Row>

        <Title>Calendário acadêmico</Title>
        <Card style={{ width: largura - 64, height: altura * 0.25 }} />

        <Title>Comunidade</Title>
        <Text>
          Conheça pessoas, tire dúvidas, interaja com a
          comunidade da UFABC.
        </Text>
        <Button>
          veja mais
        </Button>

        <StatusBar style="auto" />
      </Container>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scroll: {
    flex: 1,
    width: 1000,
    height: 100,
  }
});