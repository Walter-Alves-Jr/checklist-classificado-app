export type Cultura = "Soja" | "Milho" | "Trigo"

export interface DadosClassificacao {

 cultura:Cultura

 umidade:number
 impureza:number

 ardidos?:number
 mofados?:number
 germinados?:number

 quebrados?:number
 pesoHectolitro?:number

}

export interface ResultadoClassificacao {

 tipo:string
 observacao:string

}

export function classificarMAPA(d:DadosClassificacao):ResultadoClassificacao{

 if(d.cultura === "Soja"){

  const totalAvariados =
   (d.ardidos || 0) +
   (d.mofados || 0) +
   (d.germinados || 0)

  if(d.umidade > 14)
   return {tipo:"FORA DE TIPO",observacao:"Umidade acima do limite"}

  if(d.impureza > 1)
   return {tipo:"FORA DE TIPO",observacao:"Impureza acima do limite"}

  if(totalAvariados > 8)
   return {tipo:"FORA DE TIPO",observacao:"Total de avariados acima do limite"}

  return {tipo:"TIPO 1",observacao:"Produto dentro do padrão"}

 }

 if(d.cultura === "Milho"){

  if(d.umidade > 14)
   return {tipo:"FORA DE TIPO",observacao:"Umidade acima do limite"}

  if(d.impureza > 1)
   return {tipo:"FORA DE TIPO",observacao:"Impureza acima do limite"}

  if((d.quebrados || 0) > 6)
   return {tipo:"TIPO 2",observacao:"Alto índice de quebrados"}

  return {tipo:"TIPO 1",observacao:"Milho padrão"}

 }

 if(d.cultura === "Trigo"){

  if((d.pesoHectolitro || 0) < 72)
   return {tipo:"FORA DE TIPO",observacao:"PH abaixo do mínimo"}

  return {tipo:"TIPO 1",observacao:"Trigo padrão"}

 }

 return {tipo:"FORA DE TIPO",observacao:"Cultura inválida"}

}