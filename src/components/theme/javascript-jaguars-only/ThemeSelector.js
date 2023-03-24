import { useState, useEffect } from "react";

import Question from "./Question";
import ChooseTheme from "./ChooseTheme";

export default function ThemeSelector({
  setUser,
  isThemeSelectorActive,
  isThemeSelectorMinimized,
  setIsThemeSelectorMinimized,
}) {
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      if (e.target.className === "modal-wrapper") {
        setIsThemeSelectorMinimized(true);
      }
    }

    function handleKeyDown(e) {
      e.stopPropagation();

      if (e.key === "Escape") {
        setIsThemeSelectorMinimized(true);
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsThemeSelectorMinimized]);

  if (!isThemeSelectorActive) return null;

  return (
    <>
      {isThemeSelectorMinimized ? (
        <div className="floating-button"></div>
      ) : (
        <div className="modal-wrapper">
          <div className="modal-content">
            {isQuestionAnswered ? (
              <ChooseTheme setUser={setUser} />
            ) : (
              <Question setIsQuestionAnswered={setIsQuestionAnswered} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
