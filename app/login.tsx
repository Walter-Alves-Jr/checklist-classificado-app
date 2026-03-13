import { router } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function Login(){

 const [usuario,setUsuario] = useState("")
 const [senha,setSenha] = useState("")

 const entrar = ()=>{

  if(usuario === "admin" && senha === "123"){

   router.replace("/")

  }else{

   alert("Usuário ou senha inválidos")

  }

 }

 return(

  <View style={styles.container}>

   <Text style={styles.titulo}>
    Login
   </Text>

   <TextInput
    style={styles.input}
    placeholder="Usuário"
    value={usuario}
    onChangeText={setUsuario}
   />

   <TextInput
    style={styles.input}
    placeholder="Senha"
    secureTextEntry
    value={senha}
    onChangeText={setSenha}
   />

   <TouchableOpacity
    style={styles.botao}
    onPress={entrar}
   >

    <Text style={styles.texto}>
     Entrar
    </Text>

   </TouchableOpacity>

  </View>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  justifyContent:"center",
  padding:30
 },

 titulo:{
  fontSize:28,
  marginBottom:30,
  textAlign:"center"
 },

 input:{
  borderWidth:1,
  borderColor:"#ccc",
  padding:12,
  marginBottom:20,
  borderRadius:6
 },

 botao:{
  backgroundColor:"#ff6a00",
  padding:18,
  borderRadius:8,
  alignItems:"center"
 },

 texto:{
  color:"white",
  fontWeight:"bold"
 }

})