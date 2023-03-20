import { useState, useEffect, useRef } from "react";

import Question from "./Question";

export default function ThemeSelector() {
  const [themeSelectorActivated, setThemeSelectorActivated] = useState(false);
  const [answeredQuestion, setAnsweredQuestion] = useState(false);

  const animatedBackground = useRef(null);

  useEffect(() => {
    let pressCount = 0;

    const handleKeyDown = (event) => {
      if (event.key !== "J") return;

      if (pressCount === 0) {
        pressCount += 1;

        let timeout = setTimeout(() => {
          pressCount = 0;
          clearTimeout(timeout);
        }, 1000);
      } else {
        pressCount = 0;
        setThemeSelectorActivated(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!themeSelectorActivated) return;

    animatedBackground.current.classList.add("full");
  }, [themeSelectorActivated]);

  useEffect(() => {
    if (!answeredQuestion) return;

    animatedBackground.current.classList.remove("full");
  });

  if (!themeSelectorActivated) return null;

  return (
    <>
      <div className="modal-animated-background" ref={animatedBackground}></div>
      <div className="modal-content">
        {answeredQuestion ? (
          <ChooseTheme />
        ) : (
          <Question setAnsweredQuestion={setAnsweredQuestion} />
        )}
      </div>
    </>
  );
}

function ChooseTheme() {
  return <h1>Choose theme</h1>;
}
