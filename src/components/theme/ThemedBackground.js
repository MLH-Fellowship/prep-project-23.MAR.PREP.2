import { getBackgroundImageFromWeatherCondition } from "../../lib/getBackgroundImageFromWeatherCondition.js";

export default function ThemedBackground({ weatherCondition }) {
  return (
    <div className="themed-background">
      <img
        src={getBackgroundImageFromWeatherCondition(weatherCondition)}
        alt=""
      />

      {/* This div is used to create a dark overlay on the background image so the rest of the interface is still easy to read */}
      <div className="overlay"></div>
    </div>
  );
}
