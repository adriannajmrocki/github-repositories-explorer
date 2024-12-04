import { useInfiniteQuery } from "@tanstack/react-query";
import { client } from "../api/client";
import { IRepo } from "../components/Repos/ReposList/ReposList";

const useInfiniteRepos = (username: string, reposPerPage: number = 10) => {
  const result = useInfiniteQuery({
    queryKey: ["repos", { username }],
    queryFn: ({ pageParam }) => {
      return client<IRepo[]>(
        `users/${encodeURIComponent(
          username
        )}/repos?page=${pageParam}&per_page=${reposPerPage}`
      ).then((data) => data);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    enabled: !!username,
  });

  return result;
};

export { useInfiniteRepos };
