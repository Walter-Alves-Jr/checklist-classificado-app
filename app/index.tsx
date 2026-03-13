import { router } from "expo-router"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Index() {

  const abrirChecklist = () => {
    router.push("/armazem")
  }

  const abrirPerguntas = () => {
    router.push("/perguntas")
  }

  const abrirSincronizar = () => {
    router.push("/sincronizar")
  }

  const abrirClassificador = () => {
    router.push("/classificador")
  }

  const abrirSituacao = () => {
    router.push("/classificacoes")
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Yard Checklist
      </Text>

      <TouchableOpacity style={styles.botao} onPress={abrirChecklist}>
        <Text style={styles.textoBotao}>Iniciar Checklist</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={abrirPerguntas}>
        <Text style={styles.textoBotao}>Cadastrar Perguntas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={abrirSincronizar}>
        <Text style={styles.textoBotao}>Sincronizar Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={abrirClassificador}>
        <Text style={styles.textoBotao}>Classificador de Grãos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={abrirSituacao}>
        <Text style={styles.textoBotao}>Situação Classificações</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 40
  },

  botao: {
    backgroundColor: "#ff6a00",
    padding: 18,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center"
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold"
  }

})