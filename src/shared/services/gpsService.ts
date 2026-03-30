import * as Location from "expo-location";

export async function getGps(): Promise<Location.LocationObject | string> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") return "Não autorizado";

  const location = await Location.getCurrentPositionAsync({});
  return location;
}
