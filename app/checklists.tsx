import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { listarPerguntas } from "./services/storage"

export default function Checklists(){

 const { armazem } = useLocalSearchParams()

 const [checklists,setChecklists] = useState<string[]>([])

 useEffect(()=>{

  carregar()

 },[])

 const carregar = async ()=>{

  const perguntas = await listarPerguntas()

  const nomes = [...new Set(perguntas.map(p=>p.checklist))]

  setChecklists(nomes)

 }

 const abrir = (checklist:string)=>{

  router.push({
   pathname:"/checklist",
   params:{
    checklist,
    armazem
   }
  })

 }

 return(

  <View style={styles.container}>

   <Text style={styles.title}>
    Selecionar Checklist
   </Text>

   {checklists.map(nome => (

    <TouchableOpacity
     key={nome}
     style={styles.botao}
     onPress={()=>abrir(nome)}
    >

     <Text style={styles.texto}>
      {nome}
     </Text>

    </TouchableOpacity>

   ))}

  </View>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  justifyContent:"center",
  padding:30
 },

 title:{
  fontSize:26,
  marginBottom:40,
  textAlign:"center"
 },

 botao:{
  backgroundColor:"#ff6a00",
  padding:18,
  borderRadius:8,
  marginBottom:15,
  alignItems:"center"
 },

 texto:{
  color:"white",
  fontWeight:"bold"
 }

})