import { useState, useEffect } from "react";

import Question from "./Question";

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
  const TEAM = [
    {
      name: "Alfeo",
      profilePic:
        "https://media.licdn.com/dms/image/C4E03AQGhpFb-rYyWBQ/profile-displayphoto-shrink_400_400/0/1647328748084?e=1683763200&v=beta&t=YZ15pT44Z3RNw3gVwas8NnyvstXYND5WFn5JIXnbWkI",
    },
    {
      name: "Barok",
      profilePic: "https://i.imgur.com/7I5FdXC.jpg",
    },
    {
      name: "Beatrix",
      profilePic:
        "https://drive.google.com/uc?export=view?&id=1L_ggw2BKI5kG0poXNUvTSZtBlaQo58-Z",
    },
    {
      name: "David",
      profilePic:
        "https://media.licdn.com/dms/image/D4D03AQGNQhHQWx6TqA/profile-displayphoto-shrink_400_400/0/1677011272447?e=1683763200&v=beta&t=MSaGW6KplH-O5VbLqFAX0YyZtyYQnoTDX3HJg4ip10U",
    },
    {
      name: "Ekam",
      profilePic: "",
    },
    {
      name: "Isa",
      profilePic: "",
    },
    {
      name: "Krit",
    },
    {
      name: "Mostafa",
      profilePic:
        "https://media.licdn.com/dms/image/C4E03AQGUHPMYlyMDuQ/profile-displayphoto-shrink_400_400/0/1656348512736?e=1683763200&v=beta&t=Rw2gvAM5dIH5MrSwPMq_T7JX4O1zq225uWHjIsS5ZqI",
    },
    {
      name: "Reginald",
      profilePic: "https://avatars.githubusercontent.com/u/78266709?v=4",
    },
    {
      name: "Tapaswini",
      profilePic:
        "https://media.licdn.com/dms/image/C5603AQEqPqcyzvPYvQ/profile-displayphoto-shrink_400_400/0/1630077490985?e=1683763200&v=beta&t=rdu6u9JJ1tdZ2zVxisR3qc1lpmnpYzfWRisD8hw2Rf4",
    },
    {
      name: "Tharun",
      profilePic:
        "https://media.licdn.com/dms/image/D5603AQE2iwHOoLlMdQ/profile-displayphoto-shrink_400_400/0/1669496356264?e=1683763200&v=beta&t=_kqxpXh8n1K9Tw-qJE2Tv-hHVck5z29j0a3oYL9PbNA",
    },
    {
      name: "Victoria",
      profilePic:
        "https://media.licdn.com/dms/image/C4D03AQETYyqIIvNOIw/profile-displayphoto-shrink_400_400/0/1554393966031?e=1683763200&v=beta&t=ZuYWFUdauFDZcCuFYh6PP9IYoc1zeTRm2N6JfgRUJxM",
    },
    {
      name: "Zhouli",
      profilePic: "https://avatars.githubusercontent.com/u/65101998?v=4",
    },
  ];

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
