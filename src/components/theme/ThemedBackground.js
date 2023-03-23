import { getBackgroundImageFromWeatherCondition } from "../../lib/getBackgroundImageFromWeatherCondition.js";

export default function ThemedBackground({ weatherCondition, user }) {
  const imageSrc = getBackgroundImageFromWeatherCondition(
    weatherCondition,
    user
  );

  if (!imageSrc) return null;

  return (
    <div className="themed-background">
      <img src={imageSrc} alt="" />

      {/* This div is used to create a dark overlay on the background image so the rest of the interface is still easy to read */}
      <div className="overlay"></div>
    </div>
  );
}
