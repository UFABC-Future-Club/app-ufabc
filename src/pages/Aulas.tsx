import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { altura, largura } from './Home'
import { Input } from "../components/Input"
import { Title } from "../components/Title"
import LottieView from 'lottie-react-native'
import axios from 'axios'
import { Card } from '../components/Card';

interface Aula {
  cod_turma: string,
  pratica: string[],
  prof_pratica: string,
  prof_teoria: string,
  tpi: string,
  turma: string,
  turno: string,
  teoria: string[],
}

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ra, setRa] = useState('');
  const [aulas, setAulas] = useState<Aula[]>([])

  function obterAulas() {
    if (ra !== '') {

      axios.get(`/aulas/${ra}`)
        .then((resposta) => {
          setAulas(resposta.data.aulas)
        }).catch((e) => {
          throw new Error(e);
        })

      setModalVisible(!modalVisible);
    }
  }

  return (
    <View style={styles.centeredView}>
      {aulas?.map(item => {
        return (
          <Card key={Math.random()} style={{ height: altura * 0.1, width: largura * 0.9, marginVertical: 8 }}>
            <Text>
              {item.turma}
            </Text>
            <Text>
              {item.teoria}
            </Text>
          </Card>
        )
      })}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title>Insira seu RA</Title>
            <Input
              keyboardType='numeric'
              placeholder='Insira aqui o ra'
              onChangeText={setRa}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => obterAulas()}
            >
              <LottieView autoPlay source={require('../lottie-files/checkbox.json')} ></LottieView>
            </Pressable>
          </View>
        </View>
      </Modal>
      { aulas?.length === 0 && (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Inserir RA</Text>
        </Pressable>)}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: largura * 0.8,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#006D35",
  },
  buttonClose: {
    backgroundColor: "white",
    height: 24,
    width: largura * 0.3,
    elevation: 0
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;