import { Stack } from "expo-router"

export default function Layout(){

 return(
  <Stack screenOptions={{headerShown:false}}>
   <Stack.Screen name="login" />
   <Stack.Screen name="index" />
   <Stack.Screen name="armazem" />
   <Stack.Screen name="checklists" />
   <Stack.Screen name="checklist" />
   <Stack.Screen name="perguntas" />
   <Stack.Screen name="sincronizar" />
   <Stack.Screen name="configuracoes" />
  </Stack>
 )

}