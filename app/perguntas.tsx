import { useEffect, useState } from "react"

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"

import {
  excluirPergunta,
  listarPerguntas,
  Pergunta,
  salvarPergunta
} from "./services/storage"

import { colors } from "./theme/colors"

export default function Perguntas(){

 const [checklist,setChecklist] = useState("")
 const [pergunta,setPergunta] = useState("")
 const [tipo,setTipo] = useState<"boolean"|"texto"|"numero">("boolean")
 const [armazem,setArmazem] = useState<string | undefined>(undefined)
 const [foto,setFoto] = useState(false)

 const [lista,setLista] = useState<Pergunta[]>([])

 useEffect(()=>{

  carregarPerguntas()

 },[])

 const carregarPerguntas = async ()=>{

  const data = await listarPerguntas()

  setLista(data)

 }

 const salvar = async ()=>{

  if(!checklist){
   alert("Informe o nome do checklist")
   return
  }

  if(!pergunta){
   alert("Digite a pergunta")
   return
  }

  const novaPergunta: Pergunta = {

   id: Date.now(),

   checklist,

   pergunta,

   tipo,

   armazem,

   foto

  }

  await salvarPergunta(novaPergunta)

  setPergunta("")
  setFoto(false)

  carregarPerguntas()

 }

 const remover = async (id:number)=>{

  await excluirPergunta(id)

  carregarPerguntas()

 }

 return(

  <ScrollView style={styles.container}>

   <Text style={styles.title}>
    Cadastro de Perguntas
   </Text>

   <Text style={styles.label}>
    Nome do Checklist
   </Text>

   <TextInput
    placeholder="Ex: Checklist Biodiesel"
    style={styles.input}
    value={checklist}
    onChangeText={setChecklist}
   />

   <Text style={styles.label}>
    Pergunta
   </Text>

   <TextInput
    placeholder="Digite a pergunta"
    style={styles.input}
    value={pergunta}
    onChangeText={setPergunta}
   />

   <Text style={styles.label}>
    Tipo de resposta
   </Text>

   <View style={styles.row}>

    {["boolean","texto","numero"].map(t=>(
     
     <TouchableOpacity
      key={t}
      style={[
       styles.botaoOpcao,
       tipo === t && styles.selecionado
      ]}
      onPress={()=>setTipo(t as any)}
     >

      <Text>{t}</Text>

     </TouchableOpacity>

    ))}

   </View>

   <Text style={styles.label}>
    Armazém
   </Text>

   <View style={styles.row}>

    <TouchableOpacity
     style={[
      styles.botaoOpcao,
      !armazem && styles.selecionado
     ]}
     onPress={()=>setArmazem(undefined)}
    >

     <Text>Todos</Text>

    </TouchableOpacity>

    {["Armazém A","Armazém B"].map(a=>(

     <TouchableOpacity
      key={a}
      style={[
       styles.botaoOpcao,
       armazem === a && styles.selecionado
      ]}
      onPress={()=>setArmazem(a)}
     >

      <Text>{a}</Text>

     </TouchableOpacity>

    ))}

   </View>

   <Text style={styles.label}>
    Exige foto?
   </Text>

   <View style={styles.row}>

    <TouchableOpacity
     style={[
      styles.botaoOpcao,
      foto && styles.selecionado
     ]}
     onPress={()=>setFoto(true)}
    >

     <Text>Sim</Text>

    </TouchableOpacity>

    <TouchableOpacity
     style={[
      styles.botaoOpcao,
      !foto && styles.selecionado
     ]}
     onPress={()=>setFoto(false)}
    >

     <Text>Não</Text>

    </TouchableOpacity>

   </View>

   <TouchableOpacity
    style={styles.botaoSalvar}
    onPress={salvar}
   >

    <Text style={styles.textoBotao}>
     SALVAR PERGUNTA
    </Text>

   </TouchableOpacity>

   <Text style={styles.subtitle}>
    Perguntas cadastradas
   </Text>

   {lista.map(p=>(

    <View key={p.id} style={styles.item}>

     <View>

      <Text style={styles.pergunta}>
       {p.pergunta}
      </Text>

      <Text style={styles.info}>
       {p.checklist}
      </Text>

      <Text style={styles.info}>
       {p.armazem || "Todos os armazéns"}
      </Text>

     </View>

     <TouchableOpacity
      style={styles.excluir}
      onPress={()=>remover(p.id)}
     >

      <Text style={{color:"white"}}>
       Excluir
      </Text>

     </TouchableOpacity>

    </View>

   ))}

  </ScrollView>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:20
 },

 title:{
  fontSize:26,
  marginBottom:20
 },

 subtitle:{
  marginTop:30,
  fontSize:18
 },

 label:{
  marginBottom:8
 },

 input:{
  borderWidth:1,
  padding:10,
  borderRadius:6,
  marginBottom:15
 },

 row:{
  flexDirection:"row",
  gap:10,
  marginBottom:20
 },

 botaoOpcao:{
  borderWidth:1,
  padding:10,
  borderRadius:6
 },

 selecionado:{
  backgroundColor:"#ddd"
 },

 botaoSalvar:{
  backgroundColor:colors.primary,
  padding:15,
  borderRadius:8,
  alignItems:"center"
 },

 textoBotao:{
  color:"white",
  fontWeight:"bold"
 },

 item:{
  flexDirection:"row",
  justifyContent:"space-between",
  padding:15,
  borderBottomWidth:1
 },

 pergunta:{
  fontWeight:"bold"
 },

 info:{
  color:"#777"
 },

 excluir:{
  backgroundColor:"#c62828",
  padding:8,
  borderRadius:6
 }

})