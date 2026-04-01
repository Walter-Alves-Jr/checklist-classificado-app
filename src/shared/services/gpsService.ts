import * as Location from "expo-location";
import { Alert } from "react-native";

export async function getGps(): Promise<Location.LocationObject> {
  const location = await Location.getCurrentPositionAsync({});
  return location;
}

export async function solicitarLocalizacao(): Promise<Location.LocationObject> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permissão necessária",
      "Precisamos da sua localização para continuar.",
    );
    throw new Error();
  }

  const location = await Location.getCurrentPositionAsync();
  return location;
}
