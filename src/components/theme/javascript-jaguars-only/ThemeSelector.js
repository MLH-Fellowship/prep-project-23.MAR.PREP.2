import { useState, useEffect } from "react";

import Question from "./Question";

import { TEAM } from "../../../lib/constants";

export default function ThemeSelector({ setUser }) {
  const [themeSelectorActivated, setThemeSelectorActivated] = useState(false);
  const [answeredQuestion, setAnsweredQuestion] = useState(false);
  const [isChooseThemeOpen, setIsChooseThemeOpen] = useState(false);

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
    if (answeredQuestion) {
      setIsChooseThemeOpen(true);
    }
  }, [answeredQuestion]);

  if (!themeSelectorActivated) return null;

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        {answeredQuestion ? (
          <ChooseTheme
            setUser={setUser}
            isChooseThemeOpen={isChooseThemeOpen}
            setIsChooseThemeOpen={setIsChooseThemeOpen}
          />
        ) : (
          <Question setAnsweredQuestion={setAnsweredQuestion} />
        )}
      </div>
    </div>
  );
}

function ChooseTheme({ setUser, isChooseThemeOpen, setIsChooseThemeOpen }) {
  if (!isChooseThemeOpen) return null;

  return (
    <div className="members">
      {TEAM.map(({ name, profilePic }) => (
        <div
          className="member"
          onClick={() => {
            setUser(name);
            setIsChooseThemeOpen(false);
          }}
        >
          <img src={profilePic} alt="" />
          <div className="name">{name}</div>
        </div>
      ))}
    </div>
  );
}
