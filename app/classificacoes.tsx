import { router } from "expo-router"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { listarClassificacoes } from "./services/storage"

export default function Classificacoes(){

 const [dados,setDados] = useState<any[]>([])

 useEffect(()=>{

  carregar()

 },[])

 const carregar = async ()=>{

  const lista = await listarClassificacoes()

  setDados(lista)

 }

 const realizadas = dados.filter(d=>d.status==="REALIZADA")
 const recusadas = dados.filter(d=>d.status==="RECUSADA")
 const pendentes = dados.filter(d=>d.status==="PENDENTE")

 return(

  <ScrollView style={styles.container}>

   <TouchableOpacity
    style={styles.voltar}
    onPress={()=>router.back()}
   >
    <Text style={{color:"white"}}>← Voltar</Text>
   </TouchableOpacity>

   <Text style={styles.title}>
    Situação das Classificações
   </Text>

   <View style={styles.card}>
    <Text style={styles.label}>Realizadas</Text>
    <Text style={styles.valor}>{realizadas.length}</Text>
   </View>

   <View style={styles.card}>
    <Text style={styles.label}>Pendentes</Text>
    <Text style={styles.valor}>{pendentes.length}</Text>
   </View>

   <View style={styles.card}>
    <Text style={styles.label}>Recusadas</Text>
    <Text style={styles.valor}>{recusadas.length}</Text>
   </View>

  </ScrollView>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:30
 },

 voltar:{
  backgroundColor:"#333",
  padding:10,
  borderRadius:6,
  marginBottom:20,
  alignSelf:"flex-start"
 },

 title:{
  fontSize:26,
  marginBottom:30
 },

 card:{
  borderWidth:1,
  padding:20,
  borderRadius:8,
  marginBottom:15
 },

 label:{
  fontSize:16
 },

 valor:{
  fontSize:28,
  fontWeight:"bold"
 }

})