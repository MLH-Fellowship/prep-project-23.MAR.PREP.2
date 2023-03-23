import { mapWeatherConditionToBackground } from "./mapWeatherConditionToBackground";

export function getBackgroundImageFromWeatherCondition(
  weather,
  theme = "Basic"
) {
  return mapWeatherConditionToBackground[theme][weather] ?? "";
}
