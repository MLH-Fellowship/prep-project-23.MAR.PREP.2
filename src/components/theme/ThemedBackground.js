export default function ThemedBackground({ fellow = "Basic", results }) {
  if (!results) return null;

  const weatherCondition = results.weather[0].main;

  return (
    <div className="themed-background">
      <img
        src={`./backgrounds/${fellow}/${weatherCondition}.jpg`}
        alt=""
        onError={(e) => {
          // fallback for invalid user, won't be needing it once I generate images for everybody
          e.target.src = `./backgrounds/Basic/${weatherCondition}.jpg`;
        }}
      />

      {/* This div is used to creWate a dark overlay on the background image so the rest of the interface is still easy to read */}
      <div className="overlay"></div>
    </div>
  );
}
