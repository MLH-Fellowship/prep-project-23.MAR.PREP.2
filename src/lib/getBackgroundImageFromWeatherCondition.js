import CloudsIMG from "../assets/images/clouds.jpg";
import ClearIMG from "../assets/images/clear.jpg";
import ThunderstormIMG from "../assets/images/thunderstorm.jpg";
import RainIMG from "../assets/images/rain.jpg";
import SnowIMG from "../assets/images/snow.jpg";

const mapWeatherConditionToBackground = {
  Clouds: {
    imageSrc: CloudsIMG,
  },
  Thunderstorm: {
    imageSrc: ThunderstormIMG,
  },
  Clear: {
    imageSrc: ClearIMG,
  },
  Drizzle: {
    imageSrc: null,
  },
  Rain: {
    imageSrc: RainIMG,
  },
  Snow: {
    imageSrc: SnowIMG,
  },
  Mist: {
    imageSrc: null,
  },
  Smoke: {
    imageSrc: null,
  },
  Haze: {
    imageSrc: null,
  },
  Dust: {
    imageSrc: null,
  },
  Fog: {
    imageSrc: null,
  },
  Sand: {
    imageSrc: null,
  },
  Ash: {
    imageSrc: null,
  },
  Squall: {
    imageSrc: null,
  },
  Tornado: {
    imageSrc: null,
  },
};

export function getBackgroundImageFromWeatherCondition(weather) {
  // will show default blue background as fallback for now

  return mapWeatherConditionToBackground[weather].imageSrc ?? "";
}
