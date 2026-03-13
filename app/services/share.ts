export async function compartilharPDF(blob:Blob){

 const file = new File([blob],"classificacao.pdf")

 const url = URL.createObjectURL(file)

 if(navigator.share){

  await navigator.share({
   title:"Classificação de Grãos",
   text:"Segue classificação realizada",
   url
  })

 }else{

  window.open(url)

 }

}