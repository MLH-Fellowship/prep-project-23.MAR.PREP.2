import CloudsPNG from "../../assets/images/clouds.png";
import ThunderstormPNG from "../../assets/images/thunderstorm.png";

export default function ThemedBackground({ weatherCondition }) {
  const mapWeatherConditionToBackground = {
    Clouds: {
      imageSrc: CloudsPNG,
      altText:
        "Digital art of a hill landscape with a cluster of clouds seen from a distance",
    },
    Thunderstorm: {
      imageSrc: ThunderstormPNG,
      altText: "Digital art of a with a thunderstorm",
    },
  };

  return (
    <div className="themed-background">
      <img
        src={mapWeatherConditionToBackground[weatherCondition].imageSrc}
        alt={mapWeatherConditionToBackground[weatherCondition].altText}
      />
      {/* This div is used to create a dark overlay on the background image so the rest of the interface is still easy to read */}
      <div className="overlay"></div>
    </div>
  );
}
