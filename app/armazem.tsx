import { router } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Armazem(){

 const selecionar = (armazem:string)=>{

  router.push({
   pathname:"/checklists",
   params:{ armazem }
  })

 }

 return(

  <View style={styles.container}>

   <Text style={styles.title}>
    Selecionar Armazém
   </Text>

   <TouchableOpacity
    style={styles.botao}
    onPress={()=>selecionar("Armazém A")}
   >
    <Text style={styles.texto}>Armazém A</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.botao}
    onPress={()=>selecionar("Armazém B")}
   >
    <Text style={styles.texto}>Armazém B</Text>
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