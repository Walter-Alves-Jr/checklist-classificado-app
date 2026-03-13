import { Picker } from "@react-native-picker/picker"
import { router } from "expo-router"
import React, { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

import { gerarPDFClassificacao } from "./services/pdf"
import { salvarClassificacao } from "./services/storage"
import { enviarWebhookYMS } from "./services/webhook"

export default function Classificador(){

const [agendamento,setAgendamento] = useState("")
const [placa,setPlaca] = useState("")
const [motorista,setMotorista] = useState("")
const [transportadora,setTransportadora] = useState("")

const [produto,setProduto] = useState("")
const [terminal,setTerminal] = useState("")

const [cultura,setCultura] = useState("Soja")

const [umidade,setUmidade] = useState("")
const [impureza,setImpureza] = useState("")
const [ardidos,setArdidos] = useState("")
const [mofados,setMofados] = useState("")
const [germinados,setGerminados] = useState("")

const calcularResultado = ()=>{

let resultado = "TIPO 1"

if(cultura === "Soja"){

if(Number(impureza) > 1 || Number(ardidos) > 4 || Number(mofados) > 6){
resultado = "TIPO 2"
}

if(Number(impureza) > 2 || Number(ardidos) > 8 || Number(mofados) > 12){
resultado = "FORA DE TIPO"
}

}

if(cultura === "Milho"){

if(Number(impureza) > 1){
resultado = "TIPO 2"
}

if(Number(impureza) > 3){
resultado = "FORA DE TIPO"
}

}

if(cultura === "Trigo"){

if(Number(impureza) > 1){
resultado = "TIPO 2"
}

if(Number(impureza) > 2){
resultado = "FORA DE TIPO"
}

}

return resultado

}

const classificar = async ()=>{

const resultado = calcularResultado()

const dados = {

agendamento,
placa,
motorista,
transportadora,

produto,
terminal,

cultura,

umidade:Number(umidade),
impureza:Number(impureza),
ardidos:Number(ardidos),
mofados:Number(mofados),
germinados:Number(germinados),

resultado,

status:"REALIZADA" as const,

data:new Date().toISOString()

}

await salvarClassificacao(dados)

await enviarWebhookYMS({
tipo:"classificacao",
dados
})

gerarPDFClassificacao(dados)

alert("Classificação registrada")

router.back()

}

return(

<View style={styles.container}>

<Text style={styles.titulo}>Classificação de Grãos</Text>

<TextInput placeholder="Agendamento" style={styles.input} value={agendamento} onChangeText={setAgendamento}/>
<TextInput placeholder="Placa" style={styles.input} value={placa} onChangeText={setPlaca}/>
<TextInput placeholder="Motorista" style={styles.input} value={motorista} onChangeText={setMotorista}/>
<TextInput placeholder="Transportadora" style={styles.input} value={transportadora} onChangeText={setTransportadora}/>
<TextInput placeholder="Produto" style={styles.input} value={produto} onChangeText={setProduto}/>
<TextInput placeholder="Terminal" style={styles.input} value={terminal} onChangeText={setTerminal}/>

<Text>Cultura</Text>

<Picker
selectedValue={cultura}
onValueChange={(v)=>setCultura(v)}
>

<Picker.Item label="Soja" value="Soja"/>
<Picker.Item label="Milho" value="Milho"/>
<Picker.Item label="Trigo" value="Trigo"/>

</Picker>

<TextInput placeholder="Umidade (%)" style={styles.input} value={umidade} onChangeText={setUmidade}/>
<TextInput placeholder="Impureza (%)" style={styles.input} value={impureza} onChangeText={setImpureza}/>
<TextInput placeholder="Ardidos (%)" style={styles.input} value={ardidos} onChangeText={setArdidos}/>
<TextInput placeholder="Mofados (%)" style={styles.input} value={mofados} onChangeText={setMofados}/>
<TextInput placeholder="Germinados (%)" style={styles.input} value={germinados} onChangeText={setGerminados}/>

<TouchableOpacity style={styles.botao} onPress={classificar}>
<Text style={styles.textoBotao}>Classificar</Text>
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

input:{
borderWidth:1,
borderColor:"#ccc",
padding:10,
marginBottom:10,
borderRadius:6
},

botao:{
backgroundColor:"#ff6a00",
padding:16,
alignItems:"center",
borderRadius:8
},

textoBotao:{
color:"#fff",
fontWeight:"bold"
}

})