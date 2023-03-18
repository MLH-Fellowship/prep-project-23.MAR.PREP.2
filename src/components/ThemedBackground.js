export default function ThemedBackground({ weatherCondition }) {
  const mapWeatherConditionToBackground = {
    Clouds: "https://media.giphy.com/media/RpwupnbQE5nK6iRkYJ/giphy.gif",
  };

  return (
    <div className="themed-background">
      <img
        src={mapWeatherConditionToBackground[weatherCondition]}
        alt="background"
      />
      {/* This div is used to create a dark overlay on the background image so the rest of the interface is still easy to read */}
      <div className="overlay"></div>
    </div>
  );
}
