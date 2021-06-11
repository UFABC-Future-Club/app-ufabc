import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native';
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Title } from '../components/Title'
import { Row } from '../components/Row'
import { Button } from '../components/Button'
import { CurrentAulas } from '../context/AulasContext'

export const largura = Dimensions.get('window').width
export const altura = Dimensions.get('window').height

export default function App() {
  const { aulas } = useContext(CurrentAulas);

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

            {aulas.map(aula => (
              <Card key={Math.random()} style={{ width: largura - 64 }}>
                <Text>{aula.turma}</Text>
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