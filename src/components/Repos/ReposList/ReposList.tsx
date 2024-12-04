import Repo from "../Repo/Repo";
import "./style.css";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfiniteRepos } from "../../../hooks/repos";

interface Props {
  username: string;
}

export interface IRepo {
  id: number;
  name: string;
  description?: string;
  stargazers_count: number;
}

const ReposList = ({ username }: Props) => {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRepos(username);

  const repos = data?.pages.flatMap((page) => page) ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="repos">
      {isError ? <p className="info-text color-red">{error.message}</p> : null}
      {isLoading ? <p className="info-text color-gray">Loading...</p> : null}
      {isSuccess && !repos.length ? (
        <p className="info-text color-red">No repos found.</p>
      ) : isSuccess && repos.length ? (
        <>
          {repos.map((repo, index) => (
            <Repo
              key={repo.id}
              innerRef={repos.length === index + 1 ? ref : undefined}
              repo={repo}
            />
          ))}
        </>
      ) : null}
      {isFetchingNextPage ? (
        <p className="info-text color-gray">Loading more...</p>
      ) : null}
    </div>
  );
};

export default ReposList;
