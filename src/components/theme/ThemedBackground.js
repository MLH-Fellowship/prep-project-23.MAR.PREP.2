export default function ThemedBackground({ weatherCondition, user = "Basic" }) {
  return (
    <div className="themed-background">
      <img src={`./backgrounds/${user}/${weatherCondition}.jpg`} alt="" />

      {/* This div is used to creWate a dark overlay on the background image so the rest of the interface is still easy to read */}
      <div className="overlay"></div>
    </div>
  );
}
