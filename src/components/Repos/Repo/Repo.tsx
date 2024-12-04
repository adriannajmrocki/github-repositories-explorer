import { IRepo } from "../ReposList/ReposList";
import { ReactComponent as StarIcon } from "../../../assets/icons/star.svg";
import "./style.css";

interface Props {
  repo: IRepo;
  innerRef?: React.Ref<HTMLDivElement>;
}

const Repo = ({ repo, innerRef }: Props) => {
  return (
    <div className="repo" ref={innerRef}>
      <div className="data">
        <p className="title">{repo.name}</p>
        <p className="description">{repo.description}</p>
      </div>
      <div className="stars">
        <p className="stars-count">{repo.stargazers_count}</p>
        <div>
          <StarIcon />
        </div>
      </div>
    </div>
  );
};

export default Repo;
