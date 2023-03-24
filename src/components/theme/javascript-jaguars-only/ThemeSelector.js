import { useState, useEffect } from "react";

import { TEAM } from "../../../lib/constants";

export default function ThemeSelector({ setFellow }) {
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(true);
  const [hoveredThemeProfile, setHoveredThemeProfile] = useState(TEAM[0]);

  useEffect(() => {
    function handleClick(e) {
      if (e.target.className === "modal-wrapper") {
        setIsThemeSelectorOpen(false);
      }
    }

    function handleKeyDown(e) {
      e.stopPropagation();

      if (e.key === "Escape") {
        setIsThemeSelectorOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isThemeSelectorOpen)
    return (
      <button
        className="floating-action-button"
        onClick={() => setIsThemeSelectorOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </button>
    );

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className="hovered-theme">
          <img src={hoveredThemeProfile.profilePic} alt="" />
          <p>{hoveredThemeProfile.themeDescription}</p>
        </div>
        <div className="members">
          <div className="default member">
            <img src="./logo192.png" alt="" />
            <div className="name">Default</div>
          </div>
          {TEAM.map((profile) => {
            const { name, profilePic } = profile;

            return (
              <div
                className="member"
                onClick={() => {
                  setFellow(name);
                }}
                onMouseOver={() => setHoveredThemeProfile(profile)}
              >
                <img src={profilePic} alt="" />
                <div className="name">{name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
