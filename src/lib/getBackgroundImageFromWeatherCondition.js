import AshIMG from "../assets/images/ash.jpg";
import CloudsIMG from "../assets/images/clouds.jpg";
import ClearIMG from "../assets/images/clear.jpg";
import DrizzleIMG from "../assets/images/drizzle.jpg";
import DustIMG from "../assets/images/dust.jpg";
import FogIMG from "../assets/images/fog.jpg";
import HazeIMG from "../assets/images/haze.jpg";
import MistIMG from "../assets/images/mist.jpg";
import RainIMG from "../assets/images/rain.jpg";
import SandIMG from "../assets/images/sand.jpg";
import SmokeIMG from "../assets/images/smoke.jpg";
import SnowIMG from "../assets/images/snow.jpg";
import SquallIMG from "../assets/images/squall.jpg";
import ThunderstormIMG from "../assets/images/thunderstorm.jpg";
import TornadoIMG from "../assets/images/tornado.jpg";

const mapWeatherConditionToBackground = {
  Ash: AshIMG,
  Clear: ClearIMG,
  Clouds: CloudsIMG,
  Drizzle: DrizzleIMG,
  Dust: DustIMG,
  Fog: FogIMG,
  Haze: HazeIMG,
  Mist: MistIMG,
  Rain: RainIMG,
  Sand: SandIMG,
  Smoke: SmokeIMG,
  Snow: SnowIMG,
  Squall: SquallIMG,
  Thunderstorm: ThunderstormIMG,
  Tornado: TornadoIMG,
};

export function getBackgroundImageFromWeatherCondition(weather) {
  // will show default blue background as fallback for now

  return mapWeatherConditionToBackground[weather] ?? "";
}
