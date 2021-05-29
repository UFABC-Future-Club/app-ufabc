import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Dimensions } from 'react-native';
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { Title } from '../components/Title'
import { Row } from '../components/Row'

const largura = Dimensions.get('window').width

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Container>
        
        <Title>Próximas aulas</Title>
        <Row style={{ width: largura }}>
          <ScrollView 
            style={{flex: 1}} 
            contentContainerStyle={{ width: ((largura * 0.8) * 2) + 16}} 
            horizontal={true}
            showsHorizontalScrollIndicator={false} >
              <Card style={{width: largura * 0.75}} />
              <Card style={{width: largura * 0.75}} />
            </ScrollView>
          </Row>
         
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