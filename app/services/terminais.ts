export type Terminal = {
 id: string
 nome: string
}

export async function listarTerminais(): Promise<Terminal[]> {

 try {

  const response = await fetch(
   "http://localhost:5000/api/terminais"
  )

  if (!response.ok) {
   throw new Error("API não respondeu")
  }

  const data = await response.json()

  return data

 } catch (error) {

  console.log("API indisponível, usando fallback")

  // fallback local para não quebrar o app
  return [
   { id: "A", nome: "Armazém A" },
   { id: "B", nome: "Armazém B" },
   { id: "C", nome: "Armazém C" }
  ]

 }

}