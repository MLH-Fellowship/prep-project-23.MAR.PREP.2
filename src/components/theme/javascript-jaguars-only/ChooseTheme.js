import { TEAM } from "../../../lib/constants";

export default function ChooseTheme({ setUser }) {
  return (
    <div className="members">
      {TEAM.map(({ name, profilePic }) => (
        <div
          className="member"
          onClick={() => {
            setUser(name);
          }}
        >
          <img src={profilePic} alt="" />
          <div className="name">{name}</div>
        </div>
      ))}
    </div>
  );
}
