import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [url, setUrl] = useState("");

  const login = () => {
    console.log({
      usuario,
      senha,
      url,
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuário</Text>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>Senha</Text>
      <TextInput
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />

      <Text>URL do Cliente</Text>
      <TextInput
        value={url}
        onChangeText={setUrl}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />

      <Button title="Entrar" onPress={login} />
    </View>
  );
}
