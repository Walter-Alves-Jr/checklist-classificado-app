import { router } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { colors } from "./theme/colors"

export default function Configuracoes() {

  const abrirPerguntas = () => {

    router.push("/perguntas")

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Configurações
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={abrirPerguntas}
      >
        <Text style={styles.texto}>
          Gerenciar Perguntas
        </Text>
      </TouchableOpacity>

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 26,
    marginBottom: 30
  },

  botao: {
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 10,
    width: 250,
    alignItems: "center"
  },

  texto: {
    color: "white",
    fontWeight: "bold"
  }

})