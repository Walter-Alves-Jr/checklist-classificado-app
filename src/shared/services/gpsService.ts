import * as Location from "expo-location";

export async function getGps(): Promise<Location.LocationObject> {
  const location = await Location.getCurrentPositionAsync({});
  return location;
}
