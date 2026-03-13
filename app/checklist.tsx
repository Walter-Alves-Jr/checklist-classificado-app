import { router, useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import * as Location from "expo-location"

import {
  listarPerguntas,
  Pergunta,
  salvarChecklist
} from "./services/storage"

import { gerarPDFChecklist } from "./services/pdf"
import { enviarWebhookYMS } from "./services/webhook"

export default function Checklist(){

const params = useLocalSearchParams()

const checklist = Array.isArray(params.checklist)
? params.checklist[0]
: params.checklist ?? ""

const [perguntas,setPerguntas] = useState<Pergunta[]>([])
const [respostas,setRespostas] = useState<{[key:string]:string}>({})
const [gps,setGps] = useState("")

useEffect(()=>{

carregarPerguntas()
capturarGPS()

},[])

const capturarGPS = async ()=>{

const { status } = await Location.requestForegroundPermissionsAsync()

if(status !== "granted"){
return
}

const location = await Location.getCurrentPositionAsync({})

setGps(
location.coords.latitude + "," + location.coords.longitude
)

}

const carregarPerguntas = async ()=>{

const lista = await listarPerguntas()

const filtradas = lista.filter(
(p)=>p.checklist === checklist
)

setPerguntas(filtradas)

}

const responder = (pergunta:string,resposta:string)=>{

setRespostas({
...respostas,
[pergunta]:resposta
})

}

const salvar = async ()=>{

const dados = {

checklist,

armazem: "",

fotos:[],

data:new Date().toISOString(),

gps,

respostas

}

await salvarChecklist(dados)

await enviarWebhookYMS({
tipo:"checklist",
dados
})

gerarPDFChecklist(dados)

alert("Checklist registrado")

router.back()

}

return(

<View style={styles.container}>

<Text style={styles.titulo}>{checklist}</Text>

{perguntas.map((p,index)=>(

<View key={index} style={styles.pergunta}>

<Text style={styles.textoPergunta}>
{p.pergunta}
</Text>

<View style={styles.botoes}>

<TouchableOpacity
style={styles.botao}
onPress={()=>responder(p.pergunta,"sim")}
> 
<Text>Sim</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.botao}
onPress={()=>responder(p.pergunta,"não")}
> 
<Text>Não</Text>
</TouchableOpacity>

</View>

</View>

))}

<TouchableOpacity style={styles.salvar} onPress={salvar}>
<Text style={styles.textoSalvar}>Finalizar Checklist</Text>
</TouchableOpacity>

</View>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20
},

titulo:{
fontSize:24,
marginBottom:20
},

pergunta:{
marginBottom:20
},

textoPergunta:{
marginBottom:10
},

botoes:{
flexDirection:"row",
gap:10
},

botao:{
borderWidth:1,
padding:10,
borderRadius:6
},

salvar:{
backgroundColor:"#ff6a00",
padding:16,
alignItems:"center",
borderRadius:8
},

textoSalvar:{
color:"#fff",
fontWeight:"bold"
}

})