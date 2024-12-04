import "./style.css";
import { ReactComponent as ChevronDownIcon } from "../../../assets/icons/chevron-down.svg";
import ReposList from "../../Repos/ReposList/ReposList";

interface Props {
  username: string;
  activeUser: string;
  setActiveUser: (login: string) => void;
}

const User = ({ username, activeUser, setActiveUser }: Props) => {
  const isUserActive = activeUser === username;

  const handleChevronClick = () => {
    setActiveUser(isUserActive ? "" : username);
  };

  return (
    <>
      <div className="user-tab">
        <div className="user-data">
          <p className="user-name">{username}</p>
          <ChevronDownIcon
            className={`icon ${isUserActive ? "icon-rotate" : ""}`}
            onClick={handleChevronClick}
            data-testid="chevron-icon"
          />
        </div>
        {isUserActive ? <ReposList username={username} /> : null}
      </div>
    </>
  );
};

export default User;
