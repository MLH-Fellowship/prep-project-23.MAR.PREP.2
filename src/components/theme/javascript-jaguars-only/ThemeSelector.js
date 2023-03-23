import { useState, useEffect } from "react";

import Question from "./Question";

export default function ThemeSelector({ setUser }) {
  const [themeSelectorActivated, setThemeSelectorActivated] = useState(false);
  const [answeredQuestion, setAnsweredQuestion] = useState(false);

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

  if (!themeSelectorActivated) return null;

  return (
    <>
      <div className="modal-content">
        {answeredQuestion ? (
          <ChooseTheme setUser={setUser} />
        ) : (
          <Question setAnsweredQuestion={setAnsweredQuestion} />
        )}
      </div>
    </>
  );
}

function ChooseTheme({ setUser }) {
  return (
    <div className="members">
      <button className="member" onClick={() => setUser("Reginald")}>
        <div className="image"></div>
        <div className="name">Alfeo Raymond</div>
      </button>
    </div>
  );
}
